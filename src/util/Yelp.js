const apiKey =
	'xvJb2OdMvCHnQP380gnYdo3Ir5FQf5Tkqj9bCOkKycRbh2p2PEC6a2RSybybYn4HXWh4gQ0FprXXz-qyatbIRPojxxbFBcCceYeE5WNp6-_O8jEQZuO_DiG0UQV6YHYx';
const url = 'https://api.yelp.com/v3/businesses/search?';

const Yelp = {
	search(term, location, sortBy) {
		return fetch(`https://cors-anywhere.herokuapp.com/${url}term=${term}&location=${location}&sort_by=${sortBy}`, {
			headers: { Authorization: `Bearer ${apiKey}` },
		})
			.then((response) => {
				return response.json();
			})
			.then((jsonResponse) => {
				if (jsonResponse.businesses) {
					return jsonResponse.businesses.map((business) => {
						return {
							id: business.id,
							imageSrc: business.image_url,
							name: business.name,
							address: business.location.address1,
							city: business.location.city,
							state: business.location.state,
							zipCode: business.location.zip_code,
							category: business.categories[0].title,
							rating: business.rating,
							reviewCount: business.review_count,
						};
					});
				}
			});
	},
};

export default Yelp;
