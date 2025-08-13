
export const extractCityFromAddressComponents = (addressComponents: any[]): string | null => {
  if (!addressComponents || !Array.isArray(addressComponents)) {
    return null;
  }

  let city = null;
  
  const findArea2 = addressComponents.find((component) =>
    component.types.includes('administrative_area_level_2')
  );
  
  if (!findArea2) {
    const findArea1 = addressComponents.find((component) =>
      component.types.includes('administrative_area_level_1')
    );
    city = findArea1?.long_name || null;
  } else {
    city = findArea2.long_name;
  }
  
  return city;
};

export const extractCityFromGooglePlaceDetails = (details: any): string | null => {
  if (!details?.address_components) {
    return null;
  }
  
  return extractCityFromAddressComponents(details.address_components);
};