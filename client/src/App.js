import React, { useState, useEffect} from 'react'
import { setUser } from './store/auth';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import Pages from './pages/Pages'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/users/session");
      debugger
      if (res.ok) {
        const data = await res.json();
        debugger
        dispatch(setUser(data))
      }
      setLoading(false);
    }
    loadUser();
  }, [dispatch]);

  if (loading) return null;
  return (
    <BrowserRouter>
     <Pages/>
    </BrowserRouter>
  );
}

export default App;
