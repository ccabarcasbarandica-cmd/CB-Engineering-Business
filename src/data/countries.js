const flagFromIso = (iso) => iso.replace(/./g, (letter) => String.fromCodePoint(127397 + letter.charCodeAt()))
const entry = (name, iso, dialCode) => ({ name, iso, dialCode, flag: flagFromIso(iso) })

// Nombres en español y prefijos geográficos E.164. Los territorios del plan +1
// incluyen su código de área para producir un número internacional utilizable.
export const countries = [
  entry('Afganistán', 'AF', '+93'), entry('Albania', 'AL', '+355'), entry('Alemania', 'DE', '+49'),
  entry('Andorra', 'AD', '+376'), entry('Angola', 'AO', '+244'), entry('Anguila', 'AI', '+1264'), entry('Antártida', 'AQ', '+672'),
  entry('Antigua y Barbuda', 'AG', '+1268'), entry('Arabia Saudita', 'SA', '+966'), entry('Argelia', 'DZ', '+213'),
  entry('Argentina', 'AR', '+54'), entry('Armenia', 'AM', '+374'), entry('Aruba', 'AW', '+297'),
  entry('Australia', 'AU', '+61'), entry('Austria', 'AT', '+43'), entry('Azerbaiyán', 'AZ', '+994'),
  entry('Bahamas', 'BS', '+1242'), entry('Bangladés', 'BD', '+880'), entry('Barbados', 'BB', '+1246'),
  entry('Baréin', 'BH', '+973'), entry('Bélgica', 'BE', '+32'), entry('Belice', 'BZ', '+501'),
  entry('Benín', 'BJ', '+229'), entry('Bermudas', 'BM', '+1441'), entry('Bielorrusia', 'BY', '+375'),
  entry('Bolivia', 'BO', '+591'), entry('Bonaire, San Eustaquio y Saba', 'BQ', '+599'), entry('Bosnia y Herzegovina', 'BA', '+387'),
  entry('Botsuana', 'BW', '+267'), entry('Brasil', 'BR', '+55'), entry('Brunéi', 'BN', '+673'), entry('Territorio Británico del Océano Índico', 'IO', '+246'),
  entry('Bulgaria', 'BG', '+359'), entry('Burkina Faso', 'BF', '+226'), entry('Burundi', 'BI', '+257'),
  entry('Bután', 'BT', '+975'), entry('Cabo Verde', 'CV', '+238'), entry('Camboya', 'KH', '+855'),
  entry('Camerún', 'CM', '+237'), entry('Canadá', 'CA', '+1'), entry('Catar', 'QA', '+974'),
  entry('Chad', 'TD', '+235'), entry('Chile', 'CL', '+56'), entry('China', 'CN', '+86'),
  entry('Chipre', 'CY', '+357'), entry('Colombia', 'CO', '+57'), entry('Comoras', 'KM', '+269'),
  entry('Corea del Norte', 'KP', '+850'), entry('Corea del Sur', 'KR', '+82'), entry('Costa de Marfil', 'CI', '+225'),
  entry('Costa Rica', 'CR', '+506'), entry('Croacia', 'HR', '+385'), entry('Cuba', 'CU', '+53'),
  entry('Curazao', 'CW', '+599'), entry('Dinamarca', 'DK', '+45'), entry('Dominica', 'DM', '+1767'),
  entry('Ecuador', 'EC', '+593'), entry('Egipto', 'EG', '+20'), entry('El Salvador', 'SV', '+503'),
  entry('Emiratos Árabes Unidos', 'AE', '+971'), entry('Eritrea', 'ER', '+291'), entry('Eslovaquia', 'SK', '+421'),
  entry('Eslovenia', 'SI', '+386'), entry('España', 'ES', '+34'), entry('Estados Unidos', 'US', '+1'),
  entry('Estonia', 'EE', '+372'), entry('Esuatini', 'SZ', '+268'), entry('Etiopía', 'ET', '+251'),
  entry('Filipinas', 'PH', '+63'), entry('Finlandia', 'FI', '+358'), entry('Fiyi', 'FJ', '+679'),
  entry('Francia', 'FR', '+33'), entry('Gabón', 'GA', '+241'), entry('Gambia', 'GM', '+220'),
  entry('Georgia', 'GE', '+995'), entry('Ghana', 'GH', '+233'), entry('Gibraltar', 'GI', '+350'),
  entry('Granada', 'GD', '+1473'), entry('Grecia', 'GR', '+30'), entry('Groenlandia', 'GL', '+299'),
  entry('Guadalupe', 'GP', '+590'), entry('Guam', 'GU', '+1671'), entry('Guatemala', 'GT', '+502'),
  entry('Guayana Francesa', 'GF', '+594'), entry('Guernsey', 'GG', '+44'), entry('Guinea', 'GN', '+224'),
  entry('Guinea-Bisáu', 'GW', '+245'), entry('Guinea Ecuatorial', 'GQ', '+240'), entry('Guyana', 'GY', '+592'),
  entry('Haití', 'HT', '+509'), entry('Honduras', 'HN', '+504'), entry('Hong Kong', 'HK', '+852'),
  entry('Hungría', 'HU', '+36'), entry('India', 'IN', '+91'), entry('Indonesia', 'ID', '+62'),
  entry('Irak', 'IQ', '+964'), entry('Irán', 'IR', '+98'), entry('Irlanda', 'IE', '+353'),
  entry('Isla de Man', 'IM', '+44'), entry('Isla de Navidad', 'CX', '+61'), entry('Isla Norfolk', 'NF', '+672'),
  entry('Islandia', 'IS', '+354'), entry('Islas Caimán', 'KY', '+1345'), entry('Islas Cocos', 'CC', '+61'),
  entry('Islas Cook', 'CK', '+682'), entry('Islas Feroe', 'FO', '+298'), entry('Islas Malvinas', 'FK', '+500'),
  entry('Islas Marianas del Norte', 'MP', '+1670'), entry('Islas Marshall', 'MH', '+692'), entry('Islas Salomón', 'SB', '+677'),
  entry('Islas Turcas y Caicos', 'TC', '+1649'), entry('Islas Vírgenes Británicas', 'VG', '+1284'), entry('Islas Vírgenes de EE. UU.', 'VI', '+1340'),
  entry('Israel', 'IL', '+972'), entry('Italia', 'IT', '+39'), entry('Jamaica', 'JM', '+1876'),
  entry('Japón', 'JP', '+81'), entry('Jersey', 'JE', '+44'), entry('Jordania', 'JO', '+962'),
  entry('Kazajistán', 'KZ', '+7'), entry('Kenia', 'KE', '+254'), entry('Kirguistán', 'KG', '+996'),
  entry('Kiribati', 'KI', '+686'), entry('Kosovo', 'XK', '+383'), entry('Kuwait', 'KW', '+965'),
  entry('Laos', 'LA', '+856'), entry('Lesoto', 'LS', '+266'), entry('Letonia', 'LV', '+371'),
  entry('Líbano', 'LB', '+961'), entry('Liberia', 'LR', '+231'), entry('Libia', 'LY', '+218'),
  entry('Liechtenstein', 'LI', '+423'), entry('Lituania', 'LT', '+370'), entry('Luxemburgo', 'LU', '+352'),
  entry('Macao', 'MO', '+853'), entry('Macedonia del Norte', 'MK', '+389'), entry('Madagascar', 'MG', '+261'),
  entry('Malasia', 'MY', '+60'), entry('Malaui', 'MW', '+265'), entry('Maldivas', 'MV', '+960'),
  entry('Malí', 'ML', '+223'), entry('Malta', 'MT', '+356'), entry('Marruecos', 'MA', '+212'),
  entry('Martinica', 'MQ', '+596'), entry('Mauricio', 'MU', '+230'), entry('Mauritania', 'MR', '+222'),
  entry('Mayotte', 'YT', '+262'), entry('México', 'MX', '+52'), entry('Micronesia', 'FM', '+691'),
  entry('Moldavia', 'MD', '+373'), entry('Mónaco', 'MC', '+377'), entry('Mongolia', 'MN', '+976'),
  entry('Montenegro', 'ME', '+382'), entry('Montserrat', 'MS', '+1664'), entry('Mozambique', 'MZ', '+258'),
  entry('Myanmar', 'MM', '+95'), entry('Namibia', 'NA', '+264'), entry('Nauru', 'NR', '+674'),
  entry('Nepal', 'NP', '+977'), entry('Nicaragua', 'NI', '+505'), entry('Níger', 'NE', '+227'),
  entry('Nigeria', 'NG', '+234'), entry('Niue', 'NU', '+683'), entry('Noruega', 'NO', '+47'),
  entry('Nueva Caledonia', 'NC', '+687'), entry('Nueva Zelanda', 'NZ', '+64'), entry('Omán', 'OM', '+968'),
  entry('Países Bajos', 'NL', '+31'), entry('Pakistán', 'PK', '+92'), entry('Palaos', 'PW', '+680'),
  entry('Palestina', 'PS', '+970'), entry('Panamá', 'PA', '+507'), entry('Papúa Nueva Guinea', 'PG', '+675'),
  entry('Paraguay', 'PY', '+595'), entry('Perú', 'PE', '+51'), entry('Pitcairn', 'PN', '+64'), entry('Polinesia Francesa', 'PF', '+689'),
  entry('Polonia', 'PL', '+48'), entry('Portugal', 'PT', '+351'), entry('Puerto Rico', 'PR', '+1787'),
  entry('Reino Unido', 'GB', '+44'), entry('República Centroafricana', 'CF', '+236'), entry('República Checa', 'CZ', '+420'),
  entry('República del Congo', 'CG', '+242'), entry('República Democrática del Congo', 'CD', '+243'), entry('República Dominicana', 'DO', '+1809'),
  entry('Reunión', 'RE', '+262'), entry('Ruanda', 'RW', '+250'), entry('Rumania', 'RO', '+40'),
  entry('Rusia', 'RU', '+7'), entry('Sáhara Occidental', 'EH', '+212'), entry('Samoa', 'WS', '+685'),
  entry('Samoa Americana', 'AS', '+1684'), entry('San Bartolomé', 'BL', '+590'), entry('San Cristóbal y Nieves', 'KN', '+1869'),
  entry('San Marino', 'SM', '+378'), entry('San Martín (Francia)', 'MF', '+590'), entry('San Martín (Países Bajos)', 'SX', '+1721'),
  entry('San Pedro y Miquelón', 'PM', '+508'), entry('San Vicente y las Granadinas', 'VC', '+1784'), entry('Santa Elena', 'SH', '+290'),
  entry('Santa Lucía', 'LC', '+1758'), entry('Santo Tomé y Príncipe', 'ST', '+239'), entry('Senegal', 'SN', '+221'),
  entry('Serbia', 'RS', '+381'), entry('Seychelles', 'SC', '+248'), entry('Sierra Leona', 'SL', '+232'),
  entry('Singapur', 'SG', '+65'), entry('Siria', 'SY', '+963'), entry('Somalia', 'SO', '+252'),
  entry('Sri Lanka', 'LK', '+94'), entry('Sudáfrica', 'ZA', '+27'), entry('Sudán', 'SD', '+249'),
  entry('Sudán del Sur', 'SS', '+211'), entry('Suecia', 'SE', '+46'), entry('Suiza', 'CH', '+41'), entry('Georgia del Sur e Islas Sandwich del Sur', 'GS', '+500'),
  entry('Surinam', 'SR', '+597'), entry('Svalbard y Jan Mayen', 'SJ', '+47'), entry('Tailandia', 'TH', '+66'),
  entry('Taiwán', 'TW', '+886'), entry('Tanzania', 'TZ', '+255'), entry('Tayikistán', 'TJ', '+992'),
  entry('Timor Oriental', 'TL', '+670'), entry('Togo', 'TG', '+228'), entry('Tokelau', 'TK', '+690'),
  entry('Tonga', 'TO', '+676'), entry('Trinidad y Tobago', 'TT', '+1868'), entry('Túnez', 'TN', '+216'),
  entry('Turkmenistán', 'TM', '+993'), entry('Turquía', 'TR', '+90'), entry('Tuvalu', 'TV', '+688'),
  entry('Islas Åland', 'AX', '+358'), entry('Ucrania', 'UA', '+380'), entry('Uganda', 'UG', '+256'), entry('Uruguay', 'UY', '+598'),
  entry('Uzbekistán', 'UZ', '+998'), entry('Vanuatu', 'VU', '+678'), entry('Ciudad del Vaticano', 'VA', '+39'),
  entry('Venezuela', 'VE', '+58'), entry('Vietnam', 'VN', '+84'), entry('Wallis y Futuna', 'WF', '+681'),
  entry('Yemen', 'YE', '+967'), entry('Yibuti', 'DJ', '+253'), entry('Zambia', 'ZM', '+260'), entry('Zimbabue', 'ZW', '+263'),
]

export const defaultCountry = countries.find(({ iso }) => iso === 'CO')

const searchKey = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export function countryName(country, language = 'es') {
  if (language === 'es') return country.name
  return new Intl.DisplayNames([language], { type: 'region' }).of(country.iso) || country.name
}

export function searchCountries(query, language = 'es') {
  const term = searchKey(query)
  if (!term) return countries
  return countries.filter((country) => searchKey(countryName(country, language)).includes(term) || country.iso.toLowerCase().includes(term) || country.dialCode.includes(term))
}
