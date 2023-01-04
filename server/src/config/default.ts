const SALT_WORK_FACTOR = 10;

const ACCESS_TOKEN_TTL = '15m';

const REFRESH_TOKEN_TTL = '1y';

const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgFrLjDmr+++Zm6wAeeV/LyWMW0ElS5+8ivbpgqXSLi96019N3Tf+
Hvp+Ll3lNg0/wVKrnYlS2j/uVsdMbT+Nfx3Kdlv1OJkzYD4Ji/M6FwTUzrDJ8BIi
PhRFRHmBGnaXlV/9bKyEgeNkOFewg1NQC8MTuzsgVxqLsFhGV4jrydwtAgMBAAEC
gYAqmNKaABk7yQpjAPovdKMO77Gkd7XqJE/iFZ3I5Dns5qgiT2qZKW0pQmfIf5AD
WUT+3ysS0T85vT0TVcTvixf2t19SzH4BLQyjzT3ZudHEZRRlTS5YV1i14AqmTyNt
QlBRM6ga/pwBk6fKw9B8Goiba+ylNvi7vXEO40FuiVYW1QJBAKfClnb4KHKBMl+T
OpnCqRlQXx0VuhpdgnrFURbkWjUqFpiv+nf9AUEBZc1QWL+YlpBwt2uXl6wyotQ/
Cqr3oNsCQQCKjWMZDPakw6EVZ7DLVExbA2hAJJ/NuDYhyEQEc/hI9i9xCDUAurwG
HLTC29skR9zA5yz14giFUEvCzi9qhWGXAkEAptlMxwRnTgMbM5190gGeJzQddRLv
5lsMc8idrtPsuCWlFbUoun/i6GFYe8wmiGBdl0jT1GmQC07NTaVpmcLxswJATmj/
mTC18L7pzbRV4Gw/ng5KlGplqcXDlNDCdYawD5KLfLt5S4ViXU8nmVNVLK4ip2Tt
E+Ysjk3H4mJPgUgk1wJBAJNR9P/C6Bvo8e4Yavy+G3QLe4a+9IiuYA/8Au7rCHeo
tN3VM6/1h0vFKFDalKNei+hb8/jdYD3I28dHAZLahL0=
-----END RSA PRIVATE KEY-----`;

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFrLjDmr+++Zm6wAeeV/LyWMW0El
S5+8ivbpgqXSLi96019N3Tf+Hvp+Ll3lNg0/wVKrnYlS2j/uVsdMbT+Nfx3Kdlv1
OJkzYD4Ji/M6FwTUzrDJ8BIiPhRFRHmBGnaXlV/9bKyEgeNkOFewg1NQC8MTuzsg
VxqLsFhGV4jrydwtAgMBAAE=
-----END PUBLIC KEY-----`;

export const defaultConfig = {
  jwt: {
    saltWorkFactor: SALT_WORK_FACTOR,
    accessTokenTtl: ACCESS_TOKEN_TTL,
    refreshTokenTtl: REFRESH_TOKEN_TTL,
    privateKey: PRIVATE_KEY,
    publicKey: PUBLIC_KEY
  },
  role: {
    admin: 'admin',
    manager: 'manager',
    seller: 'seller',
    bidder: 'bidder'
  }
};
