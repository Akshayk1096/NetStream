import { useEffect, useState } from "react"
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendContent = () => {
  const [trendingContent, setTrendingContent] =useState(null);
  const {contentType} = useContentStore()

  useEffect(()=> {
    const GetTrendContent = async () => {
        const res = await axios.get(`/api/v1/${contentType}/trending`)
        
        setTrendingContent(res.data.content)
    }
    GetTrendContent()
  },[contentType]);

  return {trendingContent}
}

export default useGetTrendContent