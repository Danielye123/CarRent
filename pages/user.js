import { useSession } from 'next-auth/react';

const User = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <div className="a">

      <main className="b">
        <div className="c">
          {loading && <div className="fff">Loading...</div>}

          <h1 className="d">{session ? `Welcome, ${session.user.name} ${session.user.email}!` : 'Please log in to continue'}</h1>
          <p style={{ marginBottom: '10px' }}> </p> <br />
          <img src={session ? session.user.image : 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png'} alt="" className="g" />

        </div>
      </main>
    </div>
  );
};

export default User;
