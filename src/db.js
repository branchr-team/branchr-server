import {pmongo} from 'npm';
import * as config from 'config';

export var db = pmongo(config.DB_URI);
