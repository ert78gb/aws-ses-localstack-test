import {expectType} from 'tsd'

import { deleteEmails, getEmails, LocalstackEmail } from "../lib";

expectType<Promise<LocalstackEmail[]>>(getEmails({
    baseUrl: 'http://localhost:4566/',
}))

expectType<Promise<any>>(deleteEmails({
    baseUrl: 'http://localhost:4566/',
}))
