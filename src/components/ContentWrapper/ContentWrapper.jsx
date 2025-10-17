/**
 * @param {*} props
 * @returns
 */
export const ContentWrapper = ({ title, children }) => {
  document.title = title;

  return (
    <>
      <section>
        <div>{children}</div>
      </section>
    </>
  )
}
