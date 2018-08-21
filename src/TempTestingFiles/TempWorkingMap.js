import { withGoogleMap, GoogleMap } from 'react-google-maps'

class Map extends Component {
   render() {
   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 35.759465, lng: -5.833954 } }
        defaultZoom = { 13 }
      >
      </GoogleMap>
   ))
   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   )
   }
}