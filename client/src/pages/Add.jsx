import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();
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
      await axios.post("http://localhost:8800/items", item);
      returnBack();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  return (
    <div>
      <h1>ADD PAGE</h1>
      <h2>Add new item</h2>
      <button>
        <Link to={'/'}>👈 Back to main page</Link>
      </button>
      <br/>
      <hr/>
      <br/>
      <form>
        <input type='text' placeholder='Title' onChange={handleChange} name='title'/>
        <input type='text' placeholder='Decsription' onChange={handleChange} name='desc'/>
        <input type='number' placeholder='Price' onChange={handleChange} name='price'/>
        <input type='text' placeholder='Image' onChange={handleChange} name='img'/>
        <button onClick={handleSubmit}>ADD ITEM</button>
      </form>
      {error}
    </div>
  );
};

export default Add;
