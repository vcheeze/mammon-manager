function Container({ className = '', children }) {
  return (
    <div className={`container mx-auto my-2 px-4 ${className}`}>{children}</div>
  );
}

export default Container;
