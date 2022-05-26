function Container({ className = '', children }) {
  return (
    <div className={`container mx-auto my-4 px-4 max-w-5xl ${className}`}>
      {children}
    </div>
  );
}

export default Container;
