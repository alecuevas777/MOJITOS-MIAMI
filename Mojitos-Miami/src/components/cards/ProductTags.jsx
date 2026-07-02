import { cn } from '@/utils'
import styles from './ProductTags.module.css'

export default function ProductTags({ product, className, layout = 'overlay' }) {
  if (!product?.discountLabel) return null

  return (
    <div className={cn(styles.tags, styles[layout], className)}>
      <span className={styles.discountTag}>{product.discountLabel}</span>
    </div>
  )
}
