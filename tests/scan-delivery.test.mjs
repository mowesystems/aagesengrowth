import test from 'node:test';import assert from 'node:assert/strict';
import {scanPayload,scanDigest,deliverScan} from '../netlify/scan-engine/delivery.ts';
const record={id:'a97de755-f53b-48b9-9525-0327e6143df6',domain:'aagesengrowth.com',url:'https://aagesengrowth.com/',createdAt:'2026-10-28T12:00:00Z',status:'done',locale:'da',progress:{stage:'done',pagesDone:1,pagesPlanned:1},report:{en:{company:'Aagesen Growth',opportunities:[{id:'contact',observed:'A visible contact form was found.',opportunity:'Review the response journey.'}],notSeen:['Private analytics']}},internal:{signals:{privateRaw:'do not forward'},findings:[{id:'contact',observed:'Observed',opportunity:'Opportunity',confidence:'high',evidence:['page'],sources:['https://aagesengrowth.com']}]}};
test('scan bridge forwards bounded observations without raw crawl state or synthetic scores',()=>{
 const payload=scanPayload(record);assert.equal(payload.report.en.company,'Aagesen Growth');assert.equal('internal' in payload,false);assert.equal('signals' in payload,false);assert.equal('overall_score' in payload,false);assert.equal(payload.findings[0].confidence,'high');assert.equal(scanDigest(record),scanDigest({...record,files:{pdf:true,png:true}}));assert.notEqual(scanDigest(record),scanDigest({...record,status:'running'}));
});
test('scan bridge uses only the configured Supabase RPC and acknowledges a real receipt',async()=>{
 let call;const config={url:'https://example.supabase.co',key:'publishable-test-key',secret:'server-test-secret'};
 assert.equal(await deliverScan(record,config,async(url,init)=>{call={url,body:JSON.parse(init.body)};return Response.json(record.id);}),true);
 assert.equal(call.url,'https://example.supabase.co/rest/v1/rpc/ingest_growth_scan');assert.equal(call.body.ingest_secret,config.secret);assert.equal(call.body.payload.id,record.id);
 assert.equal(await deliverScan(record,{...config,url:'https://attacker.example'},()=>{throw Error('must not send');}),false);
 assert.equal(await deliverScan(record,config,async()=>Response.json({ok:true})),false);
 assert.equal(await deliverScan(record,config,async()=>new Response('',{status:503})),false);
});
