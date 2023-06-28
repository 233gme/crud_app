import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Update = () => {
  const navigate = useNavigate();
  let {id} = useParams();
  const [error, setError] = useState(null)
  const [item, setItem] = useState({
    title: '',
    desc: '',
    img: '',
    price: null,
  });

  const returnBack = () => {
    navigate('/')
  }

  const handleChange = (event) => {
    setItem(prev => ({...prev, [event.target.name]: event.target.value}));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await axios.put(`http://localhost:8800/items${id}`, item);
      returnBack();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  return (
    <div>
      <h1>UPDATE PAGE</h1>
      <h2>Update item</h2>
      <button>
        <Link to={'/'}>👈 Back to Main page</Link>
      </button>
      <br/>
      <hr/>
      <br/>
      <form>
        <input type='text' placeholder='Title' onChange={handleChange} name='title'/>
        <input type='text' placeholder='Decsription' onChange={handleChange} name='desc'/>
        <input type='number' placeholder='Price' onChange={handleChange} name='price'/>
        <input type='text' placeholder='Image' onChange={handleChange} name='img'/>
        <button onClick={handleSubmit}>UPDATE ITEM</button>
      </form>
      {error}
    </div>
  );
};

export default Update;
