{
Foursquare // Add attribution like vanilla js P files

Me:
https://api.foursquare.com/v2/venues/search?&
intent=browse&radius=10000&
query=food&
client_id=ZLDOVXNKD5BXGLUVS4A4DELSGZHSW04YCJFY1ELFQYBDHOLE&
client_secret=U3S2PRMH1LWEI3MDV3OKHAYHVOFKDWY0VJOIMT45SZESCFGA&
ll=35.7594651,-5.833954299999999&
v=20182708

https://api.foursquare.com/v2/venues/search?&intent=browse&radius=10000&query=food&client_id=ZLDOVXNKD5BXGLUVS4A4DELSGZHSW04YCJFY1ELFQYBDHOLE&client_secret=U3S2PRMH1LWEI3MDV3OKHAYHVOFKDWY0VJOIMT45SZESCFGA&ll=35.7594651,-5.833954299999999&v=20182608

oauth_token=AYWUAVNBB4AMRCTEBGPTOO5AKATAQZARS4IJG3WB2EU54FYK&
}


  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "ZLDOVXNKD5BXGLUVS4A4DELSGZHSW04YCJFY1ELFQYBDHOLE",
      client_secret: "U3S2PRMH1LWEI3MDV3OKHAYHVOFKDWY0VJOIMT45SZESCFGA",
      query: "musume",
      near: "Tangiers",
      v: "20182608"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }
