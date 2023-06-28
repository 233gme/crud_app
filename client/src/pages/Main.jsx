import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const deleteItem = (id) => async () => {
    try {
      await axios.delete(`http://localhost:8800/items${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const toUpdatePage = (id) => () => {
    navigate(`/update/${id}`);
  }

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/items");
        if (res.data) {
          setItems(res.data)
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchAllItems();
  }, [])

  return (
    <div>
      <h1>MAIN PAGE</h1>
      <button>
        <Link to={'/add'}>➕ Add new item</Link>
      </button>
      <br/>
      <br/>
      {
        items.length ? (
          <table border='true'>
            <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Price</th>
              <th>***</th>
            </tr>
            </thead>
            <tbody>
            {
              items.map(({id, title, desc, img, price}) => {
                return (
                  <tr key={id}>
                    <td>{title}</td>
                    <td>{desc}</td>
                    <td>{img && <img src={img} alt={title}/>}</td>
                    <td>{price}</td>
                    <td>
                      <button onClick={deleteItem(id)} title='Delete'>❌delete</button>
                      <button onClick={toUpdatePage(id)} title="Update">🔄update</button>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        ) : <h2>NO DATA</h2>
      }
    </div>
  );
}

export default Main;
