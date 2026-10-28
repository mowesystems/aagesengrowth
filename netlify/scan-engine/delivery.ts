import {createHash} from 'node:crypto';
import type {ScanRecord} from '../../src/lib/growthScan/types.ts';
import type {DeliveryConfig} from '../lead-engine/delivery.ts';

/** Send only bounded report data; raw crawl signals stay in the website store. */
export function scanPayload(record:ScanRecord){
 const report=record.report?Object.fromEntries(Object.entries(record.report).map(([locale,r])=>[locale,{...r,opportunities:r.opportunities.slice(0,5),notSeen:r.notSeen.slice(0,10)}])):undefined;
 return {id:record.id,domain:record.domain,url:record.url,status:record.status,createdAt:record.createdAt,finishedAt:record.finishedAt,report,websiteJustified:record.websiteJustified,error:record.error,findings:record.internal?.findings.slice(0,20).map(f=>({id:f.id,observed:f.observed,opportunity:f.opportunity,confidence:f.confidence,evidence:f.evidence.slice(0,5),sources:f.sources.slice(0,5)}))};
}
export const scanDigest=(record:ScanRecord)=>createHash('sha256').update(JSON.stringify(scanPayload(record))).digest('hex');
export async function deliverScan(record:ScanRecord,config:DeliveryConfig,send:typeof fetch=fetch){
 if(!config.url||!config.key||!config.secret)return false;
 try{
  const url=new URL(config.url);if(url.protocol!=='https:'||!url.hostname.endsWith('.supabase.co'))return false;
  const result=await send(`${url.origin}/rest/v1/rpc/ingest_growth_scan`,{method:'POST',headers:{'Content-Type':'application/json',apikey:config.key,Authorization:`Bearer ${config.key}`},body:JSON.stringify({ingest_secret:config.secret,payload:scanPayload(record)}),signal:AbortSignal.timeout(6000)});
  if(!result.ok)return false;return /^[0-9a-f-]{36}$/i.test(await result.json());
 }catch{return false;}
}
