/* ---------- Francia: mapa de provincias al estilo Clausewitz ----------
   mapa/provinces.png: un color RGB exacto por provincia. Se lee píxel a píxel para saber
   qué provincia hay bajo el dedo y para trazar fronteras donde cambia el color. */
const PROV_DEF = [{"id": "fuera", "r": 0, "g": 0, "b": 0, "nombre": "Fuera del reino", "tipo": "fuera", "capital": "", "nota": ""}, {"id": "ile-de-france", "r": 93, "g": 137, "b": 191, "nombre": "Île-de-France", "tipo": "reino", "capital": "París", "nota": "Gobierno de la capital y de Versalles."}, {"id": "picardie", "r": 146, "g": 234, "b": 142, "nombre": "Picardía", "tipo": "reino", "capital": "Amiens", "nota": ""}, {"id": "flandre", "r": 199, "g": 131, "b": 93, "nombre": "Flandes y Henao", "tipo": "reino", "capital": "Lille", "nota": "Frontera norte, plazas fuertes."}, {"id": "artois", "r": 52, "g": 228, "b": 44, "nombre": "Artois", "tipo": "reino", "capital": "Arras", "nota": ""}, {"id": "champagne", "r": 105, "g": 125, "b": 195, "nombre": "Champaña", "tipo": "reino", "capital": "Troyes", "nota": "Reims, ciudad de la consagración."}, {"id": "trois-eveches", "r": 158, "g": 222, "b": 146, "nombre": "Metz y Verdún (Tres Obispados)", "tipo": "reino", "capital": "Metz", "nota": "Enclaves franceses dentro de la Lorena."}, {"id": "lorraine", "r": 211, "g": 119, "b": 97, "nombre": "Ducado de Lorena", "tipo": "extranjero", "capital": "Nancy", "nota": "Ducado soberano. Francés solo desde 1766."}, {"id": "alsace", "r": 64, "g": 216, "b": 48, "nombre": "Alsacia", "tipo": "reino", "capital": "Estrasburgo", "nota": "Francesa desde el siglo XVII."}, {"id": "normandie", "r": 117, "g": 113, "b": 199, "nombre": "Normandía", "tipo": "reino", "capital": "Ruan", "nota": ""}, {"id": "bretagne", "r": 170, "g": 210, "b": 150, "nombre": "Bretaña", "tipo": "reino", "capital": "Rennes", "nota": "Estados provinciales propios."}, {"id": "maine", "r": 223, "g": 107, "b": 101, "nombre": "Maine y Perche", "tipo": "reino", "capital": "Le Mans", "nota": ""}, {"id": "anjou", "r": 76, "g": 204, "b": 52, "nombre": "Anjou", "tipo": "reino", "capital": "Angers", "nota": ""}, {"id": "touraine", "r": 129, "g": 101, "b": 203, "nombre": "Turena", "tipo": "reino", "capital": "Tours", "nota": ""}, {"id": "orleanais", "r": 182, "g": 198, "b": 154, "nombre": "Orleanesado", "tipo": "reino", "capital": "Orleans", "nota": ""}, {"id": "berry", "r": 235, "g": 95, "b": 105, "nombre": "Berry", "tipo": "reino", "capital": "Bourges", "nota": ""}, {"id": "nivernais", "r": 88, "g": 192, "b": 56, "nombre": "Nivernés", "tipo": "reino", "capital": "Nevers", "nota": ""}, {"id": "bourgogne", "r": 141, "g": 89, "b": 207, "nombre": "Borgoña", "tipo": "reino", "capital": "Dijon", "nota": "Estados de Borgoña."}, {"id": "dombes", "r": 194, "g": 186, "b": 158, "nombre": "Principado de Dombes", "tipo": "extranjero", "capital": "Trévoux", "nota": "Principado soberano del duque de Maine."}, {"id": "franche-comte", "r": 47, "g": 83, "b": 109, "nombre": "Franco Condado", "tipo": "reino", "capital": "Besanzón", "nota": "Francés desde 1678."}, {"id": "poitou", "r": 100, "g": 180, "b": 60, "nombre": "Poitou", "tipo": "reino", "capital": "Poitiers", "nota": ""}, {"id": "aunis", "r": 153, "g": 77, "b": 211, "nombre": "Aunis", "tipo": "reino", "capital": "La Rochelle", "nota": ""}, {"id": "saintonge", "r": 206, "g": 174, "b": 162, "nombre": "Saintonge y Angoumois", "tipo": "reino", "capital": "Saintes", "nota": ""}, {"id": "limousin", "r": 59, "g": 71, "b": 113, "nombre": "Lemosín", "tipo": "reino", "capital": "Limoges", "nota": ""}, {"id": "marche", "r": 112, "g": 168, "b": 64, "nombre": "La Marche", "tipo": "reino", "capital": "Guéret", "nota": ""}, {"id": "bourbonnais", "r": 165, "g": 65, "b": 215, "nombre": "Borbonés", "tipo": "reino", "capital": "Moulins", "nota": ""}, {"id": "auvergne", "r": 218, "g": 162, "b": 166, "nombre": "Auvernia", "tipo": "reino", "capital": "Clermont", "nota": ""}, {"id": "lyonnais", "r": 71, "g": 59, "b": 117, "nombre": "Lionesado", "tipo": "reino", "capital": "Lyon", "nota": "Sedas y banca."}, {"id": "dauphine", "r": 124, "g": 156, "b": 68, "nombre": "Delfinado", "tipo": "reino", "capital": "Grenoble", "nota": ""}, {"id": "guyenne", "r": 177, "g": 53, "b": 219, "nombre": "Guyena y Gascuña", "tipo": "reino", "capital": "Burdeos", "nota": "El gobierno más extenso del reino."}, {"id": "bearn", "r": 230, "g": 150, "b": 170, "nombre": "Bearne y Navarra", "tipo": "reino", "capital": "Pau", "nota": ""}, {"id": "foix", "r": 83, "g": 47, "b": 121, "nombre": "Condado de Foix", "tipo": "reino", "capital": "Foix", "nota": ""}, {"id": "roussillon", "r": 136, "g": 144, "b": 72, "nombre": "Rosellón", "tipo": "reino", "capital": "Perpiñán", "nota": "Francés desde 1659."}, {"id": "languedoc", "r": 189, "g": 41, "b": 223, "nombre": "Languedoc", "tipo": "reino", "capital": "Toulouse", "nota": "Estados de Languedoc; Montpellier y su facultad."}, {"id": "comtat", "r": 42, "g": 138, "b": 174, "nombre": "Condado Venesino y Aviñón", "tipo": "extranjero", "capital": "Aviñón", "nota": "Territorio del papa."}, {"id": "provence", "r": 95, "g": 235, "b": 125, "nombre": "Provenza", "tipo": "reino", "capital": "Aix", "nota": "Sale de la peste de 1720."}];
const PROV_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAR+CAIAAABPoVtcAABKc0lEQVR42u3dUYil93nf8XeXRfhCNwkYREGFlgS6UKuZ0LkQWCXBJdQQY3CxIDixWSG0aGFEfeFQ4YoSFONSk7h4QWYds4s3dQoJMQgbUoQLJQ7oYiDb1BcbUMiFXIqIwb7RhVly0YtRT2Znzpw55z3/933/z/N8PvhiYzuy9O7MnPPd3/99zzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADACG+//lsuAgANXXEJACBWCj772h+6IAA0cdUlAIBANQgADVkIASBeChoJARCEAFAuBTUhAA05MgoA3fmX/+efH9144DoAMDULIQD0lYKn/8/b9w42/JeNhADsyUIIAJ3W4DAMm3dCD5sBQBACQIYUPF+D29CEAAhCAEibgm4mBEAQAkDOGtzmv+bgKAAT8VAZAOg3BU/zgBkAmrvmEgBA5ykIABNxZBQAYtSgg6MANOfIKAD0noKnOTgKQEMWQgCYPAUbHhP10FEABCEAhKnBOf/nHBwFYCeOjAJAvBR0cBSAJiyEABCsBgcHRwFoxEIIAJFS8LQNO6GREIBtWAgBoFkK9vMZg24mBEAQAsB8NTj//6iDowDsyZFRAIiXgqc5OAqAIASAcimoCQHYkyOjABC7BjdzMyEAghAAWqZgbzXoZkIABCEAzFGDff6NbWhCIyEAF3EPIQDETsHT3EwIwE6uuQQAkCAFAWAER0YBIE8NOjgKwE4cGQWADCl42oaDo4OzowAIQgBImYKaEABBCACla3CbJpSFAAhCAEiYglsGoSwEQBACQNrniG7ZhLIQoCxPGQVADab9VIkNDx09wzNIAWqyEAIgBZPbficcTIUAghAA1GDZIJSFAIIQAKRg9SaUhQCCEACkoCYEQBACgBos2YSyEEAQAoAUrBuEshBAEAKAIKzehLIQIBmfQwgAhWz/yYQX8YmFAJlYCAHIz0J4xv474WAqBBCEACAIKzehLASIzpFRAGC8t1//LYdIAQQhABDJ/jcTnslClxQgIkdGAcjPkdGLtDo4uuIEKYAgBABBWLcJZSFAII6MAgCNubEQQBACAAG0vZnwTBa6vACdc2QUgPwcGb3UFAdHV5wgBRCEACAI6zahLATokyOjAMAwTHl29IQTpACCEACoy8NmAHrjyCgA+Tkyur2pD46uOEEKIAgBQBDWbUJZCLA4R0YBgMdMfTPhaU6QAizLQghAfl/7u9+//+iu67CTOXfCwVQIIAgBYLogHIZBE3behLIQYH6OjAJQxWefeMFF6JzHkAIIQgCYsAll4fbmvJnwTBa6+ADzcGQUgPxOjoye5vjo9uY/OLriBCmAIASA9kEoC6M0oSwEEIQAMEkQasIoTSgLASbiHkIASnNL4ZaWup9wxY2FAFOwEAKQ34aFcMVUuI3Fd8LBVAjQlIUQAIbBVBiHj6YAaMhCCEB+2yyEK6bCzXoYCVeshQB7shACwGNMhZstfjPhaaZCgD1ZCAHIb6eF8ISdcLOudsLBVAggCAGgYRDKwnBNKAsBBCEAtAxCTRiuCWUhwE7cQwgAm3z2iRfcVXiRru4nXHFjIcD2LIQA5LfPQrhiKrxInzvhYCoEEIQA0CoINWHEJpSFAIIQAEH4+w3/arIwXBPKQoCLuIcQAHbjlsK1+ryfcMWNhQBrWQgByK/tQrhiKjyv851wMBUCPM5CCAAjmQrP63wnHEyFAIIQABo2oSzUhACCEABKZ6GLoAkBBCEAaEI0IYAgBIB6TSgLNSGAIASA0lnoIgRqQgBBCAA0bkJZGKUJjYSAIAQAJslCF0ETAghCAKjbhLJQEwIIQgAonYUugiYEEIQAULcJZaEmBBCEAFA6C10ETQggCAGgbhPKws5pQkAQAgDTZqGLoAkBBCEA1G1CWagJAQQhAJTOQhdBEwIIQgCo24SyUBMCCEIAkIUAIAgBoGoWugi9MRICghAAmK8JZaEmBBCEACAL0YQAghAAqmahi6AJAQQhANRtQlmoCQEEIQDIQjQhgCAEAFmIJgQQhABwqa/93e8ny8LQf/+37x1oQgBBCABqcHwTmgo1IUATV1wCAKRgXPcf3Y31N5xjIVx59rU/9L0GhHbNJQBADca1mgrDlSEAPXBkFAA1mKQMnSOdn4OjgCAEADUoCzUhQEjuIQRACubU5yHSZPcQrriZEBCEAKAGlWHRINSEgCAEADWoDOsGoSYEInIPIQBqsAp3GE7N/YRAOBZCAKRgUYsMhrkXwhN2QiAQCyEAIX3h82+7CHs6GQxths3ZCYFALIQABK7Bp1+VhY1NPRtWWAhP2AmBECyEAEStQaZgNmzFTgiEcM0lAEAKsrYMV7/u8yMNAdifI6MAxK5Bp0bntH8Z1jkyesLBUUAQAsBUNSgIw8VhtSDUhIAgBICpalAThovDgkGoCQFBCACTpKAgDBeHNYNQEwKCEAAmqUFNGCsOywahJgQEIQBMUoOCMFAclg3C+49eGobh668/5ysBEIQA0LIGNWEgh3celK3BE5oQ6IoPpgegrxT0YYMkrsFhGF5+7QeuCSAIAWBNDe7z//6jLz/rGvbv+GatI6NnalATAoIQANrXIESpQU0ICEIAmKQGjYQhFBkJN9SgJgT6cc0lACBBCkKsGgTohIUQgFQ1aCQMIfdIuH0NGgkBQQiAGoSKNagJAUEIgBpsz0gYQsqRcNxJUU0ICEIACqWgbZCU9rlvUBMCghCAEjU4z/+QkTCETCPh/k+R0YTAIjxlFIBsNQjhavBME3799edcVWAeV1wCALLW4NOvStAADu88UIMXUYaAIARACgpCTVixBsUhIAgBUIOaUBCqQWUICEIApKAg1ITla1AZAoIQADWoCQVh9RpUhoAgBEAKCkJNWL0GlSEgCAFQg5pQEFavQXEICEIApKAg1IRqUBkCghAAKagJBWH5GlSGgCAEoHoNCkJNqAaVISAIAaiYgppQEKpBcQgIQgBK16Ag1IRqUBkCghCAiimoCTWhFFSGwFrXXAIAKqQgqMEtvfzaD5Qh1GEhBKBWDRoJo1hwJKxcg2spQ0jMQghAlRQENTjOajMUh5CPhRCAcjVoJIxi/pFQDW5PGUIOFkIACqUgqMFW3GoIOVgIAahYg0bCEI7vHdx6dFcNhiALQRACIAUFIW068My/M2kWSkFlCIIQAClYLpA0YYgUnLoJ1aAsBEEIgBqsmEaCMEQHTpqFalAZAoIQQArWpQmjdOAUTagGZSEgCAHUYGmCMFAHts1CNagMAUEIIAXRhME6sEkTqkFZCAhCACmIIAzZgftkoRRUhoAgBFCDaMLwHTgiC9WgLAQEIYAURBOmSsEtm1ANKkNAEAKoQQRhtg7cJgvVoCwEBCGAFEQTpu3Ai5pQCipDQBDCMu/Cv/LVZ10HpKAg1IELZqEalIWAIIQl34trQtSgJtSBC3ry/Wt+y5QhIAhh4XfkshApKAh1oCBEFoIghLrvyzUhalAT6kBBiDIEQQil35rLQqSgIJSCghBZCIIQ6r5B14RIQU2oAzUhyhAEIWhCUIOCUAcKQmQhCEIo+WZdFiIFNaEOFIQoQxCEUPctuyZEDWpCHSgIkYUgCKHuu3ZNiBQUhDpQE6IMQRBC6bfvshApqAl1oCBEFoIghLpv4jUhalAQSkFBiDIEQQil38fLQqSgJtSBghBZCIIQ6r6b14SoQUGoAwUhyhAEIWhCfNmgCXWgJkQWgiCEku/sZaGvGQShDhSEKEMQhFD3zb0m9NWCJtSBghBZCIIQSr/Fl4W+TtCEOlAQogxBEIImxFcI5YJQCmpCZCEIQvB2XxP62qBWE+pAQUifDm88eOGfvuI6IAiBZd70y0JfGOQOQh0oCOk5BU//n7IQQQgs875fE/qSIF8T6kBBSKAUPEMZIggBTYgUFIQ6UBBSLgVlIYIQWDIDZKEvA4I2oQ7UhGRKQWWIIAQWKwFNKAUJ1IQ6UA2SOwVlIYIQWCYJZKEapPMglIKCkDopqAwRhMACVaAJpSAdNqEOFIRUTkFZiCAEZm0DTSj/6CQIdaAgRArKQgQhsEwtyELtx1JNqAPVIFJQFiIIAU3oN45aTagDBSFSUBYiCIHuukIWyj9m8N5TP3MRBCFSUBYiCIEeS0MTyj8EIYKQPlNQFiIIQXtoQu2HGkQNUr0GlSGCEDSJLJR/CEIEIaVTUBYiCEGlaEL5hyBEEFI6BWUhghAEoSyUfwhCBCGlU1AWIghBEGpC7YcgRA1SvQZlIYIQNGHFJpR/CEIEIVJQFiIIQRCWyEL5hyBEEKIGZSGCEARh/ibUfqhBBCFSUBYiCIGO0mi6JpR/CELUIGpQFiIIgQC9tH8Wyj8EIYIQKSgLEYRA1ILaqQnlHwhCQYgalIUIQiBPEF6UhdoPBKEaRA3KQgQhUCIIAUEoCJGCshBBCGhCQBAKQtSgMiS/qy4BAABqMJ+7f/u1u3/7NdcBQQgALZkH+2ceVIPIQrbkyCgsyalREIQIQtTgbBwi5TwLIQAAarAEayGCEAAANSgLZSGCEADIyHlRNYgsZHvuIYSFuY0QwnEPoSBEDSbj3sLKLIQAAKjB0qyFghAAANSgLJSFghAAuJjzop1zXlQNIgvZiXsIYXluIwRBiCBUgy5Ch9xbWIEfmgAAqEHWWE2FyjAxR0YBAIBLytA5UkEIANU5L9o550UjMg/KQpblHkLogtsIQRAiCNUggThEmoaFEADUIKhBdmMtFIQAoAbpiHkQZCGCEACAAMyDspBOuIcQeuE2QuiWeTAEC6EapB/uMAzEj04AUIMALZ0eDMWhIAQAmJZ5MBDzoDikK46MQkecGoXemAcFIYKQiYjDTvjpCQBqENQgc1sth8pQEAIAjGceVIOE9it//UurX//Pf/a/XBBBCADLMw8CzOD+o7vicFk+hxA68pWvPusigBoEKOLwzqbR+Ff++pdW/3KtpmMhBAA1CNBLB14Uh6tfWw4FIQDAB9xAGMjxvQO3EerA/YlDQQgAUzEPAvTZgeJwIj6HELrj0whBDbI9C2GwNrAQ6sBTjib7ehCH2/MzFAAAmK8DZ2A5FIQAsBvzYETmwXDcRqgDxaEgBAA1CKADl4xDZSgIoV9f+eqzbiMEAHTgDGUoDgUhANWZB4NyXjQop0Z1oDgUhACgBgFEoDgUhAAAQL0OPOp+KC4Shz6HEDrlNkKYgXkwLudFw/eGU6NVOzBQEF4kWRz6YQoAADqQbSVbDgUhAEWZBwERiDgUhACoQWBusZ41umqn45sHOpBkcegeQuiX2whBELKWGwhziBKEawsqVhn2GYFHZe4j7TwO/TwFQA0C7JZSp//9PuPQEtiP1XLYZxlaCKFfFkJQg6xlIcyTW31vRCOaatk4DBSBR+UfM9tPHApC0IQgCFGDCMJJ4mrqPow7AwrCfuLQj1QA1CCwjG4fLdMqtBref+gIaGLLPo1GEAKgBgHmSy9pR1dxeNVFBwBgKcf3DlwEOG+2qVAQQte+8tVnXQRowjyYgxsImZr5jmoEIQBqEFhSPyOhGqQTc95JKAgBAEANzscjRrsiCAFIzjyYhvOiiS0+EqpB+jHzg0YFIfTObYQAoAZRg4IQAHZmHoQolhoJ1SDFCUIA1CABOC+KGiS9+edBQQgAQC9mHgnVIAhCiMFthDCCeRBQgwSyyDwoCAFQg0BH5hkJ1SBqUBACAGG4gRA1mIYPIeyNIAQgG/MghDbpSKgG6dCC86AghDDcRggAahCacwADgNh+9dM/PPPv/Lcf/KLLkonzogUd3zs4bH2wUA3Sp2XnQUEIQNTqA1CDIAgBUH1n/cZz7xgJM3n/yb83EhbUcCRUg3Rr8XlwGIYrfhsgkC98/m0XAeG3JU2YiSAsa/8mVIO98ZTRrmpwsBACED38LmInBNQgCEIA8rcfkNU+B0fVID3rZB4cHBllH3/8v994/plbrsPMnBpF++3ESJiA86LFjQtCNdgzp0YFIeE78KL/SB8KQrSfJkQQsngTqkFBqAYFIXOnoDgUhGg/TYgaZPEmlIKCUA3uyg9ZGnfgRf9f+hDk34I8YAZKRKMahN1ZCGmfgpcSh3syEqL9RhCEEZkHeaz3Ns5KajCWsiNhb/PgYCFkzg686K+vD0EHzsBICNFteOKoGgRBSIwUvPR/VBwCmpAT5kG2pAaJosN5cHBklAU7cBv6cC1HRrmUeXADTSgIiZ1/j4+EajCuaqdG+6zBwUKoA2P9HerDE1/56rOaEDWIGgQ1CPuzEErBqIrHoSBEDe7DSCgIid2BNx5IwQRKLYTdzoOCUAfmUa0PBSGCUBMKQiq79eiui6AJBWETftpKwYT/gE6Woga5lAfMqEHUIKjBwUKoAyvI2odGQtTg/jShIEQQsqAKC2HnNThYCKVgwUthP0QNghoE4ISFUAeWFjoOLYSowSaMhIKQcCyEmeQeCfufBwcLoQ503dL0ITCOmwnVIEBlFkIpyHoh4tBIyGAebEQTCkKiMA8mk3ghDDEPDhZCHciWV9h4iBoENQg0d/veQcomjFKDglAKMuayi0PUYD4OjgJQkyDUgez7e6EPQROyP/MgkEageXBwD6EUZHF79qTbCMsyD05EEwpCOucewpSSnRqNFYR++OpAov9Gf/AD9PjegYupBkENogZBDQpCHUhFh6f+aE0cqkFGc3AUgDo1ODgyKgVJTxwKQkbQhHMyD7I9C2FiOU6NRgxCP4J1IMlZDtUgI9gJAahQg4JQCiIOUYNoQgDqcmRUB4I4VIOsJwhn4LwoO3FkNLfQp0aDzoODhVAKwmA5hAsYCUENQnqCUAeCOAzAPKgJUzIPAjnEnQcFoRQEcagG0YQAFK1BQagDYUwc6kM1CPszDwJn3L53kOPDJwShDoRafSgOp3Pr0d2Hw6HrsDgjIQBrRZ8HB08ZlYLQnD7cPwLP/DsPP6MJu6AJGzIPsv/PRlIKtxAKQh2oA0EcTv5GRxBqQkEIglATqkFBKAVBH9Z9f6MJNaEaxA9MF0EQqsEp+ImsA2E+7jz0ngYA6IqFUApCF9L34f4daCTsh5FwH+ZBlvopSiD9j4Rp5sHBQqgDoROr8TBTGXr7kpWHjgKQhoVQB0J3ojfhdB1oJOyKJhzBPEhvP1fpU+cLYaZ5UBBKQdCEwd6vaEJBKAgRhGhCQdiQn8s6EHp0eONBlCb0NqUsB0fVIEACFkIpCF3rNgsX7EAjYVc0oSAk949cFtTnSJhsHhwqL4Q6EELobSr0poQz7IRqEEAQSkEgeRN21YHXv31sJNSEACAIdSBowkIdCHGZB4ERbt876P8DCRPIfw+hDoRMZsvC/lPQSNgbI6EgpOwPZKbTWxDmu4FwyL0QSkHIZ+qp0NsORnNwVA0CRJRwIdSBkF7zJgzagUbCDmlCQUhz/qiuuK5GQguhFAS60HAn9D4D1CBAZRkWQh0IZY3OwjQdaCTskJFQENKWP7krrp+FMOU8GD4IpSCwaxPme2OhCTWhGkQQogkF4Wghf1LrQGBly+Oj3k8wJw+YAUAQAnTRhOlT0OfUd9uEJ78oW4bmQYAQ4h0ZNQ8CFzmdhaUmQUEYQrUyFIS04ogHQx+nRt1DKAiBGE1Y862DJlSGahBNiCBUgyNcVYOANw0wp9947p2Tf7kUAFu63fojiFnxB3gAGbiTMGgZrn6daTY0DwIEctUlAIAe4tBsCBd544kXXAQQhM6LAmxy/dvHLoIyXJx5EJjIgqdGE99AODgyCmRyeOeBi0CmMjz5hY80BEAQAnA5dxIqw2WZBwHCCXNk1HlRAJSh+wwpy22EDJ41Og1/kgeQipGwSBmuft3PbGgeBBCEUzEPAsDmOHSrIcAUcj9RZvCxE0Aaniiz4nGjZctwwQOl5kFm4NQoRze81rfnxzcAZCvDk1/YDAE1SIYgdF4UYFfuJGTOMjQPAghCAKD3MhzMhgT3xhMv3Hp013UoaKl5MP0NhIIQIC0jIZvjsFUZmgeBrDVYRO8/xJ0XBYAQZQigBgUhwDI8YnQtIyFTl6F5EFCD0XX9sRPmQQCYswwX/OAK2JIPn1CDs6lwA+FgIQQAzpfhyS82b4bmQSBxDdbhRzlAZk6N0qQMB7caAmowqX6PjDovCgBdxeHpA6XmQRbk1CiUCEIAmrj+7WMXgeZl6DoAEzEPCkIAAEANLqnIE2X6DULnRYHt+cyJSxkJae4TH3/oIrAgp0bVIMmDEAAAUINUDELzIEBzRkIA1CAxghAAADZzalQNTqfODYSCEAAYyW2EAIKwPedFASbi1CgAvXFYVBACAABqEEEIwMSMhLTl1CjLchuhGiRbEDovCuzKhxACgBpsqNQTZYZhuObLEQCAcH7hb54chuGt4ZVhGH7tH3/NBVGDjNPRQmgeBJiBU6NAghQ8qcGVt9595a13X3FlIHYQAgDhuI2Q+Wvwov9IFoZgHhSEACzMSAgETcENNXg6C10rNThatRsIOwpC50UBANhQg9v/l02FapDteagMAABJUvBMFg6eNwOXcWQUoCKnRmnIbYRMl4Kja/BMFrI486Ag3MR5UQAAztRgq7+UE6RqcEsFbyAcLIRAaD6VHiBlCjaswdNZ6NqqQXoMQvMgwCKcGqUhp0ZpWIPT/cU1oRqkxyAEAICJhkFNCJtd6edvxVQI7MqR0f09/Myhi0AT3/2z6y4Co1Nw5v9Fjx6dR7h5sOY9hB197MTzz9xShgAAanBqb737iiZUg2rwxJWe/+aUIbCZhXB/FkIaMhLSfwqepgnVoCAcOv9g+tVmKA4BJnL928eaEChYg4OdEPoPwrVxqAwBAKQg3fJkUUGoDAEACJCCRkI1eKLsedEh9MdOPP/MrZN/+cYD2IcPJKQVn0ZIrBpcNaHfHSq7luCfwWYIACAF92lCO2ETDosKQmUIAECkGtSEarC4K7n/8ZQh5OZjJxryrFGa8MkThEvB0zRhzRqsfAPhEPoewm24zxAA5uQ2QuLW4OB+Qkq6VuSf00caQj7mQQApOEUT2gl35bBoaFcq/8MrQwjt/qO7t+8duA4NOTVKE06NSsEENGGpGix+ZPRa5X94D6GBuCm4ehHShABqEBjtiktwmjKEQDW4oglbsRDSipFQCiZgJNyGeTCBq76OT/MQGghXg4NbFwDU4AQ8YKZCDSIIlSGEr0GvSQ1d//axiwBsn4Lpj4m+9e4rv+koLNk5Mrotp0mh2xo8zfHRPTk1SitOjaavwWqvPv/1F973+35amj+KdWRUEIpDSJKCmlAQIgiRgjO8AClDNSgIUYbQbw1qQk2IIEQNzvMaVLYMM92mIQiH4h87sT8fXAEd1uDg4ygApOD0Tm4vNBgSnYWwMWUIi9fgiiYcx0JIK0ZCNVjqlahIGSZ7ipuFcLAQNmczhE5qcLATAkjBGa2eR5q4DD3TOyUL4eSUISxSgyuacAQjIU1YCNVg5RejlFloHkzJQjg5myEsWIODnRBACi4h32BoHszKQrgMcQjz1OCKJtyJhZBWjIRq0EvSSugyTFmDFsITV12CRTz/zK2Tf7kUMEMNDv5cc0fXv33sIkDNFFSD0/nNv3nyN11e+mMh7IXNECk4Azvh9oyENGEhjFWDLsKcL0yBBkPzYG7uIeyFWw3xojvPS5omBJCCPYhyk6EjNuk5MtpjGTpNihr0wgY5fOLjD10ENcilZegoKQtyZDQAmyFqcAqmwks5NUoTTo1KQa9QO+lqMEz8p6iOjK44MhqA06R4rZ3oRU4TAmqQ3lT4gHs12BULYUjKEDXYiibcwEJIExZCKehFah8LZqF5UBAiDiH/C60mvPi36aWTXxy66xJNqAa9TtUrw9y33AtCQagMwausJrw8BU+ThQhCKeilqlQZCkJBiDKEWq+ymnBtBypDBKEa9FJVMAvTP5FbEApCZQheYjXhzikoCxGEUtCrVYUyVIOCEFkIdV9fqzXhiBSUhYz+9v+5//EVl0INerXqvwwFoSBEE0Lp19ciTbhnCspC9vn2V4ZS0AtWt1l4VOBHuiAUhLIQvLiWbsKGKSgL2fPbXxmqQa9ZXZXhUY2f5IJQEMpCWYhX1qJNOFEKykL2/PaXhWrQy1YnWWgeFIRoQvCymrMJZ0hBWcj+3/7KUAp65VqwDM2DghBZCF5TczbhzDUoC9n/218ZqkGvXDOX4VGZn9iCUBAiC/GaWqgJl0pBTejbv9VfShlKQS9e82ShIBSEaELwmpqqCRdPQU3oe78hWagGvXhNWoZHlX5QC0JBiCzEC2ryJuwnBTWhb39lKAV9AYfwc1/6gRoUhCAL8Woavgk7TEFB6NtfGapBX8OaUBAKQjQhXko1YdEU1IS+/WWhGvQ1rAkFoSBEFuKlVBPWTUFN6NtfGUpBX8aaUBD27KpLwFrPP3Pr+WduuQ5wRld33geqQbyNntRPP/aFn37sC2oQUIMjWAi5hKmQKO8I57T4Thg0BY2EvvfnkW8wlIJeyOb79sk7EgpCQYgsxItohiaMvgpqQt/7slAN+nrWhIKwK46MshXHR/EKesb8Z0fvP3rJGVF8728vxzlSNejrGaZmIWQ3pkK8iJ42206YKQWNhL7xFxFuMJSCvqSX/H5JNxKaBwUhshCvoFGbMOUqqAl948tCNeirWhMKwk44MsoYTpDi5XNlurOjzojSY8zfeXB4J3DP93+O9Bf+5kk1SBffLF98zkUowkLIXkyFapATzXfC9CloJAzXgaf/z6Msv329DYZS0ItaX98gKUZC26AgRBbitTNYExZZBQVhxA7MF4RdZaEa9IqmCdWgIEQT4rWzdBNWOyCqCcN1YNYgXDwLpaAXNU0oBQUhshAvnNWbsObtgpowVgfmDsKlslANel0ThGpQECIL8cJZugkrPzlGEMbqwApBOHMWqkGva5pQCgpCNCFeNes2oYeIasJYHVgnCGfIQinopU0TSkFBiCzES2bpJlSDgjBcB1YLwunKUA16adOEalAQIgvxqlm3CaWgJgzagWWDsGEWSkEvbYJQCvbGB9MzOZ9i7yWzrLVvmtUgM3dg9I+S78f+H2qvBon9LdDfR9WrwSYshMzHVCgIa1rthFJwU7cYCVt34KR//aPyv18j1kI16NUtyRd/HzuhFBSEyEK8XgZrQjWoCRN0oCAcl4VS0AucJpSCPbvmEjCz55+5pQm9WNa7gGqQDB3IGScnSDdnoRr0AocaFISwpgkHUyHwuON7B0ZCHZgsC9UgOb/mv/jc/COhFBSEyEIW409PQQeyaxZKQTShGozCU0bpIgtRgzAMw/FlH94oBdVg/1n40499QQ1CwxRUg1OzENJLE5oKAS7qQBcB6M3UI6EOnI2FkI6y0FrYG/Ngo3fzX3cRtmckPJOCahDouQnVYAIWQrrLQlMhoAN7/tvzmROk4c89mzRh251QCgpCcILUyyTVlX3cqDEwz9fwzZcdDQApKAhBFgJIQSC5JiOhGlyQewgJkIXMzzzIsurcSeguQSBHE+6TgmpwWRZCYjShqVANQrIOdBGAZE04YieUgj2wEBImC62FUErWkdAkWOUL+ObLLgJsTkE12AkLIcGy0FQ4NfMgTNSBLgJ4vctty5FQB/bGQki8JjQVQhE5RkKTIFCqCdVgOBZCombh4MbCCfjjUmibgi4CULAJ1+6EUrBbFkLCZyGQWNCR0CoIoAajuOISkICpsAnz4DRh4MOp976GcT6kvkgEHt3Qun4CeNXjEquRUAr2z0JIBqZCSCzESGgSBDjtp198znNEo3APIama0FQ4mj8ohdEp6CIAnPFXf3rbRRCEIAuBNo7vHXR4cFQKQlz+GFQKsuLIKGmzEK+LMF0KqkG24ePpUYP0z0JI5iY0FUKeN9Z9jIQ6EEAKCkKQhamYB0EKAkjBshwZpUoWAtEt9bhRB0QB1GBiFkIKNaGp8DzzIGxOQRcBQArmZiGkVhZaCyG02UZCqyDNvmg9VwY1SN8shFTMQlPhCfMgrE1BFwG8/CEFBSEkb8LBCVJACgKoQUHoEiALC/6zv/XuHw3DMDzlq2DqwPi6i9DcFJ8/IQUBEIRQNwuLNOEHEXjKU+99aBiG9576mS8DCke7FATYinlQEELmJhzyToXnO1AWEl2TkVAKMt9X7M2XnRcABCEEyMJMTXhpB8pCypKCALsyDwpCIGcHykKCGjcSSkEAEIRwobgj4Z4dKAtJTwoCjGYeFISgCUt0oCxECgLp+RBCEIQQ3qQdKAuJ4tJTo1KQjr5cPVeGsMyDghDK6XYknLMD12ahMiQKKQgAW7riEsBa/TThgh14EVm4fUIPw/D0m191QSZsv8dHQik4g6MbLvKor1ULYR8cGd2JebACCyF0qsMOPFM7snCbGhyG4Uef/LwsnOXdtkoBgJ1ZCOFCi4yEPXfgWrJwcw2eIQuncMuf98/LQjiCebAfFsLtmQeLsBDChea8mTBcB57pH1l4aQqeOFkLlSEAahBBCATuwItaqGwZblOD58tQFu7PPEj/zIOAIISoJhoJ03TgRV1ULQt3rUFZCEDPzIOlXHUJ4NImbJuCiWvwdCCNbqSC/6Q/+uTnV0dJoX+37x24CNszDwKdsxDCHCpE4NpYOvlF1sGwbfRaC0dwXhSgOfOgIATOGn1wtGYHXhROybJwognUU2cgE/NgbzxiFAQhzNGEOnBzQUUvw3lOwxoMAZifeVAQAuPpwJ2CKmgWznxvpMEQ4jIPAoIQUtkwEkrBfcoqUBku+KQcg+F5biAEaMs8KAiB3ejAOmXYyUNTDYYQhXkQEISQ0MlIqAMnja4Os7DDj9BQhgC0ZR4UhMC2Tfji9z7qOsxQXz2UYf+fpli2DJ0XpWfmQUAQAoQvw/5rUBkC0IR5UBACO/jmr/+FkXCpMJsnDmOloDKErpgHUYMIQtCETJ5q05Vh6BpUhgCAIASUYekUvKgM08ShGwjplnmQcMyDCEIYyUjYWxnuGYdZazB9HAIAghA0IY9F3U5lWCQFxSFMzTxIOOZBBCGQvAwvjcOyNbghDjvvQ+dFAaChKy4B7MlIGMjpOJSCO+knEQVhD45uPHARzjAP9u++nx6PMw9ywkII+3JwNBARONqZCXFwyhQABCEAElElgnmQcMyDCEJoyUgIGyqxYSg6LwoAghA0ISQJxcGoSHzmQcIxDyIIAQjQiooRNQhqEEEIYRgJYfJi/JOPuCAA0NBVlwDaNqGLAFCEeZBwzIMIQgAAAAQhTMNICNN59dM/dBHohHmQcMyDCELQhAAAIAgBiMlI2IPb9w6KXwHzIOGYBxGEMCsjIQAAghA0IQCpmAcJxzyIIAQgD6dGUYMAghACMBICAMsyDyIIQRMC0IB5EBCEALA8p0YBtmEeRBDC8oyEAAmYB1GDCEJAEwKoQQBBCACLcmoUYAPzIIIQ+mIkBAjKPAgIQkATAkBU9x/dLfXPax5EEAKQn1OjzMA8CAhCoBkjIYAahEmZB9nJNZcAAKjmE79zb5v/2ntP/cy1AgQh0NI3f/0vXvzeR10HaOLVT//wy3/yEddBwgEnzIMIQtCEAJO7fe/g6MYDCQcgCAGAct5695VP/E7+f8yn3vuQU6MEYh5kBA+VgWV4ugy04lmji9SgiwAgCAFNCAB0wTyIIASgKCPhnMyDoAYRhEAbRkJADQIgCEETAqhBYAzzIIIQgOqcGlWDAAhCCMlICACMYx5EEIImBJiWeRBAEAJA15waVYNTeOq9D/kaoFvmQfZ3zSWATnzz1//ixe991HWA0Z58/9qXPv7w5Ndf/LPrLogaBOBSV1wC6IomhH2C8Py/qQzV4P7ee+pnLkJ09x/dzfcPZR6kCQshAGlrcBgGmyEAbGAhhO4YCaFhEJ6nDLdkHlyxECaQbyE0D9KKh8pAdzxxFKarwWEYvvTxh6vZEDUIUJwjowBU5CipGoS4zIM05MgodMrBUdjSTvPgBspQEF7EkdEEMh0ZVYO0ZSGETvkUCpiZzVANAhTkHkIAAms1D54pw7I3GapBsvrsEy/k+AcxD9KchRD6ZSSEBRUcDNUgQEHuIYTeaUK4yBTz4Abpy1AQbuA2whyi30loHmQKFkIA2EruzVANUsFnn3gh3wcSwp7cQwi987GEsNbM8+CZMkx2k6EahP6ZB5mII6MQg4Oj0E8QnhF9MFSD23BkNJOgI6EgRBCCIAS6q8HoZagGBaEmVIMU58goxODgKPSv8udVABCUhRAisRPC0Os8eF7/g6F5cHsWwnwCjYTmQSZlIQSASXQ+GKpBiovyUfVqkKn52AmIxEfVQ5R58HQWnvyiq8FQDQJwwkII8ZrQRYCI3GEIvel/JDQPMgMLIQBhhJsH12bhyS8WHAzNg3C6CX1UPcVZCCEeIyEksNRgqAYhCvMg87AQAhBDgnlwbRae/GKewVANwnlGQoqzEEJIRkLIV4buMIQFm7C3vyXzIIIQ0ITwD1LOgzNnoXkQgPN8MD0E5iMoEIS5NTxHqgb35IPpK+jn4Kh5kDlZCCEwIyFqMLdWg6EahG1E+ah6aMtDZSB8E9oJIX0Wnvyiq4+2ByZiHmRmFkIACFOGIwZD8yBsz0hIQe4hhAyMhCRW9rzoZluuhWqwFfcQlrLgzYTmQeZnIYQM3EwI1WyzFqpBiEUNsgh/7ApAv8yDl2bhyS/cXggN+ah6SnFkFPJwcBRBWNzpLDQPtuXIaEEzN6F5kKU4Mgp5ODiKGixudY5UDQIgCAGgaBa6CLC/OZ84ah5EEAJtGAlJwzy4j+ObL7sIEKsJQRACmhAAyjEPIggBAKBHRkIEIRCPkZDonBfdn1OjEKIJzYMIQkATAgAgCAHAPNiOkRBamWgkNA8iCIEJGQkBoPMmhMX5U1hI3oQvfu+jrgMAjHN448E//Ho4OLrzoNVf2TxIJ664BJCbICQW50Xbv52983UXYX/vPfUzF6FgAa7VpAnVIP3wugvJGQkBYHT+nXf75kGrLIQeWAihBE1ICObBqd7yGgn3ZiEsHoFrjW5C8yBd8dILAIAC3JmpkBwshFCFkZD+WQinejdsIdybhVABbrBTE5oHEYSAJgQ1qAkFIYELcJ8sFIT0xqsvAAAicF+3b17+oRRqkA5ZCKEWIyF9Mg/O8e7ZSLgHC6EI3N6GLBSECEJAE8JZD28fRnmfJwgFISJwdBOqQfrkT2SBNu8yj2++7FIwugYBokfgaR5ASiAWQqhop5GwyaogF9mmBo2Ek7/JNhKOZSEUgeOsmtA8iCAEwjThDG8Z9SEXDYOacFK3Hr00DMPxvQOXQhCKwJmzUBAiCIGug3DZ3UAfqkFBOFsNPvatpwzVoA6cxb/6tRf8piMIge7c+cQPe/tbUobFa1ATzhyE4lAQ6kBBCIIQBGGnxGHBFPSuccEgFIeCUAeqQQQhoAmVIcvXoHeQy9agMhSEOlAQIggBTagMWbIGvZXsJAjFoSDUgWqQ9HwOIRDnTcapJ9+Iw8QpuMoPbyu7fZdvOUQKQhoWQiDSSLgmG5Rhxhr0/rKt/efBzeme/gJaCH2fjmMeRBACmlAZqkHvNZMHYYU4FIS+PQUhiTkyCmR5X/L/D5QqwzQpSKwaHBwrlYKoQQKyEAIfSDASnqEM09Sgt55RgvDCb8bgcWgh9P0oCBGEgCaUhSxTg96DJgjC6HEoCH0bqkESc2QUyP4OxlHS4ClIpho8HxVOlkpBYFkWQuAxKUfCx959ysKwNegtaY4gvOQ7tMs+rLwQ+r4bwTyIIAQ0oSBUg96bqsEkfagGEYTk5sgoUOz9zZ2va8KgNTj4tPryQeJ8qRQEBCEwuZvf/Uj6g6OES0HQh2oQmIIjo8B6Do7SbQ16t7qNBOdFx3xrT5CIpY6M+uban/OihGMhBCBSDQ4OjrJLz1gR1SCwmYUQuFDWkfDkTc8bT3zDb3HEGvTmdRs158Et7ZqIFRZC300NWQgJx0IIFHL6Tc+tRy9pwrg1CA3jp/iKqAahOAshcKFMC+FF73g0YegU9EZ2LfNgE6tKTLwQ+g6agoUQQQgIwnjveGRhxBr0jlYQzuO7f3ZdDaIGSeyqSwBc5OZ3P1LkHY830EFrcPDIEKb3iY8/VIOAIASI93Znp3c8mjBiDeIrWRNO/bMREIQAVd7u3Hr0kjfTEWvQSIgm3P7Ho99KQBACUvCSLHQlh2jboCb01asJ1SAgCIHqNehddc0a1ISgBnvgiTIIQoDF3ug0f69Ttgkf3j6Me9+gJmRqQUdCNQgIQkAKasKtatAXVVyWbU048w9JIAefQwhcos9PI5zzLU6RTylMU4Nl3/4Kwjl19eGEb737Rxv+0y/+x+t+v+bhyCiCEBCEmd/u587CZNtgwSZUg3WacHP+aUI1CIIQyByEId7oh0vHlCdFqzWhIMzahCPyTxMKQtjJNZcA8P5+zrfmveWi+wbVIP1olX/nfel3HmpCYC0LIXCJxRfCIlPPIqGYuwbrjISCcEF7joTTFeBamnC6kv/dF7/vOiAIAUHoDX2kSqywDVb4ElKDsZpw5gLUhPPU4DAMghBBCGhCb+UjJWKdk6Lpv5AEYf9NuHgEykI1CIIQiBSEUnDqRKx232DuryhB2GETdliAmnC6GhSEROehMoA37ql64NI+9BQZNcikbRCFx8yU+u0GQQhIQX1YNwWP7x34AgNNqAZhrasuAaAGc/fh6l+Vr8PxvYP08Q/jmtBFUIMIQoAlU1ANoglBE8atQTcQIggBpCCacG7mQTRhDzUIghAo4eZ3PyIF0YSgCdUgCEIAKRjV7ZtaKAnzIJpQDYIgBOLVoItAD4yEoAm3T0E1iCAEaJCCahBN2Ip5EE04Ww1e+t/xRBkEIYAURBOCJqxYgyAIAaRgMG4jjN6E5kE0oRoEQQgEqEEXAU0ImlANgiAEktjykycMgzAd8yCacOoUVIMIQoCRpCBBGQlhcxMWycIRKeiJMghCACkYj9sIgzaheZBls1ANgiAEWF+DLgKakOKO7uT/SZi4CdUgghBgZAqqQTThPMyDaEI1CIIQkIJQtwlBEzZPQTUIghCQghW5jTBWE5oH0YRT1OCefwVPlEEQAuVs+ckTAKRvwtBZaBgEQQgAF+pqJDQP0nMWqkEQhACgCUETxkhBNQiCEADCNKF5EE3YsAb9ZoEgBOADnisTpQkhRBN2noXNa9ATZRCEAKAJp2UeJFwW9pmCtkEQhAAQsglBE+5Zg35TQBACLf3ypz7rIqAJZ2AeJG4TdpKFahAEIQCbuI2w8yaE0Fm4bApOWoNuIEQQAgATMg+iCfepQRcfBCEAtGckhF2bcOYsVIMgCAEgdhOaB8mXhfOkoBoEQQjAbtxG2GcTgibctQZdZBCEwEw8aBSma0LzIImbcIosnH8Y9EQZBCEAMEkTqkEqZGHbGnRJQRACQJ4mBE2oBkEQAjAftxF20oTmQUo14T5Z6PkxIAgBIGETQrUsHFeDLh0IQgBI1YTmQco24fZZ2MMw6IkyCEIAAGichdvUoAsFghDohU+eSMZthPvbZyQ0D8KGJnTHIAhCAEjehMD546MdpuB/+Oa/9juFIAQAmjWheRDOZOGqBvv8O9SECEIAoGUTAmeasPMzopoQQQgANGhC8yCcd3jjQf9/k5oQQQhAKp4rM3MT3nr0khqEoDWoCRGEAMDIJpSCkIYmJIdrLgEwwi9/6rN/+Z37rgNsbsLV3CEC4VKB5kHIxEIIABM2oUkQEtegkRBBCEASbiOcwr3PHLoIkJsmRBACAGoQxot+WFQTIggBAKBiDWpCBCEAcJZ5EKrRhAhCAGJzG6EahJkle7KoJkQQAoAaVINQsQY1IYIQAACq04QIQiA/n0oPa5kHYUu5P4ZeEyIIAQjJbYRqENSgJkQQAgBqENCECEIAQA1COxXmQRCEAABQvQaNhAhCAIJxG+GuzIOAJkQQAoAaBDYpe1hUEyIIAUANghqsSxMiCAEAUIOaEAQhAMRnHgQ0IYIQqOgvv3PfRcjNc2XUIDRkHtSECEIAUIOgBtGECEIAUIOgBjUhCEIAANCEIAgB6IvbCNcyD8L2zIOaEEEIAGoQ1CCaEEEIAGoQ1CAgCAFADQKcMBIiCAHokdsIgRHMg5oQQQgAeZgHQQ1qQgQhwAf+8jv3XQTUIKAGNSGCEADUIKAGNSGCEICMKt9GqAYBTYggBACAS5gHmzehLEQQAsBizIOgBnvIQhcBQQjQ2I++/OyPvvys64AaBDUYogllIVO75hIAmWJvp//m06++7aKhBkEN9p+Fv/vi910HJnLFJQB28ubhO5n+cTThNo7uVHnPpwbxPaIGeyYLmYIjo0BpTpACEIUTpAhCgKmy0EXAPAjbMw8um4UuAoIQWEay86JnmlAWqkFADUZpQlmIIASYJAtdhPPSfzy9GgQ1GDQLXQQEIUD7JpSFpahBUIOhm1AWIggBJslCF0ENAmpQFiIIAeo2oSwEUIOBstBFQBACtM9CF2FIehuheRDUYL4mlIUIQoD2TSgL1SBAoCx0ERCEALIQNQgNmAeDNqEsZEtXXAJge4k/h3B7T7/6ds1/8KM7Sd4UqkEaOv3nRP/5599Qg3Tod1/8vouAIAQEoSzUhGqQSTrwjExZqAY1IYIQQA3KQkEIl3dgvixUg7IQQQggCDVhqiBUg0zdgWmyUA1qQgQhgCCUhamCUA0yWwdGz0I1KAsRhACCUBamakI1yPwdGDQL1aAsRBACCEJNmCoI1SALdmCsLFSDmhBBCCAIZWGqIFSD9NCBIbJQDcpCBCGAIJSFghAdWDEL1SCyUBACCEJZmC0I1SAddmCHWagG0YSCEEAQysI8TfjbP7k1DMP1o2NfeHTbgV1loSBEFgpCAEEoC2ME4UnsbUkTEqIGl81CNYgmFIQAalATLhaEOwXeCJqQQEE4fxaqQWQhghAQhLJwZBBO3XKCkII1OGcWqkFkIYIQEISyMP/ba02oBuOaLgvVIJoQQQgIQllY5e21JlSDslANIgsRhIAglIV131trQkEoC9UgmhBBCAhCWVj3jbUmVIOyUA0iCxGEgCCUhUXfVQtCNVg8C9UgshBBCAhCWVj6XbUmVINls1ANogkRhIAglIXeVWtCQVgxC9UgshBBCAhCWej9tCZUgxWzUA2iCRGEgBqUhd5PC0I1WLEM1SCyEEEICEJZ6M20JlSDFbNQDSIIudRVlwAg3Bvf5u99C76Zfnj70NcSif32T26pQUAQAsjCBfJSEzL/t4OLcN6v/t4fuAiAIASQhd5Ga0I1CIAgBJCFjUoS1GAIRkJAEALIQu+hNzESAiAIASiRhYZBTZjsq91FuJSREBCEALLQu2dNqAY1IcAa11wCgNzvmJ9+9W1vnVGDAKxlIQQu4VPpvXUuwkhIYkZCQBACgCbMwJ9xAAhCANCEapAdGAkBQQgAmlANAiAIAQCKMRICghAALmck7JB5EEAQAoAmVIOMZyQEBCEAaEI1CIAgBABNqAaLMRICghAAAABBCGz05uE7LgLFGQkXZB6ciJEQEIQAoAnVIIAgBAA0oRoEEIQAgCYEQBACACzDPAggCAGgO0ZCNQic/Z795LMn/3IpgrrmEgDATk14/ejYdVCDoANdBEEIAJoQNQg6EEEIAJoQQAciCAFAE7Lz203zIOhABCHQlTcP33ERADUIOhBBCACcZSRUg6ADEYQAoAkBdCCCEAA0ITu9EzUPgg5EEAKAJlSDgA5kflddAgBo0oQughoM5Fd/7w9chGodePIvl4IzLIQAgBqEtB3oIiAIAWAODo4COhBBCACakI1vVc2DoAMRhACgCdUgoANZlofKAOu9efiOiwCjm9BFUIMwTwqqQQQhAGhCNQgVa9BFQBACAIAaBEEIAD0xEj725tU8CGoQQQgAmlANAiAIAUATqkFg9+8p8yCCEAA0oRoENQiCEAA0IQAIQgDQhD0xD0Lj7ynzIIIQAFCDoAZBEAITevPwHRcBmqszEqpBUIMIQgCgYhOqQQBBCADUbUKgIfMgghAANGGQd67mQVCDCEIAoGATqkFQgwhCAKBiE6pBAEEIAFRsQjUI7b+tzIMIQgBADYIaBEEIzMeHEMKcPHQUAEEIAJowJPMgtP+2Mg8iCAFAE6pBUIMgCAFAE6pBUIMgCAFAE6pBAAQhAGhCIBPzIIIQWJ5HjIImvPxtq3kQ1CCCEAAo2IRqENQgghAAKPm2VQ0CCEIAYGodjoRqECb5zjIPIggBgM6bUA2CGkQQAgB1mxAAQQhk5hGjoAnXMg/CJN9Z5kEEIQDQeROqQVCDCEIAoGITqkFQgwhCAKBiE6pBAEEIAFRsQjUIU31zmQcRhECHPFEGNCGgBhGEAED596zmQVCDCEIAoENTj4RqEEAQAgAVm1ANwlTfXOZBBCEA0HMTqkFQgwhCAKBuEwIgCIFyPGIUNKF5ECZiHkQQAgBdN6EaBDWIIAQAKjahGgQ1iCAEACo2oRoEEIQAQMUmVIMwHfMgghAA6LcJ1SCoQRCEgEeMQt0mpKyjGw++85Nb3/nJLZdCDSIIAYB6b1jNg7VrcPVrWQiCEABI5dKRUA1yhiZsyDxILFdcAsCRUUjp+tGxGuS80/PgeZ/6+TdcIjU42rc+/LqvgXAshACQ09qdUA2qwc3/BSdIQRACADmbUA2yJVk4jsOiCEIgHudFoVQTUtml86AsVIMU5B5CEISCEPK7fnRsHlSD+/y/u7dQDW7JbYThWAgBoMC7VTXIfkyFIAgBgKjef/LvXYTK9pwHV00oC9cyDxKaI6NQnSOjUMST719zEdRgK06QqsENnBqNxUIIahAAdmMqBEEIAEDvppgHV00oC82DJODIKJRmIYQ6HBlVg9OpeYJUDW7g1GggFkIAAPZScCpUgwhCAAD6Nds8uGpCJ0hBEAIAUFeRJjQPkol7CKEuNxBCKe4hLGXmefC8xHcVqsEtuY0wCgshAIAabCzrVKgGEYQAALBVE7qrEAQhAADz6WEePJOFaa6teXAnn/vxay6CIAQAoLocU6EaRBACANC13ubBM1noNwgEIdALjxiFat5/8u9dBDWoCccxDyIIAQCgQROGy0I1OJrbCAUhAABz6H8ePJOFahAEIQAARbmlEDpxxSWAmtxDCNU8+f41FyGrWPPgGZ/6+Te6/XszDzbxrQ+/7iL0zEIIahBQg6jBxXQ7FapBBCEAkCEF1SCaUA2CIASAijXoIuQWfR7suQlBEAIAgVNQDaIJxzEPtuXDJwQhADB3DboIFaSZB7tqQjWIIAQAAqegGkQTAoIQuJBHjELiGnQR6sg3D/bQhObBiTg1KggBgGlTUA2iCdUgCEIAqFiDLkI1iefBpZpQDSIIAYB4KagG1aAmJASnRgUhANC4Bl0ENGET5kEEIQAQKQXVIJpQDYIgBHbmEaOQoAZdBDShGgRBCADlUlANMgzD7XsHmpCI3EYoCAGA8TXoIlBc8yY0D4IgBIAAKagGoXkTqkEQhAAQoAZdBM6reWq0eRMyP6dGO+RlBgrxRBmQgsBgHoRTLIQAoAaJx0ioBkEQAkDCFFSDMF0TqkEQhADQbw26CDB1E7IstxEKQgBgTQqqQXZV+dTouCY0D8J5XnsAYPkadBFghMMbD340XNh4T7/5thqES11xCaAIjxgFKUhKRzcelK1Bv/txfevDr7sInXBkFADUIKhBEIQAwFwpqAZppeCdhGoQGvJqBECJAHMRQA0C57mHEKpwDyHKDRIrciehGszEbYSd8LoLgMwDgKLcQwglmAcBiM48CIIQAIA10j9aRg3m87kfv+YiCEIAAFCDIAgBANhD1pFQDYIgBACgIjWYm1OjghCYgyfKsCyPGIXZJBsJ1SAIQgAAKlKDIAgBANhNjpFQDYIgBACgIjVYitsIBSEAAC3FHQkPbzxQgyAIAQAoRwqCIATa84hRgILCjYRqsDKnRgUhAGn5zAlADYIgBABgVlFGQjUIy/IHtwAASEEoykIIAJBTzyOhGuQ0txEKQgAAqlCDIAiBOXjEKEBxvY2EPmkQBCEAABVJQTZwalQQAgDQXg8joWEQuuUpowAATJiCLgL0zEIIwFR8Kj10YqmRUA1C/664BJCYh8ogCIGVoxnzTAoyzrc+/LqLMDMv1aAGAUAKQlGOjAIAlDD1wVFPjgFBCABAOVKQVnz4hCAEAGAqzUdCKQiCEACAck0oBSEHD5WBnDxRBoApiECm9rkfv+ZZo3OyEAIA1DJuJDQJQkoWQgAm4UMIIQ0dCIIQAIA8bt87uPRz6nUgVHDFJYCU3EPI4iyE0L+LmlAKsji3Ec7GqzUAADoQirIQQkLmQXpgIYQQjjwqhv6YB+fkKaMAAHWpQdRgcf74FgAAkIJFWQgBAAA1KAgBAADUoCAEAABQg4IQCMYjRumBR4wCoAZD8IINAABIwaIshAAAgBoUhAAAAGpQEAIAkN79P7/rIqAGBSGQhyfKAABqEEEIAACoQS7hKaMAAIAULMpCCAAAqEFBCAAAoAYFIQAAgBoUhEAYHjEKAKhBduKhMgA09uT7XlwApCCCEOAyhzceTPcXP7534AoDgBpEEAIJe2///3XFCABqUBACBK6+if7OtSIAqEFBCJCk/fb/J5WIAKAGBSHQqbaPGK0TfjtdE00IAFJQEAIJU8dFAKjm/p/fdRFQgwhC0H7scPWMhACgBgUh0JENh0XlHwCgBhGEUKIG5d8MjIQAoAYFIbC8//vGHw/DMAwiEABQgwhCqFiDLMBICIAURBACUhAAUIMIQkAKAgBqkICuugSgBtmV5/cAoAbJwUIIUhAAQA0KQkANsjWPlrnIk+97ZQGQgghCQAoCAGqQvrmHENQgAOXc//O7LgJqkGEYrrgEIAUZzanR8xwZJaKPPfwnZf/ZP/fj13wBIAUFISAFEYSCECmIPpSCCEJADaIJBSFqEH0oBRGEgBREEApC1CASUQ0iCAE1iCYUhEhB9KEURBACUhBBKAhRg+hDKYggBGQhglAQIgXRh1IQQQhoQk2IIEQNog+lIIIQkIWCUBCCGkQfSkEEIaAJBaEgBCmIRJSCCEJAFmpCQQhqEH2oBhGEgCwUhIIQ1CD6UAoiCAFNqAkFIUhB9KEURBACslAQCkJQg8hCKYggBDShIBSEIAWRhVIQQQjIQk0oCEENIgulIIIQNKEmFISCENQgslAKIghBFiIIBSFIQeploRREEAKyUBMKQlCDVCxDNYggBDShIBSEoAYpl4VSEEEIyEJNKAhBClIuC6UgghDQhIJQDYIapFwWSkEEISALBaEgnMMbT3zjov/o1qOXfD2rQWShFEQQArIQTRg+CDeE3waaUAoiC6UgghDQhAjCYEE4Lv80oRpEFkpBBCEgCxGE8YKwYQFqQimILFSDCEJAE6IJuw7CSQtQE6pBZKEURBACshBB2FcQzhyBmlANIgulIIIQ0IQIwoWDcNkOFIRSEFkoBRGEgCxEE84ahJ1EoCZUg8hCKYggBGQhgnCmIOyzAzWhGoR9ylAKIggBTSgIBWHsDtSEUhBGZKEURBACslATCsIkHagJ1SDslIVqEEEIaEJBKAhTdaAmlIKwTRZKQQQhIAsp14SXBmGODhSEahA2ZKEURBACshBBmLkDNaEahLVZKAURhIAmRBCW6EBNKAUBBCEgC9GEa4KwSAdqQjUIkMBVlwA47R/det5FYLQ3nvhGwRqs2cAACEIgbRPKQka4/+iuiwAAsTgyCmziBGlDuU+NqsHBwdEtODIK0BsLIbCJqRA1uD0HRwEQhEDCJpSFqEFNCIAgBEpnoYuwp8MbD1wEAKAr7iEEduOuwn3ku43QPLiWmwnXcgMhQIcshMBuTIWowUs5OHre8c2XXQSADl1zCYBxTWgqHOHwxoM0I6EaRAQCCEJAFsrCitTgpd544hsFD44qQABBCJTLQk2oBqnchCIQIDQPlQHakIU7vIEOfmpUEO4kZROOi8B//+/+u68HgN5YCIE2TIVFqMGyLIEAghDgkiYcTIVqkMeFPjgqAgEEIYAsRA0WakIRCCAIARpkoSa8SMQPn1CD6elAAEEI0LgJB1MhDMPQ60goAgEQhMDkWagJozMPJqMDAVjxsRPATGTh2TflQU6NqsGGlh0JF+9AHzsBIAgBTUikIFSD0ZuwnzFQDQL0yZFRYD7uKoRqHQhA5yyEwDJk4dD9SGgenMh0I2HPHWghBOiThRBYhofNdE4NTqf5E0ftgQAIQiBkEw6mQjWIFARgOY6MAsur3IQdnhpVg/PYZySM2IGOjAL0yUIILM9UCFk7EABBCCALwzAPzmb7Owl1IADTueoSAB1mYR2HNx6owcpNeGkKqkEAJmUhBDptQlOhGixLBAIwGwsh0HUWQm5nRkKTIAAz85RRoHcVpsLFnzVqHlxWVyeHJ+IpowB9shACvTMVqkE1qAYBEIRA6SaUhWoQABCEgCxMqMJGhN96AAQhQIMsdBFaMQ8CgCAEiNeEslANAgCCECidhS6CGgzNeVEABCHAXk2YJgu1AQAwv2suAZAgC9f++xU+wHAc86A/AgAAQQgIRTUIAJR2xSUA6CcUj+8dqMEKqs2DPpgeoFsWQoAPWBQBAEEIQM5QNA92wt2DAAhCAKG4PhUmOjWqBgEAQQiwWCgOy42KapAFuYEQQBACsKkV3aZYh/OiAAhCALYKxTcP39n/L24eBAAEIUA8nzz+xT1DUQ12xTwIgCAEYPlQBAAQhAAlQvHf/otXXZzFmQcBEIQALOBP/+rLQhEAEIQArAlFZQgANV1xCQA4TRxOofh5UR9FCNAtCyEAjzEbAoAgBEAZ/sOdh+JwHx4nA4AgBCBDHCpDAMjEPYQAjCQOt2EePOE2QoA+WQgBGMlsCACCEABl6G7D9cyDAHTOkVEAJqEMBeEZTo0CdMhCCMAkzIZqEABBCADuNgSATjkyCsAy0sehhfA8p0YBemMhBGAZuWdDNQiAIASAHcpwcKYUAAQhAOIwdBmaBwGIwj2EAPQuXBwKwg3cRgjQFQshAL2LNRuqQQAEIQBMWIaDuw0BoAVHRgGIrasyNA9uw6lRgH5YCAGIzWwIAIIQABa+29A8CIAgBICOynAwGwLAxdxDCEAVU5ehhXB7biME6ISFEIAqJp0N1SAAghAAgsWhA6UAVObIKABsZUM6mgdHcGoUQBACQEL/6b/8GxdBEAIIQgBAOgpCAEEIAEhHTQggCAEA9SgIAQQhAFA3HQUhgCAEAIqmoyAEEIQAQN101IQAAADSEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMb5fwH4DLa59RNQAAAAAElFTkSuQmCC";
const GEO = {lon0:-5.2, lon1:8.6, lat1:51.3, k:Math.cos(46.5*Math.PI/180)};
let provState=null, provSel=-1, feudoSel=-1, capaFrancia="gobiernos";

/* ---------- 1. Red Feudal de 1722: Ducados, Condados, Marquesados, Baronías y Pares ---------- */
const FEUDOS = [
  // Île-de-France
  {id:"montfort", prov:"ile-de-france", lon:1.81, lat:48.78, corto:"C. de Montfort", nombre:"Condado de Montfort-l'Amaury", rango:"Condado y Ducado de Chevreuse", casa:"Casa de Luynes", clan:"ducal", titular:"Charles-Philippe d'Albert, duque de Luynes", pid:null,
   rentas:"Bosques, censos señoriales y bailía entre Versalles y Dreux; base territorial de los Luynes y Chevreuse a dos pasos del palacio.",
   nota:"Cambiado con la Corona en 1692 por el ducado de Chevreuse; su bailía sigue siendo clave en los pleitos de tierras al oeste de Versalles."},
  {id:"dammartin", prov:"ile-de-france", lon:2.68, lat:49.05, corto:"C. de Dammartin", nombre:"Condado de Dammartin y Chantilly", rango:"Condado y Señorío principesco", casa:"Casa de Borbón-Condé", clan:"conde", titular:"Monsieur le Duc (Luis Enrique de Borbón)", pid:"luis-enrique-borbon",
   rentas:"Enormes rentas agrarias, bosques de caza y ferias al noreste de París, multiplicadas en 1720 tras redimir hipotecas con los millones ganados en el Sistema de Law.",
   nota:"Dominio inseparable de Chantilly, verdadera corte principesca de los Condé."},
  {id:"maintenon", prov:"ile-de-france", lon:1.58, lat:48.59, corto:"M. de Maintenon", nombre:"Marquesado de Maintenon", rango:"Marquesado", casa:"Casa de Noailles", clan:"ducal", titular:"Adrien-Maurice, duque de Noailles (por su esposa Françoise-Charlotte d'Aubigné)", pid:null,
   rentas:"Tierras regadas por el Eure, molinos y señorío libre de deudas gracias a la dote dispuesta por Luis XIV en 1698.",
   nota:"Heredado en 1719 a la muerte de Madame de Maintenon por su sobrina única, casada con el duque de Noailles; conserva los arcos del acueducto inconcluso de Versalles."},
  {id:"rambouillet", prov:"ile-de-france", lon:1.83, lat:48.64, corto:"D. de Rambouillet", nombre:"Ducado-Paría de Rambouillet", rango:"Ducado-paría (1711)", casa:"Conde de Toulouse", clan:"legitimados", titular:"Luis Alejandro de Borbón, conde de Toulouse", pid:"comte-de-toulouse",
   rentas:"Uno de los señoríos mejor administrados del reino, adquirido en 1706 a Fleuriau d'Armenonville y erigido en ducado-paría en 1711.",
   nota:"Refugio predilecto del Almirante de Francia, que se mantuvo al margen de la conspiración de su hermano Maine."},
  {id:"villeroy", prov:"ile-de-france", lon:2.44, lat:48.54, corto:"D. de Villeroy", nombre:"Ducado-Paría de Villeroy", rango:"Ducado-paría (1651)", casa:"Casa de Neufville de Villeroy", clan:"ducal", titular:"Mariscal duque de Villeroy", pid:null,
   rentas:"Rentas señoriales en el Hurepoix y Corbeil, sumadas a las enormes pensiones del gobierno de Lyon.",
   nota:"Solar del anciano gobernador de Luis XV; aquí hará alto antes de su destierro en agosto de 1722."},
  {id:"isle-adam", prov:"ile-de-france", lon:2.21, lat:49.11, corto:"L'Isle-Adam", nombre:"Baronía de L'Isle-Adam y Pontoise", rango:"Baronía y Señorío", casa:"Casa de Borbón-Conti", clan:"conti", titular:"Luis Armando II, príncipe de Conti", pid:"louis-armand-conti",
   rentas:"Peajes fluviales sobre el Oise y bosques de caza al norte de París.",
   nota:"Punto estratégico de los Conti junto a Pontoise, donde estuvo desterrado el Parlamento de París en 1720."},

  // Champaña y Nivernés
  {id:"rethel", prov:"champagne", lon:4.37, lat:49.51, corto:"D. de Rethel", nombre:"Ducado-Paría de Rethel (Mazarin)", rango:"Ducado-paría", casa:"Casa de La Porte-Mazarin", clan:"ducal", titular:"Paul-Jules de La Porte, duque de Mazarin y de La Meilleraye", pid:null,
   rentas:"Extensísimo feudo de más de treinta parroquias, herrerías y bosques en las Ardenas champañesas, aunque lastrado por interminables pleitos sucesorios.",
   nota:"Comprado por el cardenal Mazarino a los Gonzaga-Nevers; rebautizado ducado de Mazarin."},
  {id:"joinville", prov:"champagne", lon:5.14, lat:48.44, corto:"P. de Joinville", nombre:"Principado de Joinville", rango:"Principado y Baronía", casa:"Casa de Orleans", clan:"orleans", titular:"Felipe II de Orleans, el Regente", pid:"felipe-ii-orleans",
   rentas:"Rentas forestales, forjas y derechos señoriales en la frontera con Lorena.",
   nota:"Antiguo feudo de los Guisa pasado a la Grande Mademoiselle y heredado por la casa de Orleans."},
  {id:"chateau-thierry", prov:"champagne", lon:3.40, lat:49.05, corto:"D. Château-Thierry", nombre:"Ducado-Paría de Château-Thierry", rango:"Ducado-paría", casa:"Casa de Bouillon (La Tour d'Auvergne)", clan:"ducal", titular:"Godefroy-Maurice / Emmanuel-Théodose de La Tour d'Auvergne, duque de Bouillon", pid:null,
   rentas:"Viñedos del Marne, peajes hacia París y bailía ducal entregada a los Bouillon a cambio de Sedán.",
   nota:"Sostén de la casa de Bouillon, que reclama rango de «príncipes extranjeros» en Versalles."},
  {id:"reims-paria", prov:"champagne", lon:4.03, lat:49.26, corto:"Arz.-D. de Reims", nombre:"Arzobispado-Ducado de Reims", rango:"Primer Par Eclesiástico de Francia", casa:"Casa de Rohan (Iglesia)", clan:"ducal", titular:"Armand-Jules de Rohan-Guémené, arzobispo-duque de Reims", pid:null,
   rentas:"Más de 80.000 libras de renta anual, señorío temporal sobre Reims y privilegio exclusivo de ungir al Rey de Francia.",
   nota:"En junio de 1722 la casa de Rohan acaba de colocar aquí a un sobrino del cardenal para presidir la consagración de Luis XV en octubre."},
  {id:"langres-paria", prov:"champagne", lon:5.33, lat:47.86, corto:"Ob.-D. de Langres", nombre:"Obispado-Ducado de Langres", rango:"Paría Eclesiástica", casa:"Iglesia Galicana", clan:"real", titular:"François-Louis de Clermont-Tonnerre, obispo-duque de Langres", pid:null,
   rentas:"Señorío ducal y temporal sobre la meseta de Langres, con derecho a portar el cetro real en la consagración.",
   nota:"Uno de los tres obispos-duques y pares del reino junto a Reims y Laon."},
  {id:"nevers", prov:"nivernais", lon:3.16, lat:46.99, corto:"D. de Nevers", nombre:"Ducado de Nevers (y Donzy)", rango:"Ducado-paría", casa:"Casa Mancini-Mazarin", clan:"ducal", titular:"Felipe Julio Francisco Mancini, duque de Nevers", pid:null,
   rentas:"Rentas de fundiciones, bosques, loza e impuestos propios entre el Loira y los confines de Champaña y Borgoña.",
   nota:"Históricamente unido a Rethel bajo los Gonzaga y Mazarino; el duque de Nevers goza de un régimen casi autónomo sobre su provincia, aunque el Parlamento de París le disputa el registro de su paría."},

  // Normandía
  {id:"eu", prov:"normandie", lon:1.42, lat:50.05, corto:"C. de Eu", nombre:"Condado-Paría de Eu", rango:"Condado-paría", casa:"Casa de Borbón-Maine", clan:"legitimados", titular:"Luis Augusto de Borbón, duque de Maine (y su hijo el conde de Eu)", pid:"duc-du-maine",
   rentas:"Puerto de Tréport, bosques de vidrio y ricas tierras cerealistas en la frontera picarda.",
   nota:"Arrancado a Mlle de Montpensier para dotar al duque de Maine; su hijo menor lleva el título de conde de Eu en la corte."},
  {id:"longueville", prov:"normandie", lon:1.08, lat:49.79, corto:"D. de Longueville", nombre:"Ducado de Longueville", rango:"Ducado (en litigio sucesorio)", casa:"Corona / Herederos Conti y Condé", clan:"conti", titular:"Reunido al Dominio Real; rentas y sucesión pleiteadas por los Conti y los Luynes", pid:"louis-armand-conti",
   rentas:"Diezmos y señoríos en el País de Caux, objeto de uno de los pleitos más enconados del Parlamento de Ruan y de París.",
   nota:"Extinta la rama de Orleans-Longueville con la duquesa de Nemours (1707), su herencia sigue enfrentando a Conti, Condé, Luynes y Matignon en 1722."},
  {id:"tancarville", prov:"normandie", lon:0.46, lat:49.48, corto:"C. de Tancarville", nombre:"Condado de Tancarville", rango:"Condado", casa:"Montmorency / Conde de Évreux (Law)", clan:"ducal", titular:"Conde de Évreux (La Tour d'Auvergne), tras comprarlo a los Montmorency", pid:null,
   rentas:"Derechos de barcaje y pesca sobre el estuario del Sena y tierras en el País de Caux.",
   nota:"Comprado en 1718 con las ganancias especulativas de la rue Quincampoix; símbolo de cómo el dinero de Law mudó de manos los viejos feudos normandos."},
  {id:"harcourt", prov:"normandie", lon:-0.39, lat:49.17, corto:"D. de Harcourt", nombre:"Ducado-Paría de Harcourt (Thury)", rango:"Ducado-paría (1709)", casa:"Casa de Harcourt", clan:"ducal", titular:"Francisco, duque de Harcourt (capitán de Guardias de Corps)", pid:null,
   rentas:"Tierras ganaderas y manzanos en la Baja Normandía, al sur de Caen.",
   nota:"El viejo mariscal de Harcourt murió en 1718; su hijo mantiene el cargo clave de capitán de Guardias de Corps en Versalles."},

  // Languedoc y Guyena
  {id:"ales-pezenas", prov:"languedoc", lon:3.65, lat:43.82, corto:"C. Alès y Pézenas", nombre:"Condado de Alès y Baronías de Pézenas y Bagnols", rango:"Condado y Baronías de Estados", casa:"Casa de Borbón-Conti", clan:"conti", titular:"Luis Armando II, príncipe de Conti", pid:"louis-armand-conti",
   rentas:"Derechos sobre minas de las Cevenas, ferias textiles de Pézenas y rentas señoriales en el Bajo Languedoc.",
   nota:"Feudos heredados de Armando de Conti que otorgan a la casa de Conti clientela propia entre la nobleza y los Estados de Languedoc."},
  {id:"uzes", prov:"languedoc", lon:4.42, lat:44.01, corto:"D. de Uzès", nombre:"Ducado-Paría de Uzès", rango:"Primer Ducado-Paría laico de Francia", casa:"Casa de Crussol d'Uzès", clan:"ducal", titular:"Jean-Charles de Crussol, duque de Uzès", pid:null,
   rentas:"Señoríos en el Gard y las Cevenas, aunque mermados desde la guerra de los Camisards.",
   nota:"Por antigüedad de creación (1572), el duque de Uzès camina delante de todos los demás duques y pares laicos en las ceremonias del reino."},
  {id:"baronias-lang", prov:"languedoc", lon:2.05, lat:43.25, corto:"Baronías (Castries/Rohan)", nombre:"Baronías de los Estados de Languedoc (Castries, Mirepoix, Rohan)", rango:"Baronías con asiento en los Estados", casa:"Casas de Lévis, Castries y Rohan", clan:"ducal", titular:"Marqués de Castries / Casa de Lévis-Mirepoix", pid:null,
   rentas:"Las veintidós baronías históricas que dan derecho a sentarse y votar el «don gratuito» en los Estados de Languedoc.",
   nota:"Una baronía de los Estados de Languedoc se vende en 1722 más cara que un condado ordinario por el poder político que confiere en Montpellier y Toulouse."},
  {id:"turenne", prov:"guyenne", lon:1.62, lat:44.96, corto:"V. de Turenne", nombre:"Vizcondado de Turenne", rango:"Vizcondado cuasi-soberano", casa:"Casa de Bouillon (La Tour d'Auvergne)", clan:"ducal", titular:"Duque de Bouillon, vizconde de Turenne", pid:null,
   rentas:"Más de cien parroquias entre el Quercy (Guyena) y el Lemosín que no pagan talla al rey sino a sus propios Estados del vizcondado.",
   nota:"Un verdadero Estado dentro del Estado; los duques de Bouillon lo defienden con uñas y dientes frente a los intendentes reales hasta que las deudas del juego los obliguen a venderlo en 1738."},
  {id:"fronsac", prov:"guyenne", lon:-0.27, lat:44.92, corto:"D. de Fronsac", nombre:"Ducado-Paría de Fronsac", rango:"Ducado-paría", casa:"Casa de Richelieu", clan:"ducal", titular:"Armand de Vignerot du Plessis, duque de Fronsac y de Richelieu", pid:null,
   rentas:"Viñedos bordeleses y peajes en la confluencia del Dordoña y el Isle.",
   nota:"Feudo del célebre seductor duque de Richelieu, tres veces encerrado en la Bastilla y protegido por Mademoiselle de Charolais."},
  {id:"antin", prov:"guyenne", lon:0.15, lat:43.33, corto:"D. de Antin", nombre:"Ducado-Paría de Antin (Bigorra)", rango:"Ducado-paría (1711)", casa:"Casa de Pardaillan de Gondrin", clan:"ducal", titular:"Louis-Antoine de Pardaillan, duque de Antin", pid:null,
   rentas:"Señoríos gascones y pirenaicos, sumados a los gajes de director general de los Edificios del Rey.",
   nota:"Hijo legítimo de Madame de Montespan y medio hermano de Maine, Toulouse y la duquesa de Orleans; el cortesano más hábil de Versalles."},
  {id:"gramont", prov:"guyenne", lon:-1.14, lat:43.53, corto:"D. de Gramont", nombre:"Ducado-Paría de Gramont y Soberanía de Bidache", rango:"Ducado-paría", casa:"Casa de Gramont", clan:"ducal", titular:"Antoine V, duque de Gramont (coronel de Guardias Francesas)", pid:null,
   rentas:"Peajes pirenaicos, gobierno hereditario de Bayona y del Bearne.",
   nota:"Llave militar de la frontera española; por aquí cruzó la infanta Mariana Victoria en 1722."},
  {id:"blaye", prov:"guyenne", lon:-0.66, lat:45.13, corto:"Gob. de Blaye", nombre:"Señorío y Gobierno de Blaye", rango:"Señorío y Ciudadela", casa:"Casa de Saint-Simon", clan:"ducal", titular:"Luis de Rouvroy, duque de Saint-Simon", pid:null,
   rentas:"Derechos de ancoraje sobre los navíos que entran al estuario de Burdeos.",
   nota:"Cuna de la fortuna de los Saint-Simon desde Luis XIII."},

  // Bretaña, Orleanesado, Borgoña, Picardía, Poitou y resto del reino
  {id:"rohan", prov:"bretagne", lon:-2.75, lat:48.06, corto:"D. de Rohan y Léon", nombre:"Ducado-Paría de Rohan y Principado de Léon", rango:"Ducado-paría y Principado", casa:"Casa de Rohan", clan:"ducal", titular:"Hercule-Mériadec, duque de Rohan-Rohan / Príncipe de Soubise", pid:null,
   rentas:"Inmensos dominios bretones en Pontivy y Léon, base del orgullo de los Rohan («Roi ne puis, duc ne daigne, Rohan suis»).",
   nota:"Junto al cardenal de Rohan en Estrasburgo, convierte a los Rohan en el clan más rico de la corte tras los príncipes de la sangre."},
  {id:"penthievre", prov:"bretagne", lon:-2.54, lat:48.47, corto:"D. de Penthièvre", nombre:"Ducado-Paría de Penthièvre", rango:"Ducado-paría", casa:"Conde de Toulouse", clan:"legitimados", titular:"Conde de Toulouse, gobernador de Bretaña", pid:"comte-de-toulouse",
   rentas:"Rentas marítimas, almirantazgo y tierras costeras del norte de Bretaña.",
   nota:"Refuerza la autoridad del conde de Toulouse como gobernador general de una Bretaña agitada tras la conspiración de Pontcallec y el incendio de Rennes."},
  {id:"vitre", prov:"bretagne", lon:-1.21, lat:48.12, corto:"B. de Vitré", nombre:"Baronía de Vitré", rango:"Primera Baronía de Bretaña", casa:"Casa de La Trémoille", clan:"ducal", titular:"Charles-Belgique-Hollande, duque de La Trémoille", pid:null,
   rentas:"Comercio de lienzos y presidencia alterna de la nobleza en los Estados de Bretaña.",
   nota:"Rivaliza con los Rohan por la preeminencia en los Estados provinciales bretones."},
  {id:"orleans-ap", prov:"orleanais", lon:1.90, lat:47.90, corto:"Ap. de Orleans", nombre:"Ducado de Orleans y de Chartres (Apanaje)", rango:"Gran Apanaje de la Sangre", casa:"Casa de Orleans", clan:"orleans", titular:"Felipe II de Orleans, el Regente (y Luis, duque de Chartres)", pid:"felipe-ii-orleans",
   rentas:"Más de 600.000 libras anuales en bosques (bosque de Orleans), canales, peajes del Loira y nombramiento de cargos judiciales y eclesiásticos.",
   nota:"El mayor apanaje territorial de Francia, que da nombre y sustento a la rama del Regente."},
  {id:"sully", prov:"orleanais", lon:2.37, lat:47.77, corto:"D. de Sully", nombre:"Ducado-Paría de Sully", rango:"Ducado-paría", casa:"Casa de Béthune-Sully", clan:"ducal", titular:"Maximilien-Pierre-François de Béthune, duque de Sully", pid:null,
   rentas:"Castillo y tierras sobre el Loira fundados por el ministro de Enrique IV.",
   nota:"Paría antigua con asiento destacado en el Parlamento."},
  {id:"st-aignan", prov:"berry", lon:1.38, lat:47.27, corto:"D. Saint-Aignan", nombre:"Ducado-Paría de Saint-Aignan", rango:"Ducado-paría", casa:"Casa de Beauvillier", clan:"ducal", titular:"Paul-Hippolyte de Beauvillier, duque de Saint-Aignan", pid:null,
   rentas:"Tierras en el valle del Cher y los confines de Berry y Turena.",
   nota:"Hermano del difunto duque de Beauvillier (que fue gobernador de los duques de Borgoña y de Anjou)."},
  {id:"bourbon-ap", prov:"bourbonnais", lon:3.33, lat:46.56, corto:"D. de Borbón", nombre:"Ducado de Borbón (Moulins)", rango:"Ducado de la Sangre", casa:"Casa de Borbón-Condé", clan:"conde", titular:"Monsieur le Duc (Luis Enrique de Borbón)", pid:"luis-enrique-borbon",
   rentas:"Solar ancestral de la Casa de Borbón, con rentas señoriales, aguas termales y bosques en el centro del reino.",
   nota:"De este ducado toma su título corriente («Monsieur le Duc») el jefe de la casa de Condé en 1722."},
  {id:"charolais", prov:"bourgogne", lon:4.28, lat:46.43, corto:"C. de Charolais", nombre:"Condado de Charolais", rango:"Condado de la Sangre", casa:"Casa de Borbón-Condé", clan:"conde", titular:"Carlos de Borbón-Condé, conde de Charolais", pid:"charles-charolais",
   rentas:"Tierras ganaderas, ferrerías y bosques en el sur de Borgoña, provincia gobernada por los Condé.",
   nota:"Feudo del violento e indómito hermano menor de Monsieur le Duc."},
  {id:"st-simon", prov:"picardie", lon:3.18, lat:49.76, corto:"D. Saint-Simon", nombre:"Ducado-Paría de Saint-Simon (Vermandois)", rango:"Ducado-paría (1635)", casa:"Casa de Rouvroy de Saint-Simon", clan:"ducal", titular:"Luis de Rouvroy, duque de Saint-Simon", pid:null,
   rentas:"Tierras cerealistas en el Vermandois picardo, hipotecadas en parte para sostener su embajada extraordinaria a España (1721-1722).",
   nota:"Famoso por su defensa fanática de los privilegios de los duques y pares frente a los bastardos y la toga."},
  {id:"chaulnes", prov:"picardie", lon:2.83, lat:49.82, corto:"D. de Chaulnes", nombre:"Ducado-Paría de Chaulnes", rango:"Ducado-paría (1711)", casa:"Casa de Albert d'Ailly (Luynes)", clan:"ducal", titular:"Louis-Auguste d'Albert d'Ailly, duque de Chaulnes", pid:null,
   rentas:"Señoríos en el Santerre picardo.",
   nota:"Recreado en 1711 para la rama menor de la casa de Luynes."},
  {id:"guise", prov:"picardie", lon:3.62, lat:49.90, corto:"D. de Guisa", nombre:"Ducado-Paría de Guisa", rango:"Ducado-paría de la Sangre", casa:"Casa de Borbón-Condé", clan:"conde", titular:"Casa de Condé (heredado de Ana Enriqueta del Palatinado)", pid:"anne-henriette",
   rentas:"Inmenso feudo fronterizo en la Thiérache con decenas de señoríos vasallos.",
   nota:"Pasó de la casa de Lorena-Guisa a Madame la Princesse y a su hijo e nietos Condé."},
  {id:"roche-sur-yon", prov:"poitou", lon:-1.43, lat:46.67, corto:"P. Roche-sur-Yon", nombre:"Principado de La Roche-sur-Yon", rango:"Principado de la Sangre", casa:"Casa de Borbón-Conti", clan:"conti", titular:"Luisa Adelaida de Borbón-Conti, Mlle de La Roche-sur-Yon", pid:"louise-adelaide-roche",
   rentas:"Rentas señoriales en el Bajo Poitou.",
   nota:"Da título a la hermana soltera del príncipe de Conti."},
  {id:"thouars", prov:"poitou", lon:-0.21, lat:46.98, corto:"D. de Thouars", nombre:"Ducado-Paría de Thouars (La Trémoille)", rango:"Ducado-paría", casa:"Casa de La Trémoille", clan:"ducal", titular:"Duque de La Trémoille, primer gentilhombre de la Cámara", pid:null,
   rentas:"Vasto conjunto de baronías y castillos en el Poitou.",
   nota:"Uno de los ducados más antiguos de la corona."},
  {id:"mortemart", prov:"marche", lon:0.96, lat:46.04, corto:"D. de Mortemart", nombre:"Ducado-Paría de Mortemart", rango:"Ducado-paría", casa:"Casa de Rochechouart-Mortemart", clan:"ducal", titular:"Louis II de Rochechouart, duque de Mortemart", pid:null,
   rentas:"Tierras entre el Alto Poitou y La Marche.",
   nota:"Casa de Madame de Montespan; el duque de Mortemart es Primer Gentilhombre de la Cámara del Rey en 1722."},
  {id:"rochefoucauld", prov:"saintonge", lon:0.39, lat:45.74, corto:"D. La Rochefoucauld", nombre:"Ducado-Paría de La Rochefoucauld", rango:"Ducado-paría", casa:"Casa de La Rochefoucauld", clan:"ducal", titular:"Francisco VIII, duque de La Rochefoucauld (Gran Maestre del Guardarropa)", pid:null,
   rentas:"Señorío principal del Angoumois.",
   nota:"Uno de los linajes más antiguos de Francia, con cargo hereditario en el Guardarropa del Rey."},
  {id:"noailles-ayen", prov:"limousin", lon:1.33, lat:45.25, corto:"D. de Noailles", nombre:"Ducado-Paría de Noailles (Ayen)", rango:"Ducado-paría", casa:"Casa de Noailles", clan:"ducal", titular:"Adrien-Maurice, duque de Noailles", pid:null,
   rentas:"Señoríos de Ayen y Larche en el Bajo Lemosín.",
   nota:"Jefe del clan de los Noailles, capitán de la primera compañía de Guardias de Corps y sobrino político de Mme de Maintenon."},
  {id:"villars", prov:"provence", lon:5.38, lat:43.52, corto:"D. de Villars", nombre:"Ducado-Paría de Villars", rango:"Ducado-paría (1709)", casa:"Casa de Villars", clan:"ducal", titular:"Mariscal duque de Villars (miembro del Consejo de Regencia)", pid:null,
   rentas:"Gobierno general de Provenza y ducado situado en Vaux-le-Vicomte (Brie) y tierras provenzales.",
   nota:"El vencedor de Denain gobierna la Provenza, recién salida de la terrible peste de Marsella de 1720."}
];

/* ---------- 2. Capas de Lealtades y Jurisdicciones (Parlamentos, Diócesis Unigenitus y Apanajes) ---------- */
const CAPAS_FRANCIA = {
  gobiernos:   {label:"Gobiernos y Señoríos", sub:"Gobiernos generales subdivididos en ducados, condados, marquesados y baronías de la corte."},
  parlamentos: {label:"Parlamentos (Toga)", sub:"Jurisdicciones (ressorts) de los Parlamentos y Consejos Soberanos: vitales para registrar o bloquear edictos y apelar pleitos."},
  diocesis:    {label:"Diócesis y Unigenitus (Clero)", sub:"Arzobispados, obispados y pares eclesiásticos según su alineamiento ante la bula Unigenitus (1713-1722)."},
  apanajes:    {label:"Apanajes de la Sangre", sub:"Tierras, gobiernos y señoríos que rinden rentas directas a los Orleans, los Condé, los Conti, los Legitimados o las grandes casas."}
};

const PARLAMENTOS_DEF = {
  paris:    {n:"Parlamento de París", sede:[2.35,48.86], color:[74,108,175],
             actitud:"Fieramente galicano y con fuerte minoría jansenista. El Regente le devolvió el derecho de «remontrance» en 1715 para anular el testamento de Luis XIV, pero en 1720 tuvo que desterrarlo a Pontoise por oponerse al Sistema de Law y a la bula Unigenitus.",
             uso:"Su inmenso «ressort» cubre un tercio del reino (desde Flandes interior y Champaña hasta el Lionesado, Poitou y Auvernia). Es el único tribunal donde toman asiento los Duques y Pares. Aquí un consejero de la Toga puede congelar un edicto real o hundir la sucesión de una gran casa."},
  ruan:     {n:"Parlamento de Ruan (Normandía)", sede:[1.10,49.44], color:[115,92,168],
             actitud:"Celoso guardián de la «Coutume de Normandie» y de la Carta a los Normandos; hostil a los nuevos impuestos de París y a los financieros de Law.",
             uso:"Decide todos los litigios sobre los feudos normandos (Eu, Longueville, Tancarville, Harcourt). En Normandía las mujeres y segundones tienen reglas sucesorias muy estrictas que este Parlamento aplica sin concesiones."},
  rennes:   {n:"Parlamento de Bretaña (Rennes)", sede:[-1.68,48.11], color:[82,148,135],
             actitud:"Enfrentado a la Regencia tras la conspiración bretona de Pontcallec (1719-1720) y la ejecución de cuatro gentilhombres en Nantes; la ciudad de Rennes sigue en obras tras el gran incendio de diciembre de 1720.",
             uso:"Actúa de consuno con los Estados de Bretaña para frenar la fiscalidad real."},
  burdeos:  {n:"Parlamento de Burdeos", sede:[-0.58,44.84], color:[168,85,105],
             actitud:"Aristocracia de toga enriquecida con el vino de los «chartrons» y el comercio colonial de las Antillas.",
             uso:"Juzga en apelación toda la Guyena, Gascuña interior, Saintonge y el Lemosín (Fronsac, Gramont, Turenne, Noailles)."},
  toulouse: {n:"Parlamento de Toulouse", sede:[1.44,43.60], color:[186,112,72],
             actitud:"Segundo parlamento del reino por antigüedad; aplica el derecho escrito romano y vigila con rigor implacable a los protestantes («nuevos convertidos») de las Cevenas y el Languedoc.",
             uso:"En el derecho escrito del Midi el padre de familia goza de libertad de testar mucho mayor que en París, lo que altera por completo las estrategias de dotes y mayorazgos."},
  grenoble: {n:"Parlamento de Grenoble (Delfinado)", sede:[5.72,45.19], color:[102,155,95],
             actitud:"Tribunal de frontera alpina, atento a las relaciones con Saboya y Ginebra.",
             uso:"Registra los edictos relativos al Delfinado, provincia cuyo gobierno pertenece a la casa de Orleans."},
  dijon:    {n:"Parlamento de Dijon (Borgoña)", sede:[5.04,47.32], color:[155,125,68],
             actitud:"Vinculado estrechamente a la clientela de la Casa de Condé, gobernadores perpetuos de Borgoña.",
             uso:"Quien pleitea en Dijon sin el favor de Monsieur le Duc tiene la causa casi perdida de antemano."},
  aix:      {n:"Parlamento de Aix (Provenza)", sede:[5.45,43.53], color:[204,148,74],
             actitud:"Acaba de retomar sus sesiones tras el cordón sanitario y el espanto de la gran peste de Marsella y Provenza (1720-1722).",
             uso:"Gobierna los pleitos provenzales y vigila el enclave pontificio de Aviñón y el Condado Venesino."},
  pau:      {n:"Parlamento de Navarra y Bearne (Pau)", sede:[-0.37,43.30], color:[142,102,138],
             actitud:"Defensor de los «Fors de Béarn» y de la corona privativa de Navarra unida a la de Francia.",
             uso:"Competente sobre el Bearne, la Baja Navarra y los feudos pirenaicos de los Gramont."},
  metz:     {n:"Parlamento de Metz (Tres Obispados)", sede:[6.18,49.12], color:[98,136,158],
             actitud:"Tribunal militar y fronterizo frente al Ducado soberano de Lorena y el Imperio.",
             uso:"Juzga los feudos de Metz, Toul y Verdún y vigila la numerosa comunidad judía protegida por patentes reales."},
  douai:    {n:"Parlamento de Flandes (Douai)", sede:[3.08,50.37], color:[135,118,92],
             actitud:"Aplica las costumbres flamencas en las provincias conquistadas por Luis XIV.",
             uso:"Jurisdicción sobre Lille, el Henao francés y el Cambrésis."},
  besanzon: {n:"Parlamento de Besanzón (Franco Condado)", sede:[6.02,47.24], color:[92,118,142],
             actitud:"Nobleza de toga hispano-borgoñona incorporada en 1678, aún celosa de sus franquicias.",
             uso:"Juzga los feudos del Franco Condado."},
  colmar:   {n:"Consejo Soberano de Alsacia (Colmar y Perpiñán)", sede:[7.36,48.08], color:[118,158,112],
             actitud:"Consejos soberanos de las provincias fronterizas de Alsacia (Colmar) y el Rosellón (Perpiñán).",
             uso:"En Alsacia respeta el régimen especial de los príncipes posesionados y de los luteranos de Estrasburgo."}
};

const PROV_PARL = {
  "ile-de-france":"paris","picardie":"paris","artois":"paris","champagne":"paris","maine":"paris","anjou":"paris",
  "touraine":"paris","orleanais":"paris","berry":"paris","nivernais":"paris","poitou":"paris","aunis":"paris",
  "marche":"paris","bourbonnais":"paris","auvergne":"paris","lyonnais":"paris",
  "normandie":"ruan","bretagne":"rennes","guyenne":"burdeos","saintonge":"burdeos","limousin":"burdeos",
  "languedoc":"toulouse","foix":"toulouse","dauphine":"grenoble","bourgogne":"dijon","provence":"aix",
  "bearn":"pau","trois-eveches":"metz","flandre":"douai","franche-comte":"besanzon","alsace":"colmar","roussillon":"colmar"
};

const DIOCESIS_PARTIDOS = {
  apelante:  {n:"Bastión Apelante / Jansenista", color:[68,112,178],
              desc:"Prelados, cabildos y facultades que apelaron la bula Unigenitus ante un futuro Concilio General. Resisten las presiones de Roma y de Dubois; cuentan con el apoyo de las parroquias de París y de buena parte del Parlamento."},
  aceptante: {n:"Bastión Aceptante / Molinista (Constitucionalista)", color:[176,72,78],
              desc:"Obispos celosos de la aceptación sin reservas de la bula papal Unigenitus, aliados de los jesuitas, del cardenal de Rohan y del cardenal de Bissy. Dominan el Consejo de Conciencia y exigen «lettres de cachet» contra los clérigos rebeldes."},
  moderado:  {n:"Moderados / Galicanos del Partido del Rey", color:[188,148,74],
              desc:"Prelados de corte (encabezados en Versalles por André-Hercule de Fleury, antiguo obispo de Fréjus y preceptor de Luis XV) que buscan hacer cumplir el acomodo de 1720 en silencio, evitando el cisma pero apartando a los jansenistas de los nuevos beneficios."}
};

const SEDES_ECLES = [
  {lon:2.35, lat:48.86, n:"Arzobispado de París", prel:"Cardenal Louis-Antoine de Noailles", partido:"apelante", par:true,
   nota:"Ducado-paría de Saint-Cloud. El anciano cardenal de Noailles es la cabeza moral de los apelantes, aunque firmó un acomodo ambiguo en 1720 para evitar su degradación."},
  {lon:4.03, lat:49.26, n:"Arzobispado-Ducado de Reims", prel:"Armand-Jules de Rohan-Guémené (1722)", partido:"aceptante", par:true,
   nota:"Primer Par Eclesiástico de Francia. Tras la muerte del apelante Mailly en 1721, el clan Rohan se aseguró la sede para coronar a Luis XV."},
  {lon:3.62, lat:49.56, n:"Obispado-Ducado de Laon", prel:"Charles de Saint-Albin (bastardo del Regente, 1722)", partido:"aceptante", par:true,
   nota:"Segunda paría eclesiástica. El Regente acaba de otorgar este obispado-ducado a su hijo natural no reconocido, el abate de Saint-Albin."},
  {lon:5.33, lat:47.86, n:"Obispado-Ducado de Langres", prel:"François-Louis de Clermont-Tonnerre", partido:"moderado", par:true,
   nota:"Tercera paría eclesiástica."},
  {lon:2.08, lat:49.43, n:"Obispado-Condado de Beauvais", prel:"François-Honoré de Beauvillier de Saint-Aignan", partido:"moderado", par:true,
   nota:"Paría eclesiástica en manos de la familia Beauvillier."},
  {lon:4.36, lat:48.96, n:"Obispado-Condado de Châlons", prel:"Nicolas de Saulx-Tavannes", partido:"apelante", par:true,
   nota:"Paría eclesiástica con fuerte tradición galicana en Champaña."},
  {lon:3.00, lat:49.58, n:"Obispado-Condado de Noyon", prel:"Claude-Maur d'Aubigné / Châteauneuf", partido:"aceptante", par:true,
   nota:"Sexta paría eclesiástica."},
  {lon:7.75, lat:48.58, n:"Principado-Obispado de Estrasburgo", prel:"Cardenal Armand-Gaston de Rohan, Gran Limosnero", partido:"aceptante", par:false,
   nota:"Más de 250.000 libras de renta; el cardenal de Rohan es príncipe del Sacro Imperio y jefe del partido constitucionalista en Versalles."},
  {lon:3.23, lat:50.18, n:"Arzobispado-Ducado de Cambrai", prel:"Cardenal Guillaume Dubois", partido:"aceptante", par:false,
   nota:"Dubois se hizo consagrar en un solo día de 1720 de tonsurado a arzobispo de la riquísima sede de Fénelon, obteniendo el capelo en 1721 a cambio de forzar el registro de la bula Unigenitus."},
  {lon:3.88, lat:43.61, n:"Obispado de Montpellier", prel:"Charles-Joachim Colbert de Croissy", partido:"apelante", par:false,
   nota:"Sobrino del gran Colbert y uno de los cuatro obispos apelantes irreductibles que jamás se plegaron a Dubois."},
  {lon:2.88, lat:48.96, n:"Obispado de Meaux", prel:"Cardenal Henri-Pons de Thiard de Bissy", partido:"aceptante", par:false,
   nota:"Sucesor de Bossuet y látigo implacable de los jansenistas en la corte."},
  {lon:5.37, lat:43.30, n:"Obispado de Marsella", prel:"Henri de Belsunce", partido:"aceptante", par:false,
   nota:"Héroe de la peste de 1720, pero feroz perseguidor de los oratorianos jansenistas de su diócesis."},
  {lon:4.84, lat:45.76, n:"Arzobispado de Lyon (Primado de las Galias)", prel:"François-Paul de Neufville de Villeroy", partido:"moderado", par:false,
   nota:"Hijo del mariscal de Villeroy; controla la metrópoli eclesiástica de Lyon."},
  {lon:1.10, lat:49.44, n:"Arzobispado de Ruan", prel:"Louis de La Vergne de Tressan", partido:"moderado", par:false,
   nota:"Antiguo limosnero del Regente, premiado con el rico arzobispado primado de Normandía."}
];

const PROV_DIOC = {
  "ile-de-france":"apelante","champagne":"aceptante","picardie":"aceptante","flandre":"aceptante","artois":"apelante",
  "trois-eveches":"moderado","alsace":"aceptante","normandie":"moderado","bretagne":"moderado","maine":"moderado",
  "anjou":"apelante","touraine":"moderado","orleanais":"aceptante","berry":"aceptante","nivernais":"apelante",
  "bourgogne":"apelante","franche-comte":"aceptante","poitou":"moderado","aunis":"moderado","saintonge":"moderado",
  "limousin":"moderado","marche":"moderado","bourbonnais":"moderado","auvergne":"apelante","lyonnais":"moderado",
  "dauphine":"moderado","guyenne":"moderado","bearn":"moderado","foix":"apelante","roussillon":"aceptante",
  "languedoc":"apelante","provence":"aceptante"
};

const CLANES_SANGRE = {
  orleans:     {n:"Casa de Orleans (El Regente y Chartres)", color:[138,111,196],
                desc:"Primer príncipe de la sangre. Posee el inmenso apanaje del Orleanesado, Chartres, Blois, Valois, Montargis y Joinville, además del gobierno del Delfinado. Sus rentas y el control del Tesoro sostienen la Regencia."},
  conde:       {n:"Casa de Borbón-Condé (Monsieur le Duc)", color:[66,122,190],
                desc:"Rama rival de los Orleans. Controla el Gobierno perpetuo de Borgoña, el ducado de Borbón, Chantilly, Dammartin, Charolais y Guisa. Enriquecida fabulosamente por Monsieur le Duc y la marquesa de Prie con el Sistema de Law."},
  conti:       {n:"Casa de Borbón-Conti", color:[68,156,142],
                desc:"Rama menor de los príncipes de la sangre: controla La Roche-sur-Yon en Poitou, L'Isle-Adam cerca de París y las baronías de Pézenas, Bagnols y Alès en Languedoc."},
  legitimados: {n:"Rama Legitimada (Duque de Maine y Conde de Toulouse)", color:[196,146,56],
                desc:"Hijos legitimados de Luis XIV y Mme de Montespan. Pese a la pérdida del rango de príncipes de la sangre en 1718, conservan el principado soberano de Dombes, Eu, Aumale, Rambouillet, Penthièvre y los gobiernos de Bretaña y Languedoc."},
  ducal:       {n:"Grandes Casas Ducales (Rohan, Bouillon, Noailles, Luynes, Villeroy)", color:[186,98,118],
                desc:"Pares de Francia y «príncipes extranjeros» (Rohan, Bouillon, Lorena) cuyos ducados, gobiernos y obispados son la moneda de cambio de alianzas matrimoniales y deudas en Versalles."},
  real:        {n:"Dominio Real Directo y Gobiernos de la Corona", color:[198,200,188],
                desc:"Tierras realengas administradas por los intendentes del Rey, cuyos gobiernos militares se reparten como merced vitalicia entre mariscales y cortesanos."}
};

const PROV_CLAN = {
  "ile-de-france":"real","orleanais":"orleans","dauphine":"orleans","champagne":"ducal","bourgogne":"conde",
  "bourbonnais":"conde","picardie":"conde","languedoc":"conti","poitou":"conti","bretagne":"legitimados",
  "dombes":"legitimados","normandie":"legitimados","guyenne":"ducal","alsace":"ducal","limousin":"ducal",
  "saintonge":"ducal","marche":"ducal","nivernais":"ducal","berry":"ducal","provence":"ducal",
  "flandre":"real","artois":"real","trois-eveches":"real","maine":"real","anjou":"real","touraine":"real",
  "franche-comte":"real","aunis":"real","auvergne":"real","lyonnais":"ducal","bearn":"ducal","foix":"real","roussillon":"real"
};

async function loadProvinces(){
  if(provState)return provState;
  const img=new Image(); img.src=PROV_PNG; await img.decode();
  const w=img.width,h=img.height,c=document.createElement("canvas"); c.width=w;c.height=h;
  const x=c.getContext("2d",{willReadFrequently:true}); x.drawImage(img,0,0);
  const px=x.getImageData(0,0,w,h).data, key=new Map(PROV_DEF.map((r,i)=>[(r.r<<16)|(r.g<<8)|r.b,i]));
  const ids=new Int16Array(w*h); for(let i=0;i<w*h;i++){const k=(px[i*4]<<16)|(px[i*4+1]<<8)|px[i*4+2];ids[i]=key.has(k)?key.get(k):-1}
  const edge=new Uint8Array(w*h); for(let y=0;y<h;y++)for(let x2=0;x2<w;x2++){const i=y*w+x2,a=ids[i];if((x2+1<w&&ids[i+1]!==a)||(y+1<h&&ids[i+w]!==a))edge[i]=1}
  const s=w/((GEO.lon1-GEO.lon0)*GEO.k);
  const P=([lo,la])=>[(lo-GEO.lon0)*GEO.k*s,(GEO.lat1-la)*s];
  // Punto más interior de cada provincia (transformada de distancia) para colocar su nombre
  const dist=new Float32Array(w*h);
  for(let i=0;i<w*h;i++)dist[i]=edge[i]||ids[i]<0?0:1e9;
  for(let y=0;y<h;y++)for(let x2=0;x2<w;x2++){const i=y*w+x2;if(!dist[i])continue;let m=dist[i];
    if(x2>0)m=Math.min(m,dist[i-1]+1);if(y>0){m=Math.min(m,dist[i-w]+1);if(x2>0)m=Math.min(m,dist[i-w-1]+1.414);if(x2+1<w)m=Math.min(m,dist[i-w+1]+1.414)}dist[i]=m}
  for(let y=h-1;y>=0;y--)for(let x2=w-1;x2>=0;x2--){const i=y*w+x2;if(!dist[i])continue;let m=dist[i];
    if(x2+1<w)m=Math.min(m,dist[i+1]+1);if(y+1<h){m=Math.min(m,dist[i+w]+1);if(x2+1<w)m=Math.min(m,dist[i+w+1]+1.414);if(x2>0)m=Math.min(m,dist[i+w-1]+1.414)}dist[i]=m}
  const labels=PROV_DEF.map(()=>({d:0,x:0,y:0}));
  for(let i=0;i<w*h;i++){const id=ids[i];if(id>=0&&dist[i]>labels[id].d){labels[id].d=dist[i];labels[id].x=i%w;labels[id].y=(i/w)|0}}

  // Precalcular coordenadas en el lienzo y subdivisión territorial (Voronoi interno) de los señoríos feudales dentro de cada provincia
  const provIdxBySlug=Object.fromEntries(PROV_DEF.map((r,i)=>[r.id,i]));
  const feudosByProv=PROV_DEF.map(()=>[]);
  const feudoPts=FEUDOS.map((f,fi)=>{
    const [fx,fy]=P([f.lon,f.lat]), pi=provIdxBySlug[f.prov]??-1;
    if(pi>=0)feudosByProv[pi].push(fi);
    return {fx,fy,pi};
  });
  const feudoIds=new Int16Array(w*h).fill(-1);
  for(let y=0;y<h;y++){
    const row=y*w;
    for(let x2=0;x2<w;x2++){
      const i=row+x2, pId=ids[i]; if(pId<=0)continue;
      const cand=feudosByProv[pId]; if(!cand||!cand.length)continue;
      if(cand.length===1){feudoIds[i]=cand[0];continue}
      let best=cand[0], bestD=1e12;
      for(let k=0;k<cand.length;k++){
        const fi=cand[k], pt=feudoPts[fi], dx=x2-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
        if(d2<bestD){bestD=d2;best=fi}
      }
      feudoIds[i]=best;
    }
  }
  const feudoEdge=new Uint8Array(w*h);
  const parlEdge=new Uint8Array(w*h);
  for(let y=0;y<h-1;y++){
    const row=y*w;
    for(let x2=0;x2<w-1;x2++){
      const i=row+x2, pA=ids[i]; if(pA<=0)continue;
      const fA=feudoIds[i];
      if(fA>=0){
        if((ids[i+1]===pA&&feudoIds[i+1]!==fA)||(ids[i+w]===pA&&feudoIds[i+w]!==fA))feudoEdge[i]=1;
      }
      const pkA=PROV_PARL[PROV_DEF[pA].id];
      if(pkA){
        const pR=ids[i+1], pD=ids[i+w];
        if((pR>0&&PROV_PARL[PROV_DEF[pR].id]!==pkA)||(pD>0&&PROV_PARL[PROV_DEF[pD].id]!==pkA))parlEdge[i]=1;
      }
    }
  }

  provState={w,h,ids,edge,labels,P,feudoIds,feudoEdge,feudoPts,parlEdge,provIdxBySlug};
  return provState;
}
function tokenRGB(name){const v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();const m=v.match(/^#([0-9a-f]{6})$/i);if(m){const n=parseInt(m[1],16);return [n>>16,(n>>8)&255,n&255]}return [128,128,128]}
const mix=(a,b,t)=>a.map((v,i)=>Math.round(v*(1-t)+b[i]*t));

function renderProvinces(canvas){
  const {w,h,ids,edge,P,feudoIds,feudoEdge,feudoPts,parlEdge}=provState, ctx=canvas.getContext("2d"), im=ctx.createImageData(w,h), d=im.data;
  const chip=tokenRGB("--chip"),line=tokenRGB("--line"),muted=tokenRGB("--muted"),gilt=tokenRGB("--gilt"),paper=tokenRGB("--paper"),ink=tokenRGB("--ink"),seal=tokenRGB("--seal");

  // Colores base por provincia según la capa activa
  const fills=PROV_DEF.map((r,i)=>{
    if(r.tipo==="fuera")return null;
    if(r.tipo==="extranjero")return paper;
    if(capaFrancia==="parlamentos"){
      const pk=PROV_PARL[r.id], Pdef=pk&&PARLAMENTOS_DEF[pk];
      return Pdef?mix(chip,Pdef.color,.45):chip;
    }
    if(capaFrancia==="diocesis"){
      const dk=PROV_DIOC[r.id], Ddef=dk&&DIOCESIS_PARTIDOS[dk];
      return Ddef?mix(chip,Ddef.color,.42):chip;
    }
    if(capaFrancia==="apanajes"){
      const ck=PROV_CLAN[r.id]||"real", Cdef=CLANES_SANGRE[ck];
      return Cdef?mix(chip,Cdef.color,.42):chip;
    }
    return mix(chip,line,[0,.35,.7][i%3]);
  });

  const selParl=provSel>=0?PROV_PARL[PROV_DEF[provSel]?.id]:null;

  for(let i=0;i<w*h;i++){
    const id=ids[i]; let c=id>=0?fills[id]:null, a=255;
    if(!c){a=0;c=paper}
    else{
      const r=PROV_DEF[id], x2=i%w, y=(i/w)|0;
      if(r.tipo==="extranjero"&&(x2+y)%9<2)c=line;
      const fId=feudoIds[i];
      // En la capa de apanajes o gobiernos, cada señorío colorea o matiza su sub-región
      if(fId>=0&&r.tipo==="reino"){
        if(capaFrancia==="apanajes"){
          const cl=CLANES_SANGRE[FEUDOS[fId].clan];
          if(cl)c=mix(chip,cl.color,.48);
        } else if(capaFrancia==="gobiernos"){
          c=mix(c,line,(fId%3)*0.12);
        }
      }
      if(id===provSel)c=mix(c,gilt,fId===feudoSel&&feudoSel>=0?.58:.36);
      else if(fId===feudoSel&&feudoSel>=0)c=mix(c,gilt,.52);
      else if(capaFrancia==="parlamentos"&&selParl&&PROV_PARL[r.id]===selParl)c=mix(c,gilt,.2);

      // Subdivisión punteada interna de condados y ducados dentro de cada provincia
      if((capaFrancia==="gobiernos"||capaFrancia==="apanajes")&&feudoEdge[i]&&((x2+y)%8<4)){
        c=mix(ink,gilt,.35);
      }
      if(edge[i]){
        c=(capaFrancia==="parlamentos"&&!parlEdge[i])?mix(muted,chip,.45):muted;
      }
      if(capaFrancia==="parlamentos"&&parlEdge[i])c=ink;
    }
    const o=i*4; d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=a;
  }
  ctx.putImageData(im,0,0);

  // Nombres de provincia, en versalitas, al centro de cada una
  const fam=getComputedStyle(document.body).fontFamily;
  ctx.save(); ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.lineJoin="round";
  PROV_DEF.forEach((r,i)=>{
    const L=provState.labels[i]; if(r.tipo==="fuera"||!L||L.d<6)return;
    const words=r.nombre.toUpperCase().split(" ");
    const lines=[]; words.forEach(wd=>{const last=lines[lines.length-1];if(last&&(last+" "+wd).length<=11)lines[lines.length-1]=last+" "+wd;else lines.push(wd)});
    let fs=Math.min(24,L.d*.52);
    const setF=()=>{ctx.font=`${r.tipo==="extranjero"?"italic ":""}600 ${fs}px ${fam}`;if("letterSpacing" in ctx)ctx.letterSpacing=(fs*.12)+"px"};
    setF(); while(fs>9&&(Math.max(...lines.map(t=>ctx.measureText(t).width))>L.d*1.7||lines.length*fs*1.05>L.d*1.6)){fs-=.5;setF()}
    const lh=fs*1.05, y0=L.y-(lines.length-1)*lh/2;
    lines.forEach((t,k)=>{const y=y0+k*lh;
      ctx.strokeStyle=`rgba(${paper},.82)`; ctx.lineWidth=3.2; ctx.strokeText(t,L.x,y);
      ctx.fillStyle=`rgba(${i===provSel?gilt:ink},${r.tipo==="extranjero"?.5:capaFrancia==="gobiernos"?.58:.45})`; ctx.fillText(t,L.x,y)});
  });
  ctx.restore();

  // Caminos reales
  if(capaFrancia==="gobiernos"){
    ctx.save(); ctx.strokeStyle=`rgba(${gilt},.65)`; ctx.lineWidth=1.8; ctx.setLineDash([7,5]);
    CAMINOS.forEach(path=>{ctx.beginPath();path.forEach((ci,j)=>{const [x,y]=P(CIUDADES[ci]);j?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke()});
    ctx.restore();
  }

  // Capa de Diócesis y Obispados (Bula Unigenitus)
  if(capaFrancia==="diocesis"){
    ctx.save();
    SEDES_ECLES.forEach(s=>{
      const [x,y]=P([s.lon,s.lat]), col=DIOCESIS_PARTIDOS[s.partido]?.color||ink;
      ctx.fillStyle=`rgb(${paper})`; ctx.strokeStyle=`rgb(${col})`; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.arc(x,y,s.par?11:8.5,0,7); ctx.fill(); ctx.stroke();
      ctx.fillStyle=`rgb(${col})`; ctx.font=`bold ${s.par?16:13}px ${fam}`; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText("✚",x,y+1);
      ctx.font=`600 15px ${fam}`; ctx.textAlign="left";
      const lbl=s.n.replace(/^(Arzobispado-Ducado|Obispado-Ducado|Obispado-Condado|Principado-Obispado|Arzobispado|Obispado) de /,"")+(s.par?" (Par)":"");
      const tw=ctx.measureText(lbl).width, lx=x+14+tw>w?x-14-tw:x+14;
      ctx.strokeStyle=`rgba(${paper},.9)`; ctx.lineWidth=3.5; ctx.strokeText(lbl,lx,y+1);
      ctx.fillStyle=`rgb(${ink})`; ctx.fillText(lbl,lx,y+1);
    });
    ctx.restore();
  }

  // Capa de Parlamentos (Sedes soberanas)
  if(capaFrancia==="parlamentos"){
    ctx.save();
    Object.entries(PARLAMENTOS_DEF).forEach(([k,p])=>{
      const [x,y]=P(p.sede);
      ctx.fillStyle=`rgb(${p.color})`; ctx.strokeStyle=`rgb(${paper})`; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.rect(x-9,y-9,18,18); ctx.fill(); ctx.stroke();
      ctx.font=`600 16px ${fam}`; ctx.textAlign="left"; ctx.textBaseline="middle";
      const lbl=p.n.replace("Parlamento de ","Parl. ").replace("Consejo Soberano de ","C. Sob. ");
      const tw=ctx.measureText(lbl).width, lx=x+14+tw>w?x-14-tw:x+14;
      ctx.strokeStyle=`rgba(${paper},.92)`; ctx.lineWidth=3.5; ctx.strokeText(lbl,lx,y);
      ctx.fillStyle=`rgb(${ink})`; ctx.fillText(lbl,lx,y);
    });
    ctx.restore();
  }

  // Señoríos feudales (Ducados, Condados, Marquesados, Baronías y Pares) en Gobiernos y Apanajes
  if(capaFrancia==="gobiernos"||capaFrancia==="apanajes"){
    ctx.save();
    FEUDOS.forEach((f,fi)=>{
      const {fx:x,fy:y,pi}=feudoPts[fi];
      const isSel=fi===feudoSel, inProv=pi===provSel;
      const clCol=CLANES_SANGRE[f.clan]?.color||gilt;
      const esPar=/paría|Par/i.test(f.rango), esPrin=/Apanaje|Principado|Sangre/i.test(f.rango);
      ctx.save();
      ctx.translate(x,y);
      if(isSel){
        ctx.beginPath(); ctx.arc(0,0,13,0,7);
        ctx.fillStyle=`rgba(${gilt},.28)`; ctx.fill();
        ctx.strokeStyle=`rgb(${seal})`; ctx.lineWidth=2.5; ctx.stroke();
      }
      ctx.fillStyle=`rgb(${isSel?seal:capaFrancia==="apanajes"?clCol:esPrin?clCol:gilt})`;
      ctx.strokeStyle=`rgb(${paper})`; ctx.lineWidth=2;
      ctx.beginPath();
      if(esPar||esPrin){
        // Rombo ducal / principesco
        const r=isSel?8.5:6.8;
        ctx.moveTo(0,-r); ctx.lineTo(r,0); ctx.lineTo(0,r); ctx.lineTo(-r,0); ctx.closePath();
      } else {
        // Escudo circular para condados, marquesados, vizcondados y baronías
        ctx.arc(0,0,isSel?7.5:5.8,0,7);
      }
      ctx.fill(); ctx.stroke();
      ctx.restore();

      // Etiqueta del señorío
      if(isSel||inProv||provSel<0||capaFrancia==="apanajes"){
        ctx.font=`${isSel||inProv?"600 ":"500 "}${isSel?16:inProv?15:13.5}px ${fam}`;
        ctx.textAlign="left"; ctx.textBaseline="middle";
        const tw=ctx.measureText(f.corto).width;
        const lx=x+10+tw>w-8?x-10-tw:x+10, ly=y+(fi%2===0?-8:8);
        ctx.strokeStyle=`rgba(${paper},.9)`; ctx.lineWidth=3.2; ctx.strokeText(f.corto,lx,ly);
        ctx.fillStyle=`rgb(${isSel?seal:inProv?ink:muted})`; ctx.fillText(f.corto,lx,ly);
      }
    });
    ctx.restore();
  }

  // Ciudades principales y Versalles
  if(capaFrancia==="gobiernos"){
    ctx.font=`18px ${fam}`; ctx.fillStyle=`rgb(${ink})`;
    CIUDADES.forEach(c=>{const [x,y]=P(c);ctx.beginPath();ctx.arc(x,y,4.8,0,7);ctx.fill();const tw=ctx.measureText(c[2]).width;
      ctx.strokeStyle=`rgba(${paper},.85)`;ctx.lineWidth=3;ctx.strokeText(c[2],x+8+tw>w?x-8-tw:x+8,y+5);
      ctx.fillText(c[2],x+8+tw>w?x-8-tw:x+8,y+5)});
  }
  const [vx,vy]=P([2.13,48.80]);
  ctx.fillStyle=`rgb(${gilt})`; ctx.strokeStyle=`rgb(${ink})`; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.arc(vx,vy,6,0,7); ctx.fill(); ctx.stroke();
}

function feudoCard(f){
  const p=f.pid&&typeof PERSONAJES!=="undefined"?PERSONAJES.find(x=>x.id===f.pid):null;
  const titNode=p?el("button",{class:"btn sm",onclick:()=>openFicha(p)},f.titular+" →"):el("b",{},f.titular);
  const cl=CLANES_SANGRE[f.clan];
  return el("div",{class:"feudo-card"},
    el("div",{class:"pane-h"},el("h3",{},f.nombre),el("span",{class:"tag ej"},f.rango)),
    el("div",{class:"feudo-meta"},
      el("span",{},el("b",{},"Casa / Linaje: "),f.casa),
      cl?el("span",{class:"note"}," · "+cl.n):null
    ),
    el("div",{class:"feudo-meta"},el("span",{},"Titular en junio de 1722: "),titNode),
    el("span",{class:"label"},"Rentas, deudas y pleitos"),
    el("p",{},f.rentas),
    el("span",{class:"label"},"Importancia en la corte"),
    el("p",{class:"note"},f.nota)
  );
}

function provInfo(i,fIdx=-1){
  provSel=i; feudoSel=fIdx;
  const r=PROV_DEF[i]; if(!r)return;
  const ciudades=CIUDADES.filter(c=>{const [x,y]=provState.P(c);return provState.ids[Math.round(y)*provState.w+Math.round(x)]===i}).map(c=>c[2]);
  const feudosProv=FEUDOS.map((f,idx)=>({f,idx})).filter(x=>x.f.prov===r.id);
  const wrap=el("div",{class:"fr-info-wrap"});

  // 1. Información de la capa jurisdiccional activa
  const pk=PROV_PARL[r.id], parl=pk&&PARLAMENTOS_DEF[pk];
  const dk=PROV_DIOC[r.id], dioc=dk&&DIOCESIS_PARTIDOS[dk];
  const ck=PROV_CLAN[r.id]||"real", clan=CLANES_SANGRE[ck];

  if(capaFrancia==="parlamentos"&&parl){
    wrap.append(el("div",{class:"juris-box"},
      el("span",{class:"label"},"Jurisdicción Parlamentaria (Toga)"),
      el("h3",{},parl.n),
      el("p",{},parl.actitud),
      el("p",{class:"note"},parl.uso)
    ));
  } else if(capaFrancia==="diocesis"&&dioc){
    const sedesEnProv=SEDES_ECLES.filter(s=>{const [x,y]=provState.P([s.lon,s.lat]);return provState.ids[Math.round(y)*provState.w+Math.round(x)]===i});
    const sBox=el("div",{class:"juris-box"},
      el("span",{class:"label"},"Mapa Eclesiástico y Bula Unigenitus"),
      el("h3",{},dioc.n),
      el("p",{},dioc.desc)
    );
    sedesEnProv.forEach(s=>sBox.append(el("div",{class:"feudo-item"},
      el("b",{},s.n+(s.par?" · Par Eclesiástico de Francia":"")),
      el("span",{class:"note"}," Prelado en 1722: "+s.prel+". "+s.nota)
    )));
    wrap.append(sBox);
  } else if(capaFrancia==="apanajes"&&clan){
    wrap.append(el("div",{class:"juris-box"},
      el("span",{class:"label"},"Apanajes y Señoríos dominantes"),
      el("h3",{},clan.n),
      el("p",{},clan.desc)
    ));
  } else {
    // Resumen rápido de las tres jurisdicciones de la provincia
    wrap.append(el("div",{class:"juris-pills"},
      parl?el("span",{class:"tag"},"⚖ "+parl.n):null,
      dioc?el("span",{class:"tag"},"✚ "+dioc.n):null,
      clan?el("span",{class:"tag"},"⚜ "+clan.n.split(" (")[0]):null
    ));
  }

  // 2. Ficha del señorío feudal seleccionado (ducado, condado, marquesado, baronía)
  if(fIdx>=0&&FEUDOS[fIdx]){
    wrap.append(feudoCard(FEUDOS[fIdx]));
  }

  // 3. Desglose de todos los señoríos de esta provincia
  if(feudosProv.length){
    const fList=el("div",{class:"conecta"});
    feudosProv.forEach(({f,idx})=>{
      const b=el("button",{class:"btn sm"+(idx===fIdx?" primary":""),onclick:()=>{
        const cv=document.querySelector("#map-box canvas");
        provInfo(i,idx); if(cv)renderProvinces(cv);
      }},f.nombre+" ("+f.casa.replace("Casa de ","")+")");
      fList.append(b);
    });
    wrap.append(el("span",{class:"label"},"Ducados, condados y baronías en "+r.nombre+" (toca uno)"),fList);
  } else if(r.tipo==="reino"){
    wrap.append(el("p",{class:"note"},"Las tierras de este gobierno dependen de las bailías reales y de señoríos menores sujetos a "+
      (parl?parl.n:"la Corona")+"."));
  }

  if(ciudades.length){
    wrap.append(el("div",{class:"note"},"Ciudades señaladas en el mapa: "+ciudades.join(", ")+"."));
  }

  mapInfo(r.nombre,(r.tipo==="extranjero"?"Territorio soberano fuera del Reino de Francia en 1722. ":"Gobierno general del Reino en 1722. ")+(r.capital?"Capital: "+r.capital+". ":"")+(r.nota||""),wrap);
}

function renderFranciaLegend(legBox){
  legBox.innerHTML="";
  if(capaFrancia==="parlamentos"){
    Object.values(PARLAMENTOS_DEF).slice(0,8).forEach(p=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${p.color})`}),p.n.replace("Parlamento de ",""))));
  } else if(capaFrancia==="diocesis"){
    Object.values(DIOCESIS_PARTIDOS).forEach(d=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${d.color})`}),d.n)));
    legBox.append(el("span",{},"✚ Sedes y Pares Eclesiásticos"));
  } else if(capaFrancia==="apanajes"){
    Object.values(CLANES_SANGRE).forEach(c=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${c.color})`}),c.n.split(" (")[0])));
  } else {
    legBox.append(
      el("span",{},el("i",{class:"dot",style:"background:var(--gilt);transform:rotate(45deg);border-radius:1px"}),"Ducado-Paría / Apanaje"),
      el("span",{},el("i",{class:"dot",style:"background:var(--gilt)"}),"Condado / Marquesado / Baronía"),
      el("span",{},"⋯ Subdivisión feudal interna")
    );
  }
}

async function drawProvinces(box){
  mapInfo("Reino de Francia","Cargando provincias, señoríos y jurisdicciones…");
  try{await loadProvinces()}catch(e){mapInfo("Reino de Francia","No se pudo cargar el mapa de provincias.");return}
  const {w,h}=provState;

  // Barra de selector de capas de Francia
  const tb=el("div",{class:"map-toolbar"});
  const cBar=el("div",{class:"sectores-bar",role:"group","aria-label":"Capas del mapa de Francia"});
  const legBox=el("div",{class:"leyenda-map"});
  const canvas=el("canvas",{width:w,height:h,role:"img","aria-label":"Mapa de provincias, señoríos y jurisdicciones de Francia en 1722",style:"display:block;width:100%;height:auto;cursor:pointer"});

  Object.entries(CAPAS_FRANCIA).forEach(([k,v])=>{
    const b=el("button",{class:"btn sm","aria-pressed":String(capaFrancia===k),onclick:()=>{
      capaFrancia=k;
      [...cBar.children].forEach(x=>x.setAttribute("aria-pressed","false"));
      b.setAttribute("aria-pressed","true");
      renderFranciaLegend(legBox);
      renderProvinces(canvas);
      if(provSel>=0)provInfo(provSel,feudoSel);
      else mapInfo("Reino de Francia · "+v.label,v.sub);
    }},v.label);
    cBar.append(b);
  });

  // Selectores rápidos de provincia y de señorío feudal
  const sel=el("select",{id:"prov-sel","aria-label":"Ir a una provincia"},el("option",{value:""},"Ir a una provincia…"),
    ...PROV_DEF.map((r,i)=>r.tipo==="fuera"?null:el("option",{value:i},r.nombre+(r.tipo==="extranjero"?" (no francés)":""))).filter(Boolean));
  const fSel=el("select",{id:"feudo-sel","aria-label":"Ir a un ducado, condado o señorío"},el("option",{value:""},"Ir a un ducado o condado…"),
    ...FEUDOS.map((f,fi)=>el("option",{value:fi},f.nombre+" · "+f.casa.replace("Casa de ",""))));

  const selWrap=el("div",{class:"sectores-bar"},sel,fSel);
  tb.append(cBar,selWrap);
  renderFranciaLegend(legBox);
  box.append(tb,legBox,canvas);

  const pick=(i,fIdx=-1)=>{
    if(i<0||PROV_DEF[i].tipo==="fuera")return;
    provInfo(i,fIdx); renderProvinces(canvas);
    sel.value=String(i); fSel.value=fIdx>=0?String(fIdx):"";
  };

  canvas.addEventListener("click",e=>{
    const r=canvas.getBoundingClientRect();
    const x=Math.floor((e.clientX-r.left)*w/r.width), y=Math.floor((e.clientY-r.top)*h/r.height);
    // Comprobar primero si se ha tocado cerca del emblema de un señorío feudal
    if(capaFrancia==="gobiernos"||capaFrancia==="apanajes"){
      let bestFi=-1, bestD=26*26;
      provState.feudoPts.forEach((pt,fi)=>{
        const dx=x-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
        if(d2<bestD){bestD=d2;bestFi=fi}
      });
      if(bestFi>=0){
        const pIdx=provState.provIdxBySlug[FEUDOS[bestFi].prov]??provState.ids[y*w+x];
        pick(pIdx,bestFi); return;
      }
    }
    const pIdx=provState.ids[y*w+x];
    const subFi=provState.feudoIds[y*w+x];
    pick(pIdx,subFi>=0?subFi:-1);
  });

  sel.onchange=()=>{if(sel.value!==""){const pi=+sel.value;const firstF=FEUDOS.findIndex(f=>f.prov===PROV_DEF[pi]?.id);pick(pi,firstF)}};
  fSel.onchange=()=>{if(fSel.value!==""){const fi=+fSel.value,pi=provState.provIdxBySlug[FEUDOS[fi]?.prov]??-1;if(pi>=0)pick(pi,fi)}};

  renderProvinces(canvas);
  if(provSel>=0)provInfo(provSel,feudoSel);
  else mapInfo("Reino de Francia · "+CAPAS_FRANCIA[capaFrancia].label,CAPAS_FRANCIA[capaFrancia].sub+" Toca una provincia o un señorío en el mapa.");
}
