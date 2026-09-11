// Kept out of the visual layout, keyboard order and accessibility tree.
export default function FormHoneypot({ field = {} }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)' }}>
      <label>
        Leave this field empty
        <input type="text" name="website" autoComplete="off" tabIndex={-1} {...field} />
      </label>
    </div>
  )
}
