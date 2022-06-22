import React from 'react'
import {Link, NavLink} from 'react-router-dom'
const Header = () => {
	const activestyle = {
		color: "purple"
	}
  return ( 
	  <div>
		  <ul  className='flex flex-row'>
			  <li className=' text-md'>
				  <NavLink className={({isActive}) => isActive ? 'text-purple-500' : 'text-orange-500'} to="/shoes">Shoes</NavLink>
			  </li>
			  <li className='ml-10 text-md'>
				  <NavLink className={({isActive}) => isActive ? 'text-purple-500' : 'text-orange-500'} to="/cart">cart</NavLink>
			  </li>
		  </ul>
	</div>
  )
}

export default Header