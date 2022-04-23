/**
 * Currencies taken from https://developers.google.com/adsense/management/appendix/currencies
 */

const currencies = [
  {
    currencyCode: 'AED',
    currencyName: 'United Arab Emirates Dirham',
  },
  {
    currencyCode: 'ARS',
    currencyName: 'Argentine Peso',
  },
  {
    currencyCode: 'AUD',
    currencyName: 'Australian Dollar',
  },
  {
    currencyCode: 'BDT',
    currencyName: 'Bangladeshi Taka',
  },
  {
    currencyCode: 'BGN',
    currencyName: 'Bulgarian Lev',
  },
  {
    currencyCode: 'BHD',
    currencyName: 'Bahraini Dinar',
  },
  {
    currencyCode: 'BND',
    currencyName: 'Brunei Dollar',
  },
  {
    currencyCode: 'BOB',
    currencyName: 'Bolivian Boliviano',
  },
  {
    currencyCode: 'BRL',
    currencyName: 'Brazilian Real',
  },
  {
    currencyCode: 'BWP',
    currencyName: 'Botswanan Pula',
  },
  {
    currencyCode: 'BYN',
    currencyName: 'Belarusian Ruble',
  },
  {
    currencyCode: 'CAD',
    currencyName: 'Canadian Dollar',
  },
  {
    currencyCode: 'CHF',
    currencyName: 'Swiss Franc',
  },
  {
    currencyCode: 'CLP',
    currencyName: 'Chilean Peso',
  },
  {
    currencyCode: 'CNY',
    currencyName: 'Chinese Yuan',
  },
  {
    currencyCode: 'COP',
    currencyName: 'Colombian Peso',
  },
  {
    currencyCode: 'CRC',
    currencyName: 'Costa Rican Colón',
  },
  {
    currencyCode: 'CZK',
    currencyName: 'Czech Koruna',
  },
  {
    currencyCode: 'DKK',
    currencyName: 'Danish Krone',
  },
  {
    currencyCode: 'DOP',
    currencyName: 'Dominican Peso',
  },
  {
    currencyCode: 'DZD',
    currencyName: 'Algerian Dinar',
  },
  {
    currencyCode: 'EGP',
    currencyName: 'Egyptian Pound',
  },
  {
    currencyCode: 'EUR',
    currencyName: 'Euro',
  },
  {
    currencyCode: 'FJD',
    currencyName: 'Fijian Dollar',
  },
  {
    currencyCode: 'GBP',
    currencyName: 'British Pound Sterling',
  },
  {
    currencyCode: 'GEL',
    currencyName: 'Georgian Lari',
  },
  {
    currencyCode: 'GHS',
    currencyName: 'Ghanaian Cedi',
  },
  {
    currencyCode: 'HKD',
    currencyName: 'Hong Kong Dollar',
  },
  {
    currencyCode: 'HRK',
    currencyName: 'Croatian Kuna',
  },
  {
    currencyCode: 'HUF',
    currencyName: 'Hungarian Forint',
  },
  {
    currencyCode: 'IDR',
    currencyName: 'Indonesian Rupiah',
  },
  {
    currencyCode: 'ILS',
    currencyName: 'Israeli New Sheqel',
  },
  {
    currencyCode: 'INR',
    currencyName: 'Indian Rupee',
  },
  {
    currencyCode: 'IQD',
    currencyName: 'Iraqi Dinar',
  },
  {
    currencyCode: 'JOD',
    currencyName: 'Jordanian Dinar',
  },
  {
    currencyCode: 'JPY',
    currencyName: 'Japanese Yen',
  },
  {
    currencyCode: 'KES',
    currencyName: 'Kenyan Shilling',
  },
  {
    currencyCode: 'KRW',
    currencyName: 'South Korean Won',
  },
  {
    currencyCode: 'KWD',
    currencyName: 'Kuwaiti Dinar',
  },
  {
    currencyCode: 'KZT',
    currencyName: 'Kazakhstani Tenge',
  },
  {
    currencyCode: 'LBP',
    currencyName: 'Lebanese Pound',
  },
  {
    currencyCode: 'LKR',
    currencyName: 'Sri Lankan Rupee',
  },
  {
    currencyCode: 'LTL',
    currencyName: 'Lithuanian Litas',
  },
  {
    currencyCode: 'MAD',
    currencyName: 'Moroccan Dirham',
  },
  {
    currencyCode: 'MMK',
    currencyName: 'Myanma Kyat',
  },
  {
    currencyCode: 'MOP',
    currencyName: 'Macanese Pataca',
  },
  {
    currencyCode: 'MUR',
    currencyName: 'Mauritian Rupee',
  },
  {
    currencyCode: 'MXN',
    currencyName: 'Mexican Peso',
  },
  {
    currencyCode: 'MYR',
    currencyName: 'Malaysian Ringgit',
  },
  {
    currencyCode: 'NAD',
    currencyName: 'Namibian Dollar',
  },
  {
    currencyCode: 'NGN',
    currencyName: 'Nigerian Naira',
  },
  {
    currencyCode: 'NIO',
    currencyName: 'Nicaraguan Córdoba',
  },
  {
    currencyCode: 'NOK',
    currencyName: 'Norwegian Krone',
  },
  {
    currencyCode: 'NPR',
    currencyName: 'Nepalese Rupee',
  },
  {
    currencyCode: 'NZD',
    currencyName: 'New Zealand Dollar',
  },
  {
    currencyCode: 'OMR',
    currencyName: 'Omani Rial',
  },
  {
    currencyCode: 'PEN',
    currencyName: 'Peruvian Nuevo Sol',
  },
  {
    currencyCode: 'PHP',
    currencyName: 'Philippine Peso',
  },
  {
    currencyCode: 'PKR',
    currencyName: 'Pakistani Rupee',
  },
  {
    currencyCode: 'PLN',
    currencyName: 'Polish Zloty',
  },
  {
    currencyCode: 'PYG',
    currencyName: 'Paraguayan Guarani',
  },
  {
    currencyCode: 'QAR',
    currencyName: 'Qatari Rial',
  },
  {
    currencyCode: 'RON',
    currencyName: 'Romanian Leu',
  },
  {
    currencyCode: 'RSD',
    currencyName: 'Serbian Dinar',
  },
  {
    currencyCode: 'RUB',
    currencyName: 'Russian Ruble',
  },
  {
    currencyCode: 'SAR',
    currencyName: 'Saudi Riyal',
  },
  {
    currencyCode: 'SEK',
    currencyName: 'Swedish Krona',
  },
  {
    currencyCode: 'SGD',
    currencyName: 'Singapore Dollar',
  },
  {
    currencyCode: 'SVC',
    currencyName: 'Salvadoran Colón',
  },
  {
    currencyCode: 'THB',
    currencyName: 'Thai Baht',
  },
  {
    currencyCode: 'TND',
    currencyName: 'Tunisian Dinar',
  },
  {
    currencyCode: 'TRY',
    currencyName: 'Turkish Lira',
  },
  {
    currencyCode: 'TWD',
    currencyName: 'New Taiwan Dollar',
  },
  {
    currencyCode: 'TZS',
    currencyName: 'Tanzanian Shilling',
  },
  {
    currencyCode: 'UAH',
    currencyName: 'Ukrainian Hryvnia',
  },
  {
    currencyCode: 'UGX',
    currencyName: 'Ugandan Shilling',
  },
  {
    currencyCode: 'USD',
    currencyName: 'US Dollar',
  },
  {
    currencyCode: 'UYU',
    currencyName: 'Uruguayan Peso',
  },
  {
    currencyCode: 'UZS',
    currencyName: 'Uzbekistan Som',
  },
  {
    currencyCode: 'VEF',
    currencyName: 'Venezuelan Bolívar (2008-2018)',
  },
  {
    currencyCode: 'VES',
    currencyName: 'Venezuelan Bolívar',
  },
  {
    currencyCode: 'VND',
    currencyName: 'Vietnamese Dong',
  },
  {
    currencyCode: 'XOF',
    currencyName: 'CFA Franc BCEAO',
  },
  {
    currencyCode: 'ZAR',
    currencyName: 'South African Rand',
  },
];

export default currencies;
