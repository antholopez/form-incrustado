import { Injectable } from '@nestjs/common';
import { log } from 'console';
// import axios from 'axios';
import * as moment from "moment";
import * as crypto from "crypto";
import { measureMemory } from 'vm';

@Injectable()
export class AppService {

  async getHello() {
    return 'Hello World'
  }
}