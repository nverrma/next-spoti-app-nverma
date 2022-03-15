export default function Home() {
  return (
    <div className="d-flex m-auto">
      <a  className="spotibutton" 
      style={{
        display:"flex",
        margin:"auto",
        justifyContent:"center",
        height:"100vh",
        alignItems:"center",
      }} 
      href="/albums">spotify playlist</a>
    </div>
  );
}
