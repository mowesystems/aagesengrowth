import type {Config,Context} from '@netlify/functions';
import {retryScanDelivery} from '../scan-engine/sync.ts';
export default async(_req:Request,context:Context)=>{await retryScanDelivery(context);};
// Includes reports created before the dashboard integration was deployed.
export const config:Config={schedule:'*/10 * * * *'};
