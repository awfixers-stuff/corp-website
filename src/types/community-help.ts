export type Attachments = {
  attachment: string
  contentType:
    | 'application/json'
    | 'image/jpeg'
    | 'image/png'
    | 'text/plain'
    | 'video/MP2T'
    | 'video/quicktime'
  description: string
  ephemeral: boolean
  height: number
  name: string
  proxyURL: string
  size: number
  url: string
  width: number
}[]

export type Messages = {
  authorAvatar: string
  authorID: string
  authorName: string
  content: string
  createdAtDate: number | string
  fileAttachments: Attachments
}
