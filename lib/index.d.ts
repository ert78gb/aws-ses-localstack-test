export interface GetEmailsOptions {
    baseUrl: string;
    id?: string;
    source?: string;
}

export interface LocalstackEmailBody {
    text_part?: string;
    html_part?: string;
}

export interface SesDestination {
    ToAddresses?: string[];
    CcAddresses?: string[];
    BccAddresses?: string[];
}

export interface LocalstackEmail {
    Body?: LocalstackEmailBody;
    Destination?: SesDestination;
    Id?: string;
    Region?: string;
    Source?: string;
    Subject?: string;
    Timestamp?: Date;
}

export interface DeleteEmailsOptions {
    baseUrl: string;
    id?: string;
}

export function getEmails(options: GetEmailsOptions): Promise<LocalstackEmail>
export function deleteEmails(options: DeleteEmailsOptions): Promise<any>
