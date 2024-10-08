import { useEffect, useRef } from 'react'
import { ModalTypes } from '../../../types/ui.types'
import { formStyles } from '../twind/styles'
import { FaTimes } from 'react-icons/fa'

const ShoppingCart: React.FC<ModalTypes> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className={formStyles.shopping_container}>
      <div
        className={formStyles.shopping_content}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={formStyles.shopping_title_container}>
          <h2 className={formStyles.shopping_title}>Shopping Cart</h2>
          <button onClick={onClose}>
            <FaTimes className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col space-y-4">{children}</div>
      </div>
    </div>
  )
}

export default ShoppingCart
