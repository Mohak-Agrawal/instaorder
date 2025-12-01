import { useState } from 'react'
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Orders from './components/Orders'

export default function App() {
  const [page, setPage] = useState<'menu'|'cart'|'orders'>('menu')
  const [cart, setCart] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])

  const addToCart = (id: string, name: string, price: number) => {
    const existing = cart.find(i => i.id === id)
    if (existing) {
      setCart(cart.map(i => i.id === id ? {...i, qty: i.qty+1} : i))
    } else {
      setCart([...cart, {id, name, price, qty: 1}])
    }
  }

  const removeCart = (id: string) => setCart(cart.filter(i => i.id !== id))
  const updateQty = (id: string, qty: number) => {
    if(qty <= 0) removeCart(id)
    else setCart(cart.map(i => i.id === id ? {...i, qty} : i))
  }

  const checkout = () => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
    setOrders([{id: `ORD-${Date.now()}`, items: cart, total, status: 'pending', time: new Date()}, ...orders])
    setCart([])
    setPage('orders')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar page={page} setPage={setPage} cart={cart}/>
      <main className="container mx-auto px-4 py-8">
        {page === 'menu' && <Menu onAdd={addToCart}/>}
        {page === 'cart' && <Cart items={cart} onUpdate={updateQty} onRemove={removeCart} onCheckout={checkout}/>}
        {page === 'orders' && <Orders orders={orders}/>}
      </main>
    </div>
  )
}
