import type {Context} from '@netlify/functions';
import type {ScanRecord} from '../../src/lib/growthScan/types.ts';
import {deliveryConfig} from '../lead-engine/queue.ts';
import {store} from './store.ts';
import {deliverScan,scanDigest} from './delivery.ts';
export async function syncScan(record:ScanRecord,production:boolean){
 if(!production)return false;
 const s=store(),key=`admin-delivered/${record.id}`,digest=scanDigest(record);
 if(await s.get(key,{type:'text'})===digest)return true;
 if(!await deliverScan(record,deliveryConfig()))return false;
 await s.set(key,digest);return true;
}
export async function retryScanDelivery(context:Context){
 if(context.deploy.context!=='production')return {delivered:0,preview:true};
 const s=store();let attempted=0;
 for await(const page of s.list({prefix:'scan/',paginate:true}))for(const blob of page.blobs){
  const record=await s.get(blob.key,{type:'json'}) as ScanRecord|null;if(!record)continue;
  if(await s.get(`admin-delivered/${record.id}`,{type:'text'})===scanDigest(record))continue;
  if(!await syncScan(record,true)){console.warn('scan-delivery: report retained for retry');return {delivered:attempted,pending:true};}
  if(++attempted>=20)return {delivered:attempted,pending:true};
 }
 return {delivered:attempted,pending:false};
}
