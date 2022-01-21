export default class GameApiService {
  static async getPlayer(id) {
    try {
      const response = await fetch(`https://localhost:5000/api/Players/${id}`);
      if(!response.ok) {
          throw Error(response.statusText);        
        }
        return response.json();
      } catch(error) {  
        return error.message;
      }
  }
  
  static async prox(x, y, z, range) {
    try {
      const response = await fetch(`https://localhost:5000/api/Players/prox/?x=${x}&y=${y}3&z=${z}&range=${range}`);
      if(!response.ok) {
          throw Error(response.statusText);        
        }
        return response.json();
      } catch(error) {  
        return error.message;
      }
  }

  static async con(id, n, s, e, w)  {
    try {
      const response = await fetch(`https://localhost:5000/api/Players/con/${id}?pId=${id}&n=${n}&s=${s}&e=${e}&w=${w}`);
      if(!response.ok) {
          throw Error(response.statusText);        
        }
        return response.json();
      } catch(error) {  
        return error.message;
      }
  }
  
  
}