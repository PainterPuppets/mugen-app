import { action } from "mobx";

import BaseProvider from "@/utils/BaseProvider";

class FileStore {

  @action
  uploadImage = (image: Blob) => {
    const formData = new FormData();
    formData.append('image', image);
  
    return BaseProvider.post<{url: string}>(`/api/file/upload/`, formData)
  };
}

const store = new FileStore();

export default store;
