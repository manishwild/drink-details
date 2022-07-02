import React from 'react'
import { BsFillHeartFill } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        Copyright &copy; The Drinks Detail design with{' '}
        <a href="https://github.com/manishwild">
          <BsFillHeartFill className="icon" />{' '}
          <span style={{ color: 'black' }}>by Manish Khadgi Shahi</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
