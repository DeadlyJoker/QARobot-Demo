import { $instance } from '@/utils/request'

export const uploadAttachment = (data, callback) => {
  return $instance({
    url: '/api/attachment/upload',
    method: 'post',
    data,
    onUploadProgress: callback,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const uploadImage = data => {
  return $instance({
    url: '/api/attachment/uploadImage',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const downloadAttachment = async attachmentId => {
  return new Promise((resolve, reject) => {
    $instance({
      url: '/api/attachment/download?attachmentId=' + attachmentId,
      method: 'get',
      responseType: 'blob'
    }).then(res => {
      if (res.blob) {
        downloadBlob(res)
        resolve({ fileName: res.fileName, code: 200, isBlob: true })
      } else {
        resolve({ fileName: res.fileName, code: 400, isBlob: true })
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

export const downloadBlob = res => {
  const url = window.URL.createObjectURL(new Blob([res.blob]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', res.fileName)
  document.body.appendChild(link)
  link.click()
}

export const deleteAttachment = data => {
  return $instance({
    url: '/api/attachment/delete',
    method: 'post',
    data
  })
}

export const getAttachmentInfoSummary = () => {
  return $instance({
    url: '/api/attachment/info/summary',
    method: 'get'
  })
}

export const addOrUpdateAttachmentInfo = data => {
  return $instance({
    url: '/api/attachment/info',
    method: 'post',
    data
  })
}

export const fetchPageAttachmentFolderAndInfo = data => {
  return $instance({
    url: '/api/attachment/info/page',
    method: 'get',
    data
  })
}

export const addOrUpdateAttachmentFolder = data => {
  return $instance({
    url: '/api/attachment/folder',
    method: 'post',
    data
  })
}

export const deleteAttachmentFolder = data => {
  return $instance({
    url: '/api/attachment/folder/delete',
    method: 'post',
    data
  })
}

