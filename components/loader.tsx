import ClipLoader from 'react-spinners/ClipLoader';

export default function Loader({ loading }) {
  return (
    <div className="w-screen h-screen absolute inset-0 flex justify-center items-center">
      <ClipLoader loading={loading} color="#61cdbb" size={150} />
    </div>
  );
}
