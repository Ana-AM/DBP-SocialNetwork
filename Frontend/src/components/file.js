import React from "react";
import API, { apicheckFile } from "../functions/consultasAPI";

// const existFile = ({id}) => {
//   apicheckFile(id).then((data) => {
//     console.log(id)
//     if (data.success===false){
//       return (<div>
//       </div>)
//     } else {
//       return (<div><iframe src={`${API}/p/file/${id}`} width="92%" height="300"></iframe></div>)
//     }
//   })
// }

const ShowFile = ({id}) => {
  return(
    <div>
      <iframe src={`${API}/p/file/${id}`} width="92%" height="300"></iframe>
      {/* {existFile({id})} */}
    </div>)
};

export default ShowFile;
