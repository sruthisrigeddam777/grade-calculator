export default function Home() {
  const textStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontsize:'50px'
  };

  return (
    <>
      <div className='h-screen flex items-center justify-center'>
        <p style={textStyle}>Rajiv Gandhi University of Knowledge Technologies, Nuzvid</p>
      </div>

      <div className='h-screen flex items-center justify-center'>
        <p style={textStyle}>This is User Friendly Website for Your Grade calulation and SEM Percentage </p>
      </div>
    </>
  );
}
