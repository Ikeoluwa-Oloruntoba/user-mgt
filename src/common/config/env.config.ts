import * as env from 'env-var';
import { config } from 'dotenv';

config();

export const ENVIRONMENT = env.get('ENVIRONMENT').asString();
