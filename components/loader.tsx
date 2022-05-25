import { Overlay } from 'evergreen-ui';
import ClipLoader from 'react-spinners/ClipLoader';

function Loader({ loading }) {
  return (
    <Overlay
      isShown={loading}
      preventBodyScrolling
      containerProps={{
        className:
          'w-screen h-screen absolute inset-0 flex justify-center items-center',
      }}
    >
      <ClipLoader loading={loading} color="#61cdbb" size={150} />
    </Overlay>
  );
}

export default Loader;
