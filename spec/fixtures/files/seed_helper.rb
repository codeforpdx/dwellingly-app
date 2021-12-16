module SeedHelper
  def self.property_names
    [
      'Lakemont Ridge',
      'Russellville Commons',
      'The Century',
      'Grant Park Village',
      'Museum Place',
      'ORO',
      'The Russell Apartments',
      'The Bluffs',
      'Portland Towers Apartments',
      'The Union',
      'Nomad Apartments',
      'Sandy28 Apartments',
      'Osprey',
      'Marquam Heights Apartments',
      'Indigo',
      'Modera Pearl',
      'Savier Street Flats',
      'Marvel 29',
      'Peloton Apartments',
      'Lower Burnside Lofts',
      'Acqua',
      'The Ardea Apartments',
      'Modera Akoya',
      'Yacht Harbor Club',
      'The Fifty at Division',
      'The Infinity',
      'Avery 450',
      'Rincon Green',
      'Fifteen Fifty Mission',
      'BanCal Property Management',
      'Preston Apartments',
      'Duboce Apartments',
      '923 Folsom',
      'The Landing',
      'NEMA',
      'Atelier',
      'The Excelsior',
      'Skyline Tower',
      'Hoyt',
      '660 Grand Street',
      '100 Manhattan Avenue',
      'Gerard Towers',
      'Star Tower LIC',
      'Plaza 400',
      '70 Greene'
    ]
  end

  def self.user_attributes(email: nil, archived: false)
    {
      email: email || Faker::Internet.unique.email,
      password: 'asdfasdf',
      firstName: Faker::Name.first_name,
      lastName: Faker::Name.last_name,
      phone: Faker::PhoneNumber.phone_number,
      archived: archived
    }
  end

  def self.tenant_attributes(archived: false)
    {
      firstName: Faker::Name.first_name,
      lastName: Faker::Name.last_name,
      phone: Faker::PhoneNumber.phone_number,
      archived: archived
    }
  end
end
