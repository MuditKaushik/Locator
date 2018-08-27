export interface IGoogleConfig {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    scope: string[];
}
export interface IGoogleAuth {
    access_token: string;
    token_type: string;
    client_id: string;
    expires_at: string;
    expires_in: string;
    issued_at: string;
    status: {
        google_logged_in: boolean,
        signed_in: boolean,
        method: string
    },
    error: string
}
export interface IGoogleFolder {
    id: string;
    mimeType: string;
    name: string;
    ownedByMe: boolean;
    parents: Array<string>;
}
export interface IGoogleDoc {
    description: string;
    downloadUrl: string;
    iconUrl: string;
    id: string;
    isNew: boolean;
    mimeType: string;
    name: string;
    type: string;
    uploadId: string;
    uploadState: string;
    url: string;
}
export interface IGoogleFileData {
    action: string;
    docs: Array<IGoogleDoc>;
}
export interface IGoogleFileComments {
    comments: Array<IGoogleComments>;
}
export interface IGoogleComments {
    id: string;
    htmlContent: string;
    quotedFileContent: IGoogleQuotedContent;
    author: IGoogleAuthor;
}
export interface IGoogleQuotedContent {
    mimeType: string;
    value: string;
}
export interface IGoogleAuthor {
    displayName: string;
    emailAddress: string;
}
export interface IGoogleFileCopy {
    id: string;
    name: string;
    parents: Array<string>;
    fileExtension: string;
    fullFileExtension: string;
    capabilities: IGoogleCapabilities;
}
export interface IGoogleCapabilities {
    canComment: boolean;
    canDelete: boolean;
    canDownload: boolean;
    canEdit: boolean;
}