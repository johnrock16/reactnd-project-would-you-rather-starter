const ProgressBar = ({ fillerColor, progress }) => (
  <div style={containerStyles}>
    <div style={{...fillerStyles,width: `${progress}%`,backgroundColor: fillerColor}}>
      <span style={percentageStyle}>{`${Math.round(progress)}%`}</span>
    </div>
  </div>
);
  
export default ProgressBar;

const containerStyles = {
  height: 20,
  width: '100%',
  backgroundColor: "#e0e0de",
  borderRadius: 50,
}

const fillerStyles = {
  height: '100%',
  borderRadius: 'inherit',
  textAlign: 'right'
}

const percentageStyle = {
  padding: 5,
  color: 'white',
  fontWeight: 'bold'
}