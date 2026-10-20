/* ---------- Francia: mapa de provincias al estilo Clausewitz ----------
   mapa/provinces.png: un color RGB exacto por provincia. Se lee píxel a píxel para saber
   qué provincia hay bajo el dedo y para trazar fronteras donde cambia el color. */
const PROV_DEF = [{"id": "fuera", "r": 0, "g": 0, "b": 0, "nombre": "Fuera del reino", "tipo": "fuera", "capital": "", "nota": ""}, {"id": "ile-de-france", "r": 93, "g": 137, "b": 191, "nombre": "Île-de-France", "tipo": "reino", "capital": "París", "nota": "Gobierno de la capital y de Versalles."}, {"id": "picardie", "r": 146, "g": 234, "b": 142, "nombre": "Picardía", "tipo": "reino", "capital": "Amiens", "nota": ""}, {"id": "flandre", "r": 199, "g": 131, "b": 93, "nombre": "Flandes y Henao", "tipo": "reino", "capital": "Lille", "nota": "Frontera norte, plazas fuertes."}, {"id": "artois", "r": 52, "g": 228, "b": 44, "nombre": "Artois", "tipo": "reino", "capital": "Arras", "nota": ""}, {"id": "champagne", "r": 105, "g": 125, "b": 195, "nombre": "Champaña", "tipo": "reino", "capital": "Troyes", "nota": "Reims, ciudad de la consagración."}, {"id": "trois-eveches", "r": 158, "g": 222, "b": 146, "nombre": "Metz y Verdún (Tres Obispados)", "tipo": "reino", "capital": "Metz", "nota": "Enclaves franceses dentro de la Lorena."}, {"id": "lorraine", "r": 211, "g": 119, "b": 97, "nombre": "Ducado de Lorena", "tipo": "extranjero", "capital": "Nancy", "nota": "Ducado soberano. Francés solo desde 1766."}, {"id": "alsace", "r": 64, "g": 216, "b": 48, "nombre": "Alsacia", "tipo": "reino", "capital": "Estrasburgo", "nota": "Francesa desde el siglo XVII."}, {"id": "normandie", "r": 117, "g": 113, "b": 199, "nombre": "Normandía", "tipo": "reino", "capital": "Ruan", "nota": ""}, {"id": "bretagne", "r": 170, "g": 210, "b": 150, "nombre": "Bretaña", "tipo": "reino", "capital": "Rennes", "nota": "Estados provinciales propios."}, {"id": "maine", "r": 223, "g": 107, "b": 101, "nombre": "Maine y Perche", "tipo": "reino", "capital": "Le Mans", "nota": ""}, {"id": "anjou", "r": 76, "g": 204, "b": 52, "nombre": "Anjou", "tipo": "reino", "capital": "Angers", "nota": ""}, {"id": "touraine", "r": 129, "g": 101, "b": 203, "nombre": "Turena", "tipo": "reino", "capital": "Tours", "nota": ""}, {"id": "orleanais", "r": 182, "g": 198, "b": 154, "nombre": "Orleanesado", "tipo": "reino", "capital": "Orleans", "nota": ""}, {"id": "berry", "r": 235, "g": 95, "b": 105, "nombre": "Berry", "tipo": "reino", "capital": "Bourges", "nota": ""}, {"id": "nivernais", "r": 88, "g": 192, "b": 56, "nombre": "Nivernés", "tipo": "reino", "capital": "Nevers", "nota": ""}, {"id": "bourgogne", "r": 141, "g": 89, "b": 207, "nombre": "Borgoña", "tipo": "reino", "capital": "Dijon", "nota": "Estados de Borgoña."}, {"id": "dombes", "r": 194, "g": 186, "b": 158, "nombre": "Principado de Dombes", "tipo": "extranjero", "capital": "Trévoux", "nota": "Principado soberano del duque de Maine."}, {"id": "franche-comte", "r": 47, "g": 83, "b": 109, "nombre": "Franco Condado", "tipo": "reino", "capital": "Besanzón", "nota": "Francés desde 1678."}, {"id": "poitou", "r": 100, "g": 180, "b": 60, "nombre": "Poitou", "tipo": "reino", "capital": "Poitiers", "nota": ""}, {"id": "aunis", "r": 153, "g": 77, "b": 211, "nombre": "Aunis", "tipo": "reino", "capital": "La Rochelle", "nota": ""}, {"id": "saintonge", "r": 206, "g": 174, "b": 162, "nombre": "Saintonge y Angoumois", "tipo": "reino", "capital": "Saintes", "nota": ""}, {"id": "limousin", "r": 59, "g": 71, "b": 113, "nombre": "Lemosín", "tipo": "reino", "capital": "Limoges", "nota": ""}, {"id": "marche", "r": 112, "g": 168, "b": 64, "nombre": "La Marche", "tipo": "reino", "capital": "Guéret", "nota": ""}, {"id": "bourbonnais", "r": 165, "g": 65, "b": 215, "nombre": "Borbonés", "tipo": "reino", "capital": "Moulins", "nota": ""}, {"id": "auvergne", "r": 218, "g": 162, "b": 166, "nombre": "Auvernia", "tipo": "reino", "capital": "Clermont", "nota": ""}, {"id": "lyonnais", "r": 71, "g": 59, "b": 117, "nombre": "Lionesado", "tipo": "reino", "capital": "Lyon", "nota": "Sedas y banca."}, {"id": "dauphine", "r": 124, "g": 156, "b": 68, "nombre": "Delfinado", "tipo": "reino", "capital": "Grenoble", "nota": ""}, {"id": "guyenne", "r": 177, "g": 53, "b": 219, "nombre": "Guyena y Gascuña", "tipo": "reino", "capital": "Burdeos", "nota": "El gobierno más extenso del reino."}, {"id": "bearn", "r": 230, "g": 150, "b": 170, "nombre": "Bearne y Navarra", "tipo": "reino", "capital": "Pau", "nota": ""}, {"id": "foix", "r": 83, "g": 47, "b": 121, "nombre": "Condado de Foix", "tipo": "reino", "capital": "Foix", "nota": ""}, {"id": "roussillon", "r": 136, "g": 144, "b": 72, "nombre": "Rosellón", "tipo": "reino", "capital": "Perpiñán", "nota": "Francés desde 1659."}, {"id": "languedoc", "r": 189, "g": 41, "b": 223, "nombre": "Languedoc", "tipo": "reino", "capital": "Toulouse", "nota": "Estados de Languedoc; Montpellier y su facultad."}, {"id": "comtat", "r": 42, "g": 138, "b": 174, "nombre": "Condado Venesino y Aviñón", "tipo": "extranjero", "capital": "Aviñón", "nota": "Territorio del papa."}, {"id": "provence", "r": 95, "g": 235, "b": 125, "nombre": "Provenza", "tipo": "reino", "capital": "Aix", "nota": "Sale de la peste de 1720."}];
const PROV_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAR+CAIAAABPoVtcAABKc0lEQVR42u3dUYil93nf8XeXRfhCNwkYREGFlgS6UKuZ0LkQWCXBJdQQY3CxIDixWSG0aGFEfeFQ4YoSFONSk7h4QWYds4s3dQoJMQgbUoQLJQ7oYiDb1BcbUMiFXIqIwb7RhVly0YtRT2Znzpw55z3/933/z/N8PvhiYzuy9O7MnPPd3/99zzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADACG+//lsuAgANXXEJACBWCj772h+6IAA0cdUlAIBANQgADVkIASBeChoJARCEAFAuBTUhAA05MgoA3fmX/+efH9144DoAMDULIQD0lYKn/8/b9w42/JeNhADsyUIIAJ3W4DAMm3dCD5sBQBACQIYUPF+D29CEAAhCAEibgm4mBEAQAkDOGtzmv+bgKAAT8VAZAOg3BU/zgBkAmrvmEgBA5ykIABNxZBQAYtSgg6MANOfIKAD0noKnOTgKQEMWQgCYPAUbHhP10FEABCEAhKnBOf/nHBwFYCeOjAJAvBR0cBSAJiyEABCsBgcHRwFoxEIIAJFS8LQNO6GREIBtWAgBoFkK9vMZg24mBEAQAsB8NTj//6iDowDsyZFRAIiXgqc5OAqAIASAcimoCQHYkyOjABC7BjdzMyEAghAAWqZgbzXoZkIABCEAzFGDff6NbWhCIyEAF3EPIQDETsHT3EwIwE6uuQQAkCAFAWAER0YBIE8NOjgKwE4cGQWADCl42oaDo4OzowAIQgBImYKaEABBCACla3CbJpSFAAhCAEiYglsGoSwEQBACQNrniG7ZhLIQoCxPGQVADab9VIkNDx09wzNIAWqyEAIgBZPbficcTIUAghAA1GDZIJSFAIIQAKRg9SaUhQCCEACkoCYEQBACgBos2YSyEEAQAoAUrBuEshBAEAKAIKzehLIQIBmfQwgAhWz/yYQX8YmFAJlYCAHIz0J4xv474WAqBBCEACAIKzehLASIzpFRAGC8t1//LYdIAQQhABDJ/jcTnslClxQgIkdGAcjPkdGLtDo4uuIEKYAgBABBWLcJZSFAII6MAgCNubEQQBACAAG0vZnwTBa6vACdc2QUgPwcGb3UFAdHV5wgBRCEACAI6zahLATokyOjAMAwTHl29IQTpACCEACoy8NmAHrjyCgA+Tkyur2pD46uOEEKIAgBQBDWbUJZCLA4R0YBgMdMfTPhaU6QAizLQghAfl/7u9+//+iu67CTOXfCwVQIIAgBYLogHIZBE3behLIQYH6OjAJQxWefeMFF6JzHkAIIQgCYsAll4fbmvJnwTBa6+ADzcGQUgPxOjoye5vjo9uY/OLriBCmAIASA9kEoC6M0oSwEEIQAMEkQasIoTSgLASbiHkIASnNL4ZaWup9wxY2FAFOwEAKQ34aFcMVUuI3Fd8LBVAjQlIUQAIbBVBiHj6YAaMhCCEB+2yyEK6bCzXoYCVeshQB7shACwGNMhZstfjPhaaZCgD1ZCAHIb6eF8ISdcLOudsLBVAggCAGgYRDKwnBNKAsBBCEAtAxCTRiuCWUhwE7cQwgAm3z2iRfcVXiRru4nXHFjIcD2LIQA5LfPQrhiKrxInzvhYCoEEIQA0CoINWHEJpSFAIIQAEH4+w3/arIwXBPKQoCLuIcQAHbjlsK1+ryfcMWNhQBrWQgByK/tQrhiKjyv851wMBUCPM5CCAAjmQrP63wnHEyFAIIQABo2oSzUhACCEABKZ6GLoAkBBCEAaEI0IYAgBIB6TSgLNSGAIASA0lnoIgRqQgBBCAA0bkJZGKUJjYSAIAQAJslCF0ETAghCAKjbhLJQEwIIQgAonYUugiYEEIQAULcJZaEmBBCEAFA6C10ETQggCAGgbhPKws5pQkAQAgDTZqGLoAkBBCEA1G1CWagJAQQhAJTOQhdBEwIIQgCo24SyUBMCCEIAkIUAIAgBoGoWugi9MRICghAAmK8JZaEmBBCEACAL0YQAghAAqmahi6AJAQQhANRtQlmoCQEEIQDIQjQhgCAEAFmIJgQQhABwqa/93e8ny8LQf/+37x1oQgBBCABqcHwTmgo1IUATV1wCAKRgXPcf3Y31N5xjIVx59rU/9L0GhHbNJQBADca1mgrDlSEAPXBkFAA1mKQMnSOdn4OjgCAEADUoCzUhQEjuIQRACubU5yHSZPcQrriZEBCEAKAGlWHRINSEgCAEADWoDOsGoSYEInIPIQBqsAp3GE7N/YRAOBZCAKRgUYsMhrkXwhN2QiAQCyEAIX3h82+7CHs6GQxths3ZCYFALIQABK7Bp1+VhY1NPRtWWAhP2AmBECyEAEStQaZgNmzFTgiEcM0lAEAKsrYMV7/u8yMNAdifI6MAxK5Bp0bntH8Z1jkyesLBUUAQAsBUNSgIw8VhtSDUhIAgBICpalAThovDgkGoCQFBCACTpKAgDBeHNYNQEwKCEAAmqUFNGCsOywahJgQEIQBMUoOCMFAclg3C+49eGobh668/5ysBEIQA0LIGNWEgh3celK3BE5oQ6IoPpgegrxT0YYMkrsFhGF5+7QeuCSAIAWBNDe7z//6jLz/rGvbv+GatI6NnalATAoIQANrXIESpQU0ICEIAmKQGjYQhFBkJN9SgJgT6cc0lACBBCkKsGgTohIUQgFQ1aCQMIfdIuH0NGgkBQQiAGoSKNagJAUEIgBpsz0gYQsqRcNxJUU0ICEIACqWgbZCU9rlvUBMCghCAEjU4z/+QkTCETCPh/k+R0YTAIjxlFIBsNQjhavBME3799edcVWAeV1wCALLW4NOvStAADu88UIMXUYaAIARACgpCTVixBsUhIAgBUIOaUBCqQWUICEIApKAg1ITla1AZAoIQADWoCQVh9RpUhoAgBEAKCkJNWL0GlSEgCAFQg5pQEFavQXEICEIApKAg1IRqUBkCghAAKagJBWH5GlSGgCAEoHoNCkJNqAaVISAIAaiYgppQEKpBcQgIQgBK16Ag1IRqUBkCghCAiimoCTWhFFSGwFrXXAIAKqQgqMEtvfzaD5Qh1GEhBKBWDRoJo1hwJKxcg2spQ0jMQghAlRQENTjOajMUh5CPhRCAcjVoJIxi/pFQDW5PGUIOFkIACqUgqMFW3GoIOVgIAahYg0bCEI7vHdx6dFcNhiALQRACIAUFIW068My/M2kWSkFlCIIQAClYLpA0YYgUnLoJ1aAsBEEIgBqsmEaCMEQHTpqFalAZAoIQQArWpQmjdOAUTagGZSEgCAHUYGmCMFAHts1CNagMAUEIIAXRhME6sEkTqkFZCAhCACmIIAzZgftkoRRUhoAgBFCDaMLwHTgiC9WgLAQEIYAURBOmSsEtm1ANKkNAEAKoQQRhtg7cJgvVoCwEBCGAFEQTpu3Ai5pQCipDQBDCMu/Cv/LVZ10HpKAg1IELZqEalIWAIIQl34trQtSgJtSBC3ry/Wt+y5QhIAhh4XfkshApKAh1oCBEFoIghLrvyzUhalAT6kBBiDIEQQil35rLQqSgIJSCghBZCIIQ6r5B14RIQU2oAzUhyhAEIWhCUIOCUAcKQmQhCEIo+WZdFiIFNaEOFIQoQxCEUPctuyZEDWpCHSgIkYUgCKHuu3ZNiBQUhDpQE6IMQRBC6bfvshApqAl1oCBEFoIghLpv4jUhalAQSkFBiDIEQQil38fLQqSgJtSBghBZCIIQ6r6b14SoQUGoAwUhyhAEIWhCfNmgCXWgJkQWgiCEku/sZaGvGQShDhSEKEMQhFD3zb0m9NWCJtSBghBZCIIQSr/Fl4W+TtCEOlAQogxBEIImxFcI5YJQCmpCZCEIQvB2XxP62qBWE+pAQUifDm88eOGfvuI6IAiBZd70y0JfGOQOQh0oCOk5BU//n7IQQQgs875fE/qSIF8T6kBBSKAUPEMZIggBTYgUFIQ6UBBSLgVlIYIQWDIDZKEvA4I2oQ7UhGRKQWWIIAQWKwFNKAUJ1IQ6UA2SOwVlIYIQWCYJZKEapPMglIKCkDopqAwRhMACVaAJpSAdNqEOFIRUTkFZiCAEZm0DTSj/6CQIdaAgRArKQgQhsEwtyELtx1JNqAPVIFJQFiIIAU3oN45aTagDBSFSUBYiCIHuukIWyj9m8N5TP3MRBCFSUBYiCIEeS0MTyj8EIYKQPlNQFiIIQXtoQu2HGkQNUr0GlSGCEDSJLJR/CEIEIaVTUBYiCEGlaEL5hyBEEFI6BWUhghAEoSyUfwhCBCGlU1AWIghBEGpC7YcgRA1SvQZlIYIQNGHFJpR/CEIEIVJQFiIIQRCWyEL5hyBEEKIGZSGCEARh/ibUfqhBBCFSUBYiCIGO0mi6JpR/CELUIGpQFiIIgQC9tH8Wyj8EIYIQKSgLEYRA1ILaqQnlHwhCQYgalIUIQiBPEF6UhdoPBKEaRA3KQgQhUCIIAUEoCJGCshBBCGhCQBAKQtSgMiS/qy4BAABqMJ+7f/u1u3/7NdcBQQgALZkH+2ceVIPIQrbkyCgsyalREIQIQtTgbBwi5TwLIQAAarAEayGCEAAANSgLZSGCEADIyHlRNYgsZHvuIYSFuY0QwnEPoSBEDSbj3sLKLIQAAKjB0qyFghAAANSgLJSFghAAuJjzop1zXlQNIgvZiXsIYXluIwRBiCBUgy5Ch9xbWIEfmgAAqEHWWE2FyjAxR0YBAIBLytA5UkEIANU5L9o550UjMg/KQpblHkLogtsIQRAiCNUggThEmoaFEADUIKhBdmMtFIQAoAbpiHkQZCGCEACAAMyDspBOuIcQeuE2QuiWeTAEC6EapB/uMAzEj04AUIMALZ0eDMWhIAQAmJZ5MBDzoDikK46MQkecGoXemAcFIYKQiYjDTvjpCQBqENQgc1sth8pQEAIAjGceVIOE9it//UurX//Pf/a/XBBBCADLMw8CzOD+o7vicFk+hxA68pWvPusigBoEKOLwzqbR+Ff++pdW/3KtpmMhBAA1CNBLB14Uh6tfWw4FIQDAB9xAGMjxvQO3EerA/YlDQQgAUzEPAvTZgeJwIj6HELrj0whBDbI9C2GwNrAQ6sBTjib7ehCH2/MzFAAAmK8DZ2A5FIQAsBvzYETmwXDcRqgDxaEgBAA1CKADl4xDZSgIoV9f+eqzbiMEAHTgDGUoDgUhANWZB4NyXjQop0Z1oDgUhACgBgFEoDgUhAAAQL0OPOp+KC4Shz6HEDrlNkKYgXkwLudFw/eGU6NVOzBQEF4kWRz6YQoAADqQbSVbDgUhAEWZBwERiDgUhACoQWBusZ41umqn45sHOpBkcegeQuiX2whBELKWGwhziBKEawsqVhn2GYFHZe4j7TwO/TwFQA0C7JZSp//9PuPQEtiP1XLYZxlaCKFfFkJQg6xlIcyTW31vRCOaatk4DBSBR+UfM9tPHApC0IQgCFGDCMJJ4mrqPow7AwrCfuLQj1QA1CCwjG4fLdMqtBref+gIaGLLPo1GEAKgBgHmSy9pR1dxeNVFBwBgKcf3DlwEOG+2qVAQQte+8tVnXQRowjyYgxsImZr5jmoEIQBqEFhSPyOhGqQTc95JKAgBAEANzscjRrsiCAFIzjyYhvOiiS0+EqpB+jHzg0YFIfTObYQAoAZRg4IQAHZmHoQolhoJ1SDFCUIA1CABOC+KGiS9+edBQQgAQC9mHgnVIAhCiMFthDCCeRBQgwSyyDwoCAFQg0BH5hkJ1SBqUBACAGG4gRA1mIYPIeyNIAQgG/MghDbpSKgG6dCC86AghDDcRggAahCacwADgNh+9dM/PPPv/Lcf/KLLkonzogUd3zs4bH2wUA3Sp2XnQUEIQNTqA1CDIAgBUH1n/cZz7xgJM3n/yb83EhbUcCRUg3Rr8XlwGIYrfhsgkC98/m0XAeG3JU2YiSAsa/8mVIO98ZTRrmpwsBACED38LmInBNQgCEIA8rcfkNU+B0fVID3rZB4cHBllH3/8v994/plbrsPMnBpF++3ESJiA86LFjQtCNdgzp0YFIeE78KL/SB8KQrSfJkQQsngTqkFBqAYFIXOnoDgUhGg/TYgaZPEmlIKCUA3uyg9ZGnfgRf9f+hDk34I8YAZKRKMahN1ZCGmfgpcSh3syEqL9RhCEEZkHeaz3Ns5KajCWsiNhb/PgYCFkzg686K+vD0EHzsBICNFteOKoGgRBSIwUvPR/VBwCmpAT5kG2pAaJosN5cHBklAU7cBv6cC1HRrmUeXADTSgIiZ1/j4+EajCuaqdG+6zBwUKoA2P9HerDE1/56rOaEDWIGgQ1CPuzEErBqIrHoSBEDe7DSCgIid2BNx5IwQRKLYTdzoOCUAfmUa0PBSGCUBMKQiq79eiui6AJBWETftpKwYT/gE6Woga5lAfMqEHUIKjBwUKoAyvI2odGQtTg/jShIEQQsqAKC2HnNThYCKVgwUthP0QNghoE4ISFUAeWFjoOLYSowSaMhIKQcCyEmeQeCfufBwcLoQ503dL0ITCOmwnVIEBlFkIpyHoh4tBIyGAebEQTCkKiMA8mk3ghDDEPDhZCHciWV9h4iBoENQg0d/veQcomjFKDglAKMuayi0PUYD4OjgJQkyDUgez7e6EPQROyP/MgkEageXBwD6EUZHF79qTbCMsyD05EEwpCOucewpSSnRqNFYR++OpAov9Gf/AD9PjegYupBkENogZBDQpCHUhFh6f+aE0cqkFGc3AUgDo1ODgyKgVJTxwKQkbQhHMyD7I9C2FiOU6NRgxCP4J1IMlZDtUgI9gJAahQg4JQCiIOUYNoQgDqcmRUB4I4VIOsJwhn4LwoO3FkNLfQp0aDzoODhVAKwmA5hAsYCUENQnqCUAeCOAzAPKgJUzIPAjnEnQcFoRQEcagG0YQAFK1BQagDYUwc6kM1CPszDwJn3L53kOPDJwShDoRafSgOp3Pr0d2Hw6HrsDgjIQBrRZ8HB08ZlYLQnD7cPwLP/DsPP6MJu6AJGzIPsv/PRlIKtxAKQh2oA0EcTv5GRxBqQkEIglATqkFBKAVBH9Z9f6MJNaEaxA9MF0EQqsEp+ImsA2E+7jz0ngYA6IqFUApCF9L34f4daCTsh5FwH+ZBlvopSiD9j4Rp5sHBQqgDoROr8TBTGXr7kpWHjgKQhoVQB0J3ojfhdB1oJOyKJhzBPEhvP1fpU+cLYaZ5UBBKQdCEwd6vaEJBKAgRhGhCQdiQn8s6EHp0eONBlCb0NqUsB0fVIEACFkIpCF3rNgsX7EAjYVc0oSAk949cFtTnSJhsHhwqL4Q6EELobSr0poQz7IRqEEAQSkEgeRN21YHXv31sJNSEACAIdSBowkIdCHGZB4ERbt876P8DCRPIfw+hDoRMZsvC/lPQSNgbI6EgpOwPZKbTWxDmu4FwyL0QSkHIZ+qp0NsORnNwVA0CRJRwIdSBkF7zJgzagUbCDmlCQUhz/qiuuK5GQguhFAS60HAn9D4D1CBAZRkWQh0IZY3OwjQdaCTskJFQENKWP7krrp+FMOU8GD4IpSCwaxPme2OhCTWhGkQQogkF4Wghf1LrQGBly+Oj3k8wJw+YAUAQAnTRhOlT0OfUd9uEJ78oW4bmQYAQ4h0ZNQ8CFzmdhaUmQUEYQrUyFIS04ogHQx+nRt1DKAiBGE1Y862DJlSGahBNiCBUgyNcVYOANw0wp9947p2Tf7kUAFu63fojiFnxB3gAGbiTMGgZrn6daTY0DwIEctUlAIAe4tBsCBd544kXXAQQhM6LAmxy/dvHLoIyXJx5EJjIgqdGE99AODgyCmRyeOeBi0CmMjz5hY80BEAQAnA5dxIqw2WZBwHCCXNk1HlRAJSh+wwpy22EDJ41Og1/kgeQipGwSBmuft3PbGgeBBCEUzEPAsDmOHSrIcAUcj9RZvCxE0Aaniiz4nGjZctwwQOl5kFm4NQoRze81rfnxzcAZCvDk1/YDAE1SIYgdF4UYFfuJGTOMjQPAghCAKD3MhzMhgT3xhMv3Hp013UoaKl5MP0NhIIQIC0jIZvjsFUZmgeBrDVYRO8/xJ0XBYAQZQigBgUhwDI8YnQtIyFTl6F5EFCD0XX9sRPmQQCYswwX/OAK2JIPn1CDs6lwA+FgIQQAzpfhyS82b4bmQSBxDdbhRzlAZk6N0qQMB7caAmowqX6PjDovCgBdxeHpA6XmQRbk1CiUCEIAmrj+7WMXgeZl6DoAEzEPCkIAAEANLqnIE2X6DULnRYHt+cyJSxkJae4TH3/oIrAgp0bVIMmDEAAAUINUDELzIEBzRkIA1CAxghAAADZzalQNTqfODYSCEAAYyW2EAIKwPedFASbi1CgAvXFYVBACAABqEEEIwMSMhLTl1CjLchuhGiRbEDovCuzKhxACgBpsqNQTZYZhuObLEQCAcH7hb54chuGt4ZVhGH7tH3/NBVGDjNPRQmgeBJiBU6NAghQ8qcGVt9595a13X3FlIHYQAgDhuI2Q+Wvwov9IFoZgHhSEACzMSAgETcENNXg6C10rNThatRsIOwpC50UBANhQg9v/l02FapDteagMAABJUvBMFg6eNwOXcWQUoCKnRmnIbYRMl4Kja/BMFrI486Ag3MR5UQAAztRgq7+UE6RqcEsFbyAcLIRAaD6VHiBlCjaswdNZ6NqqQXoMQvMgwCKcGqUhp0ZpWIPT/cU1oRqkxyAEAICJhkFNCJtd6edvxVQI7MqR0f09/Myhi0AT3/2z6y4Co1Nw5v9Fjx6dR7h5sOY9hB197MTzz9xShgAAanBqb737iiZUg2rwxJWe/+aUIbCZhXB/FkIaMhLSfwqepgnVoCAcOv9g+tVmKA4BJnL928eaEChYg4OdEPoPwrVxqAwBAKQg3fJkUUGoDAEACJCCRkI1eKLsedEh9MdOPP/MrZN/+cYD2IcPJKQVn0ZIrBpcNaHfHSq7luCfwWYIACAF92lCO2ETDosKQmUIAECkGtSEarC4K7n/8ZQh5OZjJxryrFGa8MkThEvB0zRhzRqsfAPhEPoewm24zxAA5uQ2QuLW4OB+Qkq6VuSf00caQj7mQQApOEUT2gl35bBoaFcq/8MrQwjt/qO7t+8duA4NOTVKE06NSsEENGGpGix+ZPRa5X94D6GBuCm4ehHShABqEBjtiktwmjKEQDW4oglbsRDSipFQCiZgJNyGeTCBq76OT/MQGghXg4NbFwDU4AQ8YKZCDSIIlSGEr0GvSQ1d//axiwBsn4Lpj4m+9e4rv+koLNk5Mrotp0mh2xo8zfHRPTk1SitOjaavwWqvPv/1F973+35amj+KdWRUEIpDSJKCmlAQIgiRgjO8AClDNSgIUYbQbw1qQk2IIEQNzvMaVLYMM92mIQiH4h87sT8fXAEd1uDg4ygApOD0Tm4vNBgSnYWwMWUIi9fgiiYcx0JIK0ZCNVjqlahIGSZ7ipuFcLAQNmczhE5qcLATAkjBGa2eR5q4DD3TOyUL4eSUISxSgyuacAQjIU1YCNVg5RejlFloHkzJQjg5myEsWIODnRBACi4h32BoHszKQrgMcQjz1OCKJtyJhZBWjIRq0EvSSugyTFmDFsITV12CRTz/zK2Tf7kUMEMNDv5cc0fXv33sIkDNFFSD0/nNv3nyN11e+mMh7IXNECk4Azvh9oyENGEhjFWDLsKcL0yBBkPzYG7uIeyFWw3xojvPS5omBJCCPYhyk6EjNuk5MtpjGTpNihr0wgY5fOLjD10ENcilZegoKQtyZDQAmyFqcAqmwks5NUoTTo1KQa9QO+lqMEz8p6iOjK44MhqA06R4rZ3oRU4TAmqQ3lT4gHs12BULYUjKEDXYiibcwEJIExZCKehFah8LZqF5UBAiDiH/C60mvPi36aWTXxy66xJNqAa9TtUrw9y33AtCQagMwausJrw8BU+ThQhCKeilqlQZCkJBiDKEWq+ymnBtBypDBKEa9FJVMAvTP5FbEApCZQheYjXhzikoCxGEUtCrVYUyVIOCEFkIdV9fqzXhiBSUhYz+9v+5//EVl0INerXqvwwFoSBEE0Lp19ciTbhnCspC9vn2V4ZS0AtWt1l4VOBHuiAUhLIQvLiWbsKGKSgL2fPbXxmqQa9ZXZXhUY2f5IJQEMpCWYhX1qJNOFEKykL2/PaXhWrQy1YnWWgeFIRoQvCymrMJZ0hBWcj+3/7KUAp65VqwDM2DghBZCF5TczbhzDUoC9n/218ZqkGvXDOX4VGZn9iCUBAiC/GaWqgJl0pBTejbv9VfShlKQS9e82ShIBSEaELwmpqqCRdPQU3oe78hWagGvXhNWoZHlX5QC0JBiCzEC2ryJuwnBTWhb39lKAV9AYfwc1/6gRoUhCAL8Woavgk7TEFB6NtfGapBX8OaUBAKQjQhXko1YdEU1IS+/WWhGvQ1rAkFoSBEFuKlVBPWTUFN6NtfGUpBX8aaUBD27KpLwFrPP3Pr+WduuQ5wRld33geqQbyNntRPP/aFn37sC2oQUIMjWAi5hKmQKO8I57T4Thg0BY2EvvfnkW8wlIJeyOb79sk7EgpCQYgsxItohiaMvgpqQt/7slAN+nrWhIKwK46MshXHR/EKesb8Z0fvP3rJGVF8728vxzlSNejrGaZmIWQ3pkK8iJ42206YKQWNhL7xFxFuMJSCvqSX/H5JNxKaBwUhshCvoFGbMOUqqAl948tCNeirWhMKwk44MsoYTpDi5XNlurOjzojSY8zfeXB4J3DP93+O9Bf+5kk1SBffLF98zkUowkLIXkyFapATzXfC9CloJAzXgaf/z6Msv329DYZS0ItaX98gKUZC26AgRBbitTNYExZZBQVhxA7MF4RdZaEa9IqmCdWgIEQT4rWzdBNWOyCqCcN1YNYgXDwLpaAXNU0oBQUhshAvnNWbsObtgpowVgfmDsKlslANel0ThGpQECIL8cJZugkrPzlGEMbqwApBOHMWqkGva5pQCgpCNCFeNes2oYeIasJYHVgnCGfIQinopU0TSkFBiCzES2bpJlSDgjBcB1YLwunKUA16adOEalAQIgvxqlm3CaWgJgzagWWDsGEWSkEvbYJQCvbGB9MzOZ9i7yWzrLVvmtUgM3dg9I+S78f+H2qvBon9LdDfR9WrwSYshMzHVCgIa1rthFJwU7cYCVt34KR//aPyv18j1kI16NUtyRd/HzuhFBSEyEK8XgZrQjWoCRN0oCAcl4VS0AucJpSCPbvmEjCz55+5pQm9WNa7gGqQDB3IGScnSDdnoRr0AocaFISwpgkHUyHwuON7B0ZCHZgsC9UgOb/mv/jc/COhFBSEyEIW409PQQeyaxZKQTShGozCU0bpIgtRgzAMw/FlH94oBdVg/1n40499QQ1CwxRUg1OzENJLE5oKAS7qQBcB6M3UI6EOnI2FkI6y0FrYG/Ngo3fzX3cRtmckPJOCahDouQnVYAIWQrrLQlMhoAN7/tvzmROk4c89mzRh251QCgpCcILUyyTVlX3cqDEwz9fwzZcdDQApKAhBFgJIQSC5JiOhGlyQewgJkIXMzzzIsurcSeguQSBHE+6TgmpwWRZCYjShqVANQrIOdBGAZE04YieUgj2wEBImC62FUErWkdAkWOUL+ObLLgJsTkE12AkLIcGy0FQ4NfMgTNSBLgJ4vctty5FQB/bGQki8JjQVQhE5RkKTIFCqCdVgOBZCombh4MbCCfjjUmibgi4CULAJ1+6EUrBbFkLCZyGQWNCR0CoIoAajuOISkICpsAnz4DRh4MOp976GcT6kvkgEHt3Qun4CeNXjEquRUAr2z0JIBqZCSCzESGgSBDjtp198znNEo3APIama0FQ4mj8ohdEp6CIAnPFXf3rbRRCEIAuBNo7vHXR4cFQKQlz+GFQKsuLIKGmzEK+LMF0KqkG24ePpUYP0z0JI5iY0FUKeN9Z9jIQ6EEAKCkKQhamYB0EKAkjBshwZpUoWAtEt9bhRB0QB1GBiFkIKNaGp8DzzIGxOQRcBQArmZiGkVhZaCyG02UZCqyDNvmg9VwY1SN8shFTMQlPhCfMgrE1BFwG8/CEFBSEkb8LBCVJACgKoQUHoEiALC/6zv/XuHw3DMDzlq2DqwPi6i9DcFJ8/IQUBEIRQNwuLNOEHEXjKU+99aBiG9576mS8DCke7FATYinlQEELmJhzyToXnO1AWEl2TkVAKMt9X7M2XnRcABCEEyMJMTXhpB8pCypKCALsyDwpCIGcHykKCGjcSSkEAEIRwobgj4Z4dKAtJTwoCjGYeFISgCUt0oCxECgLp+RBCEIQQ3qQdKAuJ4tJTo1KQjr5cPVeGsMyDghDK6XYknLMD12ahMiQKKQgAW7riEsBa/TThgh14EVm4fUIPw/D0m191QSZsv8dHQik4g6MbLvKor1ULYR8cGd2JebACCyF0qsMOPFM7snCbGhyG4Uef/LwsnOXdtkoBgJ1ZCOFCi4yEPXfgWrJwcw2eIQuncMuf98/LQjiCebAfFsLtmQeLsBDChea8mTBcB57pH1l4aQqeOFkLlSEAahBBCATuwItaqGwZblOD58tQFu7PPEj/zIOAIISoJhoJ03TgRV1ULQt3rUFZCEDPzIOlXHUJ4NImbJuCiWvwdCCNbqSC/6Q/+uTnV0dJoX+37x24CNszDwKdsxDCHCpE4NpYOvlF1sGwbfRaC0dwXhSgOfOgIATOGn1wtGYHXhROybJwognUU2cgE/NgbzxiFAQhzNGEOnBzQUUvw3lOwxoMAZifeVAQAuPpwJ2CKmgWznxvpMEQ4jIPAoIQUtkwEkrBfcoqUBku+KQcg+F5biAEaMs8KAiB3ejAOmXYyUNTDYYQhXkQEISQ0MlIqAMnja4Os7DDj9BQhgC0ZR4UhMC2Tfji9z7qOsxQXz2UYf+fpli2DJ0XpWfmQUAQAoQvw/5rUBkC0IR5UBACO/jmr/+FkXCpMJsnDmOloDKErpgHUYMIQtCETJ5q05Vh6BpUhgCAIASUYekUvKgM08ShGwjplnmQcMyDCEIYyUjYWxnuGYdZazB9HAIAghA0IY9F3U5lWCQFxSFMzTxIOOZBBCGQvAwvjcOyNbghDjvvQ+dFAaChKy4B7MlIGMjpOJSCO+knEQVhD45uPHARzjAP9u++nx6PMw9ywkII+3JwNBARONqZCXFwyhQABCEAElElgnmQcMyDCEJoyUgIGyqxYSg6LwoAghA0ISQJxcGoSHzmQcIxDyIIAQjQiooRNQhqEEEIYRgJYfJi/JOPuCAA0NBVlwDaNqGLAFCEeZBwzIMIQgAAAAQhTMNICNN59dM/dBHohHmQcMyDCELQhAAAIAgBiMlI2IPb9w6KXwHzIOGYBxGEMCsjIQAAghA0IQCpmAcJxzyIIAQgD6dGUYMAghACMBICAMsyDyIIQRMC0IB5EBCEALA8p0YBtmEeRBDC8oyEAAmYB1GDCEJAEwKoQQBBCACLcmoUYAPzIIIQ+mIkBAjKPAgIQkATAkBU9x/dLfXPax5EEAKQn1OjzMA8CAhCoBkjIYAahEmZB9nJNZcAAKjmE79zb5v/2ntP/cy1AgQh0NI3f/0vXvzeR10HaOLVT//wy3/yEddBwgEnzIMIQtCEAJO7fe/g6MYDCQcgCAGAct5695VP/E7+f8yn3vuQU6MEYh5kBA+VgWV4ugy04lmji9SgiwAgCAFNCAB0wTyIIASgKCPhnMyDoAYRhEAbRkJADQIgCEETAqhBYAzzIIIQgOqcGlWDAAhCCMlICACMYx5EEIImBJiWeRBAEAJA15waVYNTeOq9D/kaoFvmQfZ3zSWATnzz1//ixe991HWA0Z58/9qXPv7w5Ndf/LPrLogaBOBSV1wC6IomhH2C8Py/qQzV4P7ee+pnLkJ09x/dzfcPZR6kCQshAGlrcBgGmyEAbGAhhO4YCaFhEJ6nDLdkHlyxECaQbyE0D9KKh8pAdzxxFKarwWEYvvTxh6vZEDUIUJwjowBU5CipGoS4zIM05MgodMrBUdjSTvPgBspQEF7EkdEEMh0ZVYO0ZSGETvkUCpiZzVANAhTkHkIAAms1D54pw7I3GapBsvrsEy/k+AcxD9KchRD6ZSSEBRUcDNUgQEHuIYTeaUK4yBTz4Abpy1AQbuA2whyi30loHmQKFkIA2EruzVANUsFnn3gh3wcSwp7cQwi987GEsNbM8+CZMkx2k6EahP6ZB5mII6MQg4Oj0E8QnhF9MFSD23BkNJOgI6EgRBCCIAS6q8HoZagGBaEmVIMU58goxODgKPSv8udVABCUhRAisRPC0Os8eF7/g6F5cHsWwnwCjYTmQSZlIQSASXQ+GKpBiovyUfVqkKn52AmIxEfVQ5R58HQWnvyiq8FQDQJwwkII8ZrQRYCI3GEIvel/JDQPMgMLIQBhhJsH12bhyS8WHAzNg3C6CX1UPcVZCCEeIyEksNRgqAYhCvMg87AQAhBDgnlwbRae/GKewVANwnlGQoqzEEJIRkLIV4buMIQFm7C3vyXzIIIQ0ITwD1LOgzNnoXkQgPN8MD0E5iMoEIS5NTxHqgb35IPpK+jn4Kh5kDlZCCEwIyFqMLdWg6EahG1E+ah6aMtDZSB8E9oJIX0Wnvyiq4+2ByZiHmRmFkIACFOGIwZD8yBsz0hIQe4hhAyMhCRW9rzoZluuhWqwFfcQlrLgzYTmQeZnIYQM3EwI1WyzFqpBiEUNsgh/7ApAv8yDl2bhyS/cXggN+ah6SnFkFPJwcBRBWNzpLDQPtuXIaEEzN6F5kKU4Mgp5ODiKGixudY5UDQIgCAGgaBa6CLC/OZ84ah5EEAJtGAlJwzy4j+ObL7sIEKsJQRACmhAAyjEPIggBAKBHRkIEIRCPkZDonBfdn1OjEKIJzYMIQkATAgAgCAHAPNiOkRBamWgkNA8iCIEJGQkBoPMmhMX5U1hI3oQvfu+jrgMAjHN448E//Ho4OLrzoNVf2TxIJ664BJCbICQW50Xbv52983UXYX/vPfUzF6FgAa7VpAnVIP3wugvJGQkBYHT+nXf75kGrLIQeWAihBE1ICObBqd7yGgn3ZiEsHoFrjW5C8yBd8dILAIAC3JmpkBwshFCFkZD+WQinejdsIdybhVABbrBTE5oHEYSAJgQ1qAkFIYELcJ8sFIT0xqsvAAAicF+3b17+oRRqkA5ZCKEWIyF9Mg/O8e7ZSLgHC6EI3N6GLBSECEJAE8JZD28fRnmfJwgFISJwdBOqQfrkT2SBNu8yj2++7FIwugYBokfgaR5ASiAWQqhop5GwyaogF9mmBo2Ek7/JNhKOZSEUgeOsmtA8iCAEwjThDG8Z9SEXDYOacFK3Hr00DMPxvQOXQhCKwJmzUBAiCIGug3DZ3UAfqkFBOFsNPvatpwzVoA6cxb/6tRf8piMIge7c+cQPe/tbUobFa1ATzhyE4lAQ6kBBCIIQBGGnxGHBFPSuccEgFIeCUAeqQQQhoAmVIcvXoHeQy9agMhSEOlAQIggBTagMWbIGvZXsJAjFoSDUgWqQ9HwOIRDnTcapJ9+Iw8QpuMoPbyu7fZdvOUQKQhoWQiDSSLgmG5Rhxhr0/rKt/efBzeme/gJaCH2fjmMeRBACmlAZqkHvNZMHYYU4FIS+PQUhiTkyCmR5X/L/D5QqwzQpSKwaHBwrlYKoQQKyEAIfSDASnqEM09Sgt55RgvDCb8bgcWgh9P0oCBGEgCaUhSxTg96DJgjC6HEoCH0bqkESc2QUyP4OxlHS4ClIpho8HxVOlkpBYFkWQuAxKUfCx959ysKwNegtaY4gvOQ7tMs+rLwQ+r4bwTyIIAQ0oSBUg96bqsEkfagGEYTk5sgoUOz9zZ2va8KgNTj4tPryQeJ8qRQEBCEwuZvf/Uj6g6OES0HQh2oQmIIjo8B6Do7SbQ16t7qNBOdFx3xrT5CIpY6M+uban/OihGMhBCBSDQ4OjrJLz1gR1SCwmYUQuFDWkfDkTc8bT3zDb3HEGvTmdRs158Et7ZqIFRZC300NWQgJx0IIFHL6Tc+tRy9pwrg1CA3jp/iKqAahOAshcKFMC+FF73g0YegU9EZ2LfNgE6tKTLwQ+g6agoUQQQgIwnjveGRhxBr0jlYQzuO7f3ZdDaIGSeyqSwBc5OZ3P1LkHY830EFrcPDIEKb3iY8/VIOAIASI93Znp3c8mjBiDeIrWRNO/bMREIQAVd7u3Hr0kjfTEWvQSIgm3P7Ho99KQBACUvCSLHQlh2jboCb01asJ1SAgCIHqNehddc0a1ISgBnvgiTIIQoDF3ug0f69Ttgkf3j6Me9+gJmRqQUdCNQgIQkAKasKtatAXVVyWbU048w9JIAefQwhcos9PI5zzLU6RTylMU4Nl3/4Kwjl19eGEb737Rxv+0y/+x+t+v+bhyCiCEBCEmd/u587CZNtgwSZUg3WacHP+aUI1CIIQyByEId7oh0vHlCdFqzWhIMzahCPyTxMKQtjJNZcA8P5+zrfmveWi+wbVIP1olX/nfel3HmpCYC0LIXCJxRfCIlPPIqGYuwbrjISCcEF7joTTFeBamnC6kv/dF7/vOiAIAUHoDX2kSqywDVb4ElKDsZpw5gLUhPPU4DAMghBBCGhCb+UjJWKdk6Lpv5AEYf9NuHgEykI1CIIQiBSEUnDqRKx232DuryhB2GETdliAmnC6GhSEROehMoA37ql64NI+9BQZNcikbRCFx8yU+u0GQQhIQX1YNwWP7x34AgNNqAZhrasuAaAGc/fh6l+Vr8PxvYP08Q/jmtBFUIMIQoAlU1ANoglBE8atQTcQIggBpCCacG7mQTRhDzUIghAo4eZ3PyIF0YSgCdUgCEIAKRjV7ZtaKAnzIJpQDYIgBOLVoItAD4yEoAm3T0E1iCAEaJCCahBN2Ip5EE04Ww1e+t/xRBkEIYAURBOCJqxYgyAIAaRgMG4jjN6E5kE0oRoEQQgEqEEXAU0ImlANgiAEktjykycMgzAd8yCacOoUVIMIQoCRpCBBGQlhcxMWycIRKeiJMghCACkYj9sIgzaheZBls1ANgiAEWF+DLgKakOKO7uT/SZi4CdUgghBgZAqqQTThPMyDaEI1CIIQkIJQtwlBEzZPQTUIghCQghW5jTBWE5oH0YRT1OCefwVPlEEQAuVs+ckTAKRvwtBZaBgEQQgAF+pqJDQP0nMWqkEQhACgCUETxkhBNQiCEADCNKF5EE3YsAb9ZoEgBOADnisTpQkhRBN2noXNa9ATZRCEAKAJp2UeJFwW9pmCtkEQhAAQsglBE+5Zg35TQBACLf3ypz7rIqAJZ2AeJG4TdpKFahAEIQCbuI2w8yaE0Fm4bApOWoNuIEQQAgATMg+iCfepQRcfBCEAtGckhF2bcOYsVIMgCAEgdhOaB8mXhfOkoBoEQQjAbtxG2GcTgibctQZdZBCEwEw8aBSma0LzIImbcIosnH8Y9EQZBCEAMEkTqkEqZGHbGnRJQRACQJ4mBE2oBkEQAjAftxF20oTmQUo14T5Z6PkxIAgBIGETQrUsHFeDLh0IQgBI1YTmQco24fZZ2MMw6IkyCEIAAGichdvUoAsFghDohU+eSMZthPvbZyQ0D8KGJnTHIAhCAEjehMD546MdpuB/+Oa/9juFIAQAmjWheRDOZOGqBvv8O9SECEIAoGUTAmeasPMzopoQQQgANGhC8yCcd3jjQf9/k5oQQQhAKp4rM3MT3nr0khqEoDWoCRGEAMDIJpSCkIYmJIdrLgEwwi9/6rN/+Z37rgNsbsLV3CEC4VKB5kHIxEIIABM2oUkQEtegkRBBCEASbiOcwr3PHLoIkJsmRBACAGoQxot+WFQTIggBAKBiDWpCBCEAcJZ5EKrRhAhCAGJzG6EahJkle7KoJkQQAoAaVINQsQY1IYIQAACq04QIQiA/n0oPa5kHYUu5P4ZeEyIIAQjJbYRqENSgJkQQAgBqENCECEIAQA1COxXmQRCEAABQvQaNhAhCAIJxG+GuzIOAJkQQAoAaBDYpe1hUEyIIAUANghqsSxMiCAEAUIOaEAQhAMRnHgQ0IYIQqOgvv3PfRcjNc2XUIDRkHtSECEIAUIOgBtGECEIAUIOgBjUhCEIAANCEIAgB6IvbCNcyD8L2zIOaEEEIAGoQ1CCaEEEIAGoQ1CAgCAFADQKcMBIiCAHokdsIgRHMg5oQQQgAeZgHQQ1qQgQhwAf+8jv3XQTUIKAGNSGCEADUIKAGNSGCEICMKt9GqAYBTYggBACAS5gHmzehLEQQAsBizIOgBnvIQhcBQQjQ2I++/OyPvvys64AaBDUYogllIVO75hIAmWJvp//m06++7aKhBkEN9p+Fv/vi910HJnLFJQB28ubhO5n+cTThNo7uVHnPpwbxPaIGeyYLmYIjo0BpTpACEIUTpAhCgKmy0EXAPAjbMw8um4UuAoIQWEay86JnmlAWqkFADUZpQlmIIASYJAtdhPPSfzy9GgQ1GDQLXQQEIUD7JpSFpahBUIOhm1AWIggBJslCF0ENAmpQFiIIAeo2oSwEUIOBstBFQBACtM9CF2FIehuheRDUYL4mlIUIQoD2TSgL1SBAoCx0ERCEALIQNQgNmAeDNqEsZEtXXAJge4k/h3B7T7/6ds1/8KM7Sd4UqkEaOv3nRP/5599Qg3Tod1/8vouAIAQEoSzUhGqQSTrwjExZqAY1IYIQQA3KQkEIl3dgvixUg7IQQQggCDVhqiBUg0zdgWmyUA1qQgQhgCCUhamCUA0yWwdGz0I1KAsRhACCUBamakI1yPwdGDQL1aAsRBACCEJNmCoI1SALdmCsLFSDmhBBCCAIZWGqIFSD9NCBIbJQDcpCBCGAIJSFghAdWDEL1SCyUBACCEJZmC0I1SAddmCHWagG0YSCEEAQysI8TfjbP7k1DMP1o2NfeHTbgV1loSBEFgpCAEEoC2ME4UnsbUkTEqIGl81CNYgmFIQAalATLhaEOwXeCJqQQEE4fxaqQWQhghAQhLJwZBBO3XKCkII1OGcWqkFkIYIQEISyMP/ba02oBuOaLgvVIJoQQQgIQllY5e21JlSDslANIgsRhIAglIV131trQkEoC9UgmhBBCAhCWVj3jbUmVIOyUA0iCxGEgCCUhUXfVQtCNVg8C9UgshBBCAhCWVj6XbUmVINls1ANogkRhIAglIXeVWtCQVgxC9UgshBBCAhCWej9tCZUgxWzUA2iCRGEgBqUhd5PC0I1WLEM1SCyEEEICEJZ6M20JlSDFbNQDSIIudRVlwAg3Bvf5u99C76Zfnj70NcSif32T26pQUAQAsjCBfJSEzL/t4OLcN6v/t4fuAiAIASQhd5Ga0I1CIAgBJCFjUoS1GAIRkJAEALIQu+hNzESAiAIASiRhYZBTZjsq91FuJSREBCEALLQu2dNqAY1IcAa11wCgNzvmJ9+9W1vnVGDAKxlIQQu4VPpvXUuwkhIYkZCQBACgCbMwJ9xAAhCANCEapAdGAkBQQgAmlANAiAIAQCKMRICghAALmck7JB5EEAQAoAmVIOMZyQEBCEAaEI1CIAgBABNqAaLMRICghAAAABBCGz05uE7LgLFGQkXZB6ciJEQEIQAoAnVIIAgBAA0oRoEEIQAgCYEQBACACzDPAggCAGgO0ZCNQic/Z795LMn/3IpgrrmEgDATk14/ejYdVCDoANdBEEIAJoQNQg6EEEIAJoQQAciCAFAE7Lz203zIOhABCHQlTcP33ERADUIOhBBCACcZSRUg6ADEYQAoAkBdCCCEAA0ITu9EzUPgg5EEAKAJlSDgA5kflddAgBo0oQughoM5Fd/7w9chGodePIvl4IzLIQAgBqEtB3oIiAIAWAODo4COhBBCACakI1vVc2DoAMRhACgCdUgoANZlofKAOu9efiOiwCjm9BFUIMwTwqqQQQhAGhCNQgVa9BFQBACAIAaBEEIAD0xEj725tU8CGoQQQgAmlANAiAIAUATqkFg9+8p8yCCEAA0oRoENQiCEAA0IQAIQgDQhD0xD0Lj7ynzIIIQAFCDoAZBEAITevPwHRcBmqszEqpBUIMIQgCgYhOqQQBBCADUbUKgIfMgghAANGGQd67mQVCDCEIAoGATqkFQgwhCAKBiE6pBAEEIAFRsQjUI7b+tzIMIQgBADYIaBEEIzMeHEMKcPHQUAEEIAJowJPMgtP+2Mg8iCAFAE6pBUIMgCAFAE6pBUIMgCAFAE6pBAAQhAGhCIBPzIIIQWJ5HjIImvPxtq3kQ1CCCEAAo2IRqENQgghAAKPm2VQ0CCEIAYGodjoRqECb5zjIPIggBgM6bUA2CGkQQAgB1mxAAQQhk5hGjoAnXMg/CJN9Z5kEEIQDQeROqQVCDCEIAoGITqkFQgwhCAKBiE6pBAEEIAFRsQjUIU31zmQcRhECHPFEGNCGgBhGEAED596zmQVCDCEIAoENTj4RqEEAQAgAVm1ANwlTfXOZBBCEA0HMTqkFQgwhCAKBuEwIgCIFyPGIUNKF5ECZiHkQQAgBdN6EaBDWIIAQAKjahGgQ1iCAEACo2oRoEEIQAQMUmVIMwHfMgghAA6LcJ1SCoQRCEgEeMQt0mpKyjGw++85Nb3/nJLZdCDSIIAYB6b1jNg7VrcPVrWQiCEABI5dKRUA1yhiZsyDxILFdcAsCRUUjp+tGxGuS80/PgeZ/6+TdcIjU42rc+/LqvgXAshACQ09qdUA2qwc3/BSdIQRACADmbUA2yJVk4jsOiCEIgHudFoVQTUtml86AsVIMU5B5CEISCEPK7fnRsHlSD+/y/u7dQDW7JbYThWAgBoMC7VTXIfkyFIAgBgKjef/LvXYTK9pwHV00oC9cyDxKaI6NQnSOjUMST719zEdRgK06QqsENnBqNxUIIahAAdmMqBEEIAEDvppgHV00oC82DJODIKJRmIYQ6HBlVg9OpeYJUDW7g1GggFkIAAPZScCpUgwhCAAD6Nds8uGpCJ0hBEAIAUFeRJjQPkol7CKEuNxBCKe4hLGXmefC8xHcVqsEtuY0wCgshAIAabCzrVKgGEYQAALBVE7qrEAQhAADz6WEePJOFaa6teXAnn/vxay6CIAQAoLocU6EaRBACANC13ubBM1noNwgEIdALjxiFat5/8u9dBDWoCccxDyIIAQCgQROGy0I1OJrbCAUhAABz6H8ePJOFahAEIQAARbmlEDpxxSWAmtxDCNU8+f41FyGrWPPgGZ/6+Te6/XszDzbxrQ+/7iL0zEIIahBQg6jBxXQ7FapBBCEAkCEF1SCaUA2CIASAijXoIuQWfR7suQlBEAIAgVNQDaIJxzEPtuXDJwQhADB3DboIFaSZB7tqQjWIIAQAAqegGkQTAoIQuJBHjELiGnQR6sg3D/bQhObBiTg1KggBgGlTUA2iCdUgCEIAqFiDLkI1iefBpZpQDSIIAYB4KagG1aAmJASnRgUhANC4Bl0ENGET5kEEIQAQKQXVIJpQDYIgBHbmEaOQoAZdBDShGgRBCADlUlANMgzD7XsHmpCI3EYoCAGA8TXoIlBc8yY0D4IgBIAAKagGoXkTqkEQhAAQoAZdBM6reWq0eRMyP6dGO+RlBgrxRBmQgsBgHoRTLIQAoAaJx0ioBkEQAkDCFFSDMF0TqkEQhADQbw26CDB1E7IstxEKQgBgTQqqQXZV+dTouCY0D8J5XnsAYPkadBFghMMbD340XNh4T7/5thqES11xCaAIjxgFKUhKRzcelK1Bv/txfevDr7sInXBkFADUIKhBEIQAwFwpqAZppeCdhGoQGvJqBECJAHMRQA0C57mHEKpwDyHKDRIrciehGszEbYSd8LoLgMwDgKLcQwglmAcBiM48CIIQAIA10j9aRg3m87kfv+YiCEIAAFCDIAgBANhD1pFQDYIgBACgIjWYm1OjghCYgyfKsCyPGIXZJBsJ1SAIQgAAKlKDIAgBANhNjpFQDYIgBACgIjVYitsIBSEAAC3FHQkPbzxQgyAIAQAoRwqCIATa84hRgILCjYRqsDKnRgUhAGn5zAlADYIgBABgVlFGQjUIy/IHtwAASEEoykIIAJBTzyOhGuQ0txEKQgAAqlCDIAiBOXjEKEBxvY2EPmkQBCEAABVJQTZwalQQAgDQXg8joWEQuuUpowAATJiCLgL0zEIIwFR8Kj10YqmRUA1C/664BJCYh8ogCIGVoxnzTAoyzrc+/LqLMDMv1aAGAUAKQlGOjAIAlDD1wVFPjgFBCABAOVKQVnz4hCAEAGAqzUdCKQiCEACAck0oBSEHD5WBnDxRBoApiECm9rkfv+ZZo3OyEAIA1DJuJDQJQkoWQgAm4UMIIQ0dCIIQAIA8bt87uPRz6nUgVHDFJYCU3EPI4iyE0L+LmlAKsji3Ec7GqzUAADoQirIQQkLmQXpgIYQQjjwqhv6YB+fkKaMAAHWpQdRgcf74FgAAkIJFWQgBAAA1KAgBAADUoCAEAABQg4IQCMYjRumBR4wCoAZD8IINAABIwaIshAAAgBoUhAAAAGpQEAIAkN79P7/rIqAGBSGQhyfKAABqEEEIAACoQS7hKaMAAIAULMpCCAAAqEFBCAAAoAYFIQAAgBoUhEAYHjEKAKhBduKhMgA09uT7XlwApCCCEOAyhzceTPcXP7534AoDgBpEEAIJe2///3XFCABqUBACBK6+if7OtSIAqEFBCJCk/fb/J5WIAKAGBSHQqbaPGK0TfjtdE00IAFJQEAIJU8dFAKjm/p/fdRFQgwhC0H7scPWMhACgBgUh0JENh0XlHwCgBhGEUKIG5d8MjIQAoAYFIbC8//vGHw/DMAwiEABQgwhCqFiDLMBICIAURBACUhAAUIMIQkAKAgBqkICuugSgBtmV5/cAoAbJwUIIUhAAQA0KQkANsjWPlrnIk+97ZQGQgghCQAoCAGqQvrmHENQgAOXc//O7LgJqkGEYrrgEIAUZzanR8xwZJaKPPfwnZf/ZP/fj13wBIAUFISAFEYSCECmIPpSCCEJADaIJBSFqEH0oBRGEgBREEApC1CASUQ0iCAE1iCYUhEhB9KEURBACUhBBKAhRg+hDKYggBGQhglAQIgXRh1IQQQhoQk2IIEQNog+lIIIQkIWCUBCCGkQfSkEEIaAJBaEgBCmIRJSCCEJAFmpCQQhqEH2oBhGEgCwUhIIQ1CD6UAoiCAFNqAkFIUhB9KEURBACslAQCkJQg8hCKYggBDShIBSEIAWRhVIQQQjIQk0oCEENIgulIIIQNKEmFISCENQgslAKIghBFiIIBSFIQeploRREEAKyUBMKQlCDVCxDNYggBDShIBSEoAYpl4VSEEEIyEJNKAhBClIuC6UgghDQhIJQDYIapFwWSkEEISALBaEgnMMbT3zjov/o1qOXfD2rQWShFEQQArIQTRg+CDeE3waaUAoiC6UgghDQhAjCYEE4Lv80oRpEFkpBBCEgCxGE8YKwYQFqQimILFSDCEJAE6IJuw7CSQtQE6pBZKEURBACshBB2FcQzhyBmlANIgulIIIQ0IQIwoWDcNkOFIRSEFkoBRGEgCxEE84ahJ1EoCZUg8hCKYggBGQhgnCmIOyzAzWhGoR9ylAKIggBTSgIBWHsDtSEUhBGZKEURBACslATCsIkHagJ1SDslIVqEEEIaEJBKAhTdaAmlIKwTRZKQQQhIAsp14SXBmGODhSEahA2ZKEURBACshBBmLkDNaEahLVZKAURhIAmRBCW6EBNKAUBBCEgC9GEa4KwSAdqQjUIkMBVlwA47R/det5FYLQ3nvhGwRqs2cAACEIgbRPKQka4/+iuiwAAsTgyCmziBGlDuU+NqsHBwdEtODIK0BsLIbCJqRA1uD0HRwEQhEDCJpSFqEFNCIAgBEpnoYuwp8MbD1wEAKAr7iEEduOuwn3ku43QPLiWmwnXcgMhQIcshMBuTIWowUs5OHre8c2XXQSADl1zCYBxTWgqHOHwxoM0I6EaRAQCCEJAFsrCitTgpd544hsFD44qQABBCJTLQk2oBqnchCIQIDQPlQHakIU7vIEOfmpUEO4kZROOi8B//+/+u68HgN5YCIE2TIVFqMGyLIEAghDgkiYcTIVqkMeFPjgqAgEEIYAsRA0WakIRCCAIARpkoSa8SMQPn1CD6elAAEEI0LgJB1MhDMPQ60goAgEQhMDkWagJozMPJqMDAVjxsRPATGTh2TflQU6NqsGGlh0JF+9AHzsBIAgBTUikIFSD0ZuwnzFQDQL0yZFRYD7uKoRqHQhA5yyEwDJk4dD9SGgenMh0I2HPHWghBOiThRBYhofNdE4NTqf5E0ftgQAIQiBkEw6mQjWIFARgOY6MAsur3IQdnhpVg/PYZySM2IGOjAL0yUIILM9UCFk7EABBCCALwzAPzmb7Owl1IADTueoSAB1mYR2HNx6owcpNeGkKqkEAJmUhBDptQlOhGixLBAIwGwsh0HUWQm5nRkKTIAAz85RRoHcVpsLFnzVqHlxWVyeHJ+IpowB9shACvTMVqkE1qAYBEIRA6SaUhWoQABCEgCxMqMJGhN96AAQhQIMsdBFaMQ8CgCAEiNeEslANAgCCECidhS6CGgzNeVEABCHAXk2YJgu1AQAwv2suAZAgC9f++xU+wHAc86A/AgAAQQgIRTUIAJR2xSUA6CcUj+8dqMEKqs2DPpgeoFsWQoAPWBQBAEEIQM5QNA92wt2DAAhCAKG4PhUmOjWqBgEAQQiwWCgOy42KapAFuYEQQBACsKkV3aZYh/OiAAhCALYKxTcP39n/L24eBAAEIUA8nzz+xT1DUQ12xTwIgCAEYPlQBAAQhAAlQvHf/otXXZzFmQcBEIQALOBP/+rLQhEAEIQArAlFZQgANV1xCQA4TRxOofh5UR9FCNAtCyEAjzEbAoAgBEAZ/sOdh+JwHx4nA4AgBCBDHCpDAMjEPYQAjCQOt2EePOE2QoA+WQgBGMlsCACCEABl6G7D9cyDAHTOkVEAJqEMBeEZTo0CdMhCCMAkzIZqEABBCADuNgSATjkyCsAy0sehhfA8p0YBemMhBGAZuWdDNQiAIASAHcpwcKYUAAQhAOIwdBmaBwGIwj2EAPQuXBwKwg3cRgjQFQshAL2LNRuqQQAEIQBMWIaDuw0BoAVHRgGIrasyNA9uw6lRgH5YCAGIzWwIAIIQABa+29A8CIAgBICOynAwGwLAxdxDCEAVU5ehhXB7biME6ISFEIAqJp0N1SAAghAAgsWhA6UAVObIKABsZUM6mgdHcGoUQBACQEL/6b/8GxdBEAIIQgBAOgpCAEEIAEhHTQggCAEA9SgIAQQhAFA3HQUhgCAEAIqmoyAEEIQAQN101IQAAADSEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMb5fwH4DLa59RNQAAAAAElFTkSuQmCC";
const GEO = {lon0:-5.2, lon1:8.6, lat1:51.3, k:Math.cos(46.5*Math.PI/180)};
let provState=null, capaFrancia="ducados";
let selDucado=0, selParl="paris", selDioc="dioc-paris", selApanaje="ap-orleans";

const CAPAS_FRANCIA = {
  ducados:     {num:"1", label:"Ducados y Señoríos", ico:"🛡", sub:"Mapa feudal de Francia (1722): Ducados-Parías, Condados, Marquesados y Baronías, cada uno con su escudo heráldico y su señor."},
  parlamentos: {num:"2", label:"Los Parlamentos",    ico:"⚖", sub:"Las 13 jurisdicciones soberanas de la Toga (Parlamentos y Consejos Soberanos), cada una con su emblema judicial y su Primer Presidente."},
  diocesis:    {num:"3", label:"Las Diócesis",       ico:"✚", sub:"Mapa eclesiástico de Arzobispados y Obispados ante la bula Unigenitus, con sus emblemas episcopales/cardenalicios y su prelado."},
  apanajes:    {num:"4", label:"Apanajes de la Sangre", ico:"⚜", sub:"Tierras del Dominio Real, Príncipes de la Sangre (Orleans, Condé, Conti) y Legitimados (Maine, Toulouse), con sus armas reales y su jefe de casa."}
};

/* ---------- 1. MAPA DE DUCADOS Y SEÑORÍOS (Cada uno con su escudo y su líder) ---------- */
const FEUDOS = [
  // Île-de-France y centro
  {id:"montfort", prov:"ile-de-france", lon:1.78, lat:48.78, corto:"D. de Luynes / Montfort", nombre:"Condado de Montfort-l'Amaury y Ducado de Chevreuse", rango:"Ducado-Paría y Condado",
   casa:"Casa d'Albert de Luynes", clan:"ducal", pid:"charles-philippe-luynes", titular:"Charles-Philippe d'Albert, IV Duque de Luynes",
   escudo:{bg:"#1f3a68",fg:"#d8b258",acc:"#b3322e",pat:"luynes",crown:"ducal",blason:"Cuartelado: 1 y 4 de oro con león rampante de gules coronado (Albert); 2 y 3 de gules con nueve macles de oro (Rohan-Montbazon); sobre el todo, palo de azur."},
   rentas:"Bosques, censos señoriales y bailía entre Versalles, Dampierre y Dreux; más de 90.000 libras de renta.",
   nota:"Cambiado con Luis XIV por el antiguo ducado de Chevreuse para ampliar el Gran Parque de Versalles."},
  {id:"dammartin", prov:"ile-de-france", lon:2.62, lat:49.08, corto:"C. de Dammartin y Chantilly", nombre:"Condado de Dammartin y Señorío de Chantilly", rango:"Señorío Principesco y Condado",
   casa:"Casa de Borbón-Condé", clan:"conde", pid:"luis-enrique-borbon", titular:"Luis Enrique de Borbón-Condé, «Monsieur le Duc»",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conde",crown:"principe",blason:"De azur con tres flores de lis de oro y bastón recortado de gules en abismo (armas de Borbón-Condé)."},
   rentas:"Rentas agrarias inmensas, bosques de caza y ferias al noreste de París, multiplicadas en 1720 con las ganancias del Sistema de Law.",
   nota:"Chantilly es la verdadera corte rival de Versalles donde gobierna Monsieur le Duc junto a la marquesa de Prie."},
  {id:"maintenon", prov:"ile-de-france", lon:1.52, lat:48.56, corto:"M. de Maintenon", nombre:"Marquesado de Maintenon", rango:"Marquesado",
   casa:"Casa de Noailles", clan:"ducal", pid:"noailles", titular:"Adrien-Maurice, III Duque de Noailles",
   escudo:{bg:"#a82828",fg:"#ddb650",acc:"#1f3a68",pat:"noailles",crown:"ducal",blason:"De gules con banda de oro (armas plenas de la Casa de Noailles)."},
   rentas:"Tierras regadas por el Eure, molinos y señorío libre de deudas gracias a la dote dispuesta por Luis XIV en 1698.",
   nota:"Heredado en 1719 a la muerte de Madame de Maintenon por su sobrina Françoise-Charlotte d'Aubigné, esposa del Duque de Noailles."},
  {id:"rambouillet", prov:"ile-de-france", lon:1.83, lat:48.62, corto:"D. de Rambouillet", nombre:"Ducado-Paría de Rambouillet", rango:"Ducado-Paría (1711)",
   casa:"Casa de Borbón-Toulouse", clan:"toulouse", pid:"comte-de-toulouse", titular:"Luis Alejandro de Borbón, Conde de Toulouse",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"toulouse",crown:"principe",blason:"De azur con tres flores de lis de oro y barra recortada de gules, acolado del ancla de Gran Almirante de Francia."},
   rentas:"Uno de los señoríos mejor administrados del reino, adquirido en 1706 y erigido en Ducado-Paría en 1711.",
   nota:"Residencia predilecta del Conde de Toulouse, Almirante de Francia, que supo mantenerse al margen de la Conspiración de Cellamare."},
  {id:"villeroy", prov:"ile-de-france", lon:2.46, lat:48.52, corto:"D. de Villeroy", nombre:"Ducado-Paría de Villeroy", rango:"Ducado-Paría (1651)",
   casa:"Casa de Neufville de Villeroy", clan:"ducal", pid:"villeroy", titular:"François de Neufville, II Duque y Mariscal de Villeroy",
   escudo:{bg:"#1f3a68",fg:"#ddb650",acc:"#e8e4d8",pat:"villeroy",crown:"ducal",blason:"De azur con cabrio de oro acompañado de tres cruces ancoradas de lo mismo (Neufville de Villeroy)."},
   rentas:"Rentas señoriales en Mennecy y Corbeil, sumadas a las enormes pensiones del Gobierno del Lionesado.",
   nota:"Solar del anciano Gobernador de Luis XV; aquí será confinado en primera instancia cuando el Regente lo destierre en agosto de 1722."},
  {id:"isle-adam", prov:"ile-de-france", lon:2.20, lat:49.13, corto:"B. de L'Isle-Adam", nombre:"Baronía de L'Isle-Adam y Señorío de Pontoise", rango:"Baronía Principesca",
   casa:"Casa de Borbón-Conti", clan:"conti", pid:"louis-armand-conti", titular:"Luis Armando II de Borbón, Príncipe de Conti",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conti",crown:"principe",blason:"De azur con tres flores de lis de oro, bastón de gules y bordura de gules (armas de Borbón-Conti)."},
   rentas:"Peajes fluviales sobre el Oise y bosques de caza al norte de París.",
   nota:"Enclave estratégico de los Conti junto a Pontoise, donde estuvo desterrado el Parlamento de París en 1720."},

  // Champaña y Nivernés
  {id:"rethel", prov:"champagne", lon:4.38, lat:49.52, corto:"D. de Rethel-Mazarin", nombre:"Ducado-Paría de Rethel-Mazarin", rango:"Ducado-Paría",
   casa:"Casa de La Porte-Mazarin", clan:"ducal", pid:"paul-jules-mazarin", titular:"Paul-Jules de La Porte, Duque de Rethel-Mazarin",
   escudo:{bg:"#1e3f73",fg:"#e0ba54",acc:"#b82d2d",pat:"mazarin",crown:"ducal",blason:"De azur con segur consular romana de plata rodeada de haces de oro y faja de gules cargada de tres estrellas de oro (Mazarino)."},
   rentas:"Más de treinta parroquias, herrerías y bosques en las Ardenas champañesas en la ruta hacia Reims.",
   nota:"Comprado por el cardenal Mazarino a los Gonzaga-Nevers y rebautizado Ducado-Paría de Mazarin."},
  {id:"joinville", prov:"champagne", lon:5.14, lat:48.44, corto:"P. de Joinville", nombre:"Principado de Joinville", rango:"Principado y Baronía",
   casa:"Casa de Orleans", clan:"orleans", pid:"felipe-ii-orleans", titular:"Felipe II de Orleans, Duque de Orleans y Regente",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#f0eee6",pat:"orleans",crown:"principe",blason:"De azur con tres flores de lis de oro y lambel de tres pendientes de plata en jefe (armas de la Casa de Orleans)."},
   rentas:"Rentas forestales, forjas metalúrgicas y derechos señoriales en la frontera con Lorena.",
   nota:"Antiguo feudo de los Guisa pasado a la Grande Mademoiselle y heredado por el Duque de Orleans."},
  {id:"chateau-thierry", prov:"champagne", lon:3.40, lat:49.05, corto:"D. de Château-Thierry", nombre:"Ducado-Paría de Château-Thierry", rango:"Ducado-Paría",
   casa:"Casa de La Tour d'Auvergne (Bouillon)", clan:"ducal", pid:"emmanuel-theodose-bouillon", titular:"Emmanuel-Théodose de La Tour d'Auvergne, Duque de Bouillon",
   escudo:{bg:"#b02a2a",fg:"#e6e2d6",acc:"#ddb650",pat:"bouillon",crown:"principe",blason:"De gules con faja de plata y torre de oro, cuartelado con el gonfalón de Auvernia y las flores de lis de Albret."},
   rentas:"Viñedos del Marne, peajes fluviales hacia París y bailía ducal entregada a los Bouillon a cambio del principado soberano de Sedán.",
   nota:"Sostén de la Casa de Bouillon, que goza del rango de Príncipes Extranjeros y del cargo de Gran Chambelán de Francia."},
  {id:"reims-paria", prov:"champagne", lon:4.03, lat:49.26, corto:"Arz.-D. de Reims", nombre:"Arzobispado-Ducado de Reims", rango:"Primer Par Eclesiástico de Francia",
   casa:"Casa de Rohan-Guémené (Iglesia)", clan:"ducal", pid:"armand-jules-rohan", titular:"Armand-Jules de Rohan-Guémené, Arzobispo-Duque de Reims",
   escudo:{bg:"#1d3969",fg:"#e0ba54",acc:"#b02a2a",pat:"rohan",crown:"ecles",blason:"Partido de Francia (sembrado de lises con cruz de gules de Reims) y de Rohan (de gules con nueve macles de oro)."},
   rentas:"Más de 80.000 libras de renta anual, señorío temporal sobre Reims y privilegio de consagrar al Rey de Francia.",
   nota:"El 6 de junio de 1722 acaba de ser consagrado el joven Armand-Jules de Rohan para ungir a Luis XV en octubre."},
  {id:"nevers", prov:"nivernais", lon:3.16, lat:46.99, corto:"D. de Nevers", nombre:"Ducado de Nevers y de Donzy", rango:"Ducado Feudal",
   casa:"Casa Mancini-Mazarini", clan:"ducal", pid:"philippe-jules-mancini", titular:"Philippe-Jules-François Mancini, Duque de Nevers",
   escudo:{bg:"#1f3d70",fg:"#e0ba54",acc:"#d9d5c8",pat:"mazarin",crown:"ducal",blason:"De azur con dos peces (lucios) adosados de plata en palo (Mancini) cuartelado con las haces consulares de oro de Mazarino."},
   rentas:"Rentas de fundiciones, bosques, loza de Nevers y peajes sobre el Loira.",
   nota:"Sobrino nieto de Mazarino; gobierna el Nivernés con amplia autonomía señorial."},

  // Normandía y Picardía
  {id:"eu", prov:"normandie", lon:1.42, lat:50.05, corto:"C. de Eu", nombre:"Condado-Paría de Eu", rango:"Condado-Paría",
   casa:"Casa de Borbón-Maine", clan:"maine", pid:"comte-d-eu", titular:"Luis Carlos de Borbón, Conde de Eu (hijo del Duque del Maine)",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"maine",crown:"principe",blason:"De azur con tres flores de lis de oro y barra recortada de gules (armas de los príncipes legitimados de Maine)."},
   rentas:"Puerto de Tréport, bosques de vidrierías y ricas tierras cerealistas en la frontera normando-picarda.",
   nota:"Arrancado a la Grande Mademoiselle para dotar a la Casa de Maine; da título a su hijo segundo, el Conde de Eu."},
  {id:"longueville", prov:"normandie", lon:1.05, lat:49.78, corto:"D. de Longueville", nombre:"Ducado de Longueville", rango:"Ducado en Litigio Sucesorio",
   casa:"Casas de Condé, Conti y Luynes", clan:"conde", pid:"charles-charolais", titular:"Carlos de Borbón-Condé, Conde de Charolais (coheredero)",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#e6e2d6",pat:"orleans",crown:"ducal",blason:"De azur con tres flores de lis de oro, lambel de plata de tres pendientes y bastón de plata (Orleans-Longueville)."},
   rentas:"Diezmos y señoríos en el País de Caux, objeto de los pleitos más enconados en los Parlamentos de Ruan y París.",
   nota:"Extinta la rama de Longueville con Marie de Nemours, sus tierras enfrentan a Condé, Conti y Luynes."},
  {id:"tancarville", prov:"normandie", lon:0.46, lat:49.48, corto:"C. de Tancarville y Évreux", nombre:"Condados de Évreux y de Tancarville", rango:"Condados Normandos",
   casa:"Casa de La Tour d'Auvergne (Évreux)", clan:"ducal", pid:"henri-louis-evreux", titular:"Henri-Louis de La Tour d'Auvergne, Conde de Évreux",
   escudo:{bg:"#b02a2a",fg:"#ddb650",acc:"#e8e4d8",pat:"bouillon",crown:"conde",blason:"De gules con escudete de plata angulado de estrellas de oro (Tancarville) y torre de oro de Auvernia."},
   rentas:"Derechos de barcaje en el estuario del Sena y rentas condales de Évreux.",
   nota:"El Conde de Évreux compró Tancarville y construyó el Hôtel d'Évreux en París con las ganancias fabulosas del Sistema de Law."},
  {id:"harcourt", prov:"normandie", lon:-0.45, lat:49.15, corto:"D. de Harcourt", nombre:"Ducado-Paría de Harcourt (Thury)", rango:"Ducado-Paría (1709)",
   casa:"Casa d'Harcourt", clan:"ducal", pid:"francois-harcourt", titular:"François d'Harcourt, II Duque de Harcourt",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#b02828",pat:"harcourt",crown:"ducal",blason:"De gules con dos fajas de oro (el célebre blasón milenario de los barones y duques normandos de Harcourt)."},
   rentas:"Tierras ganaderas, manzanos y señoríos en la Baja Normandía al sur de Caen.",
   nota:"Su titular es Capitán de los Guardias de Corps del Rey, custodiando en persona las puertas de la alcoba de Luis XV."},
  {id:"chaulnes", prov:"picardie", lon:2.80, lat:49.82, corto:"D. de Chaulnes", nombre:"Ducado-Paría de Chaulnes y Vidamato de Amiens", rango:"Ducado-Paría (1711)",
   casa:"Casa d'Albert d'Ailly de Chaulnes", clan:"ducal", pid:"louis-auguste-chaulnes", titular:"Louis-Auguste d'Albert d'Ailly, Duque de Chaulnes",
   escudo:{bg:"#b02828",fg:"#e8e4d8",acc:"#ddb650",pat:"luynes",crown:"ducal",blason:"De gules con jefe ajedrezado de plata y azur de tres órdenes (Ailly) partido con el león coronado de Albert de Luynes."},
   rentas:"Señoríos cerealistas en el Santerre, baronía de Picquigny y derechos del Vidamato de Amiens.",
   nota:"Manda la prestigiosa compañía de Caballos Ligeros de la Guardia Real en Versalles."},
  {id:"st-simon-feudo", prov:"picardie", lon:3.18, lat:49.70, corto:"D. de Saint-Simon", nombre:"Ducado-Paría de Saint-Simon (Vermandois)", rango:"Ducado-Paría (1635)",
   casa:"Casa de Rouvroy de Saint-Simon", clan:"ducal", pid:"saint-simon", titular:"Louis de Rouvroy, II Duque de Saint-Simon",
   escudo:{bg:"#22252a",fg:"#e8e4d8",acc:"#b82d2d",pat:"stsimon",crown:"ducal",blason:"De sable con cruz de plata cargada de cinco veneras (conchas) de gules (Rouvroy), cuartelado con el jaquelado de oro y azur de Vermandois."},
   rentas:"Señorío de Saint-Simon en Picardía y de La Ferté-Vidame en el Perche, aunque cargado de deudas tras su embajada en Madrid.",
   nota:"Cuna de la paría que obsesiona al memorialista Duque de Saint-Simon."},

  // Bretaña, Poitou, Turena, Berry y Angoumois
  {id:"rohan", prov:"bretagne", lon:-2.95, lat:48.06, corto:"D. de Rohan y Guémené", nombre:"Ducado de Rohan y Principado de Guémené", rango:"Ducado-Paría y Principado",
   casa:"Casa de Rohan", clan:"ducal", pid:"rohan-guemene", titular:"Charles III de Rohan, Príncipe de Guémené y Duque de Montbazon",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",pat:"rohan",crown:"principe",blason:"De gules con nueve macles de oro puestos 3, 3 y 3 (divisa: «Roi ne puis, duc ne daigne, Rohan suis»)."},
   rentas:"Inmensos dominios bretones en Pontivy, Guémené y Léon.",
   nota:"Cabeza primogénita de la Casa de Rohan, que disputa todo precedente a los Duques y Pares ordinarios."},
  {id:"penthievre", prov:"bretagne", lon:-2.35, lat:48.52, corto:"D. de Penthièvre", nombre:"Ducado-Paría de Penthièvre", rango:"Ducado-Paría (1697)",
   casa:"Casa de Borbón-Toulouse", clan:"toulouse", pid:"comte-de-toulouse", titular:"Luis Alejandro de Borbón, Conde de Toulouse y Gobernador de Bretaña",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#f0ede4",pat:"toulouse",crown:"principe",blason:"Armas de Borbón-Toulouse acoladas con el sembrado de armiños de Bretaña."},
   rentas:"Rentas marítimas, almirantazgo y tierras costeras de Saint-Brieuc a Lamballe.",
   nota:"Base territorial del Conde de Toulouse como Gobernador General de Bretaña."},
  {id:"vitre", prov:"bretagne", lon:-1.21, lat:48.12, corto:"B. de Vitré / Thouars", nombre:"Baronía de Vitré y Ducado de Thouars", rango:"Ducado-Paría y Primera Baronía",
   casa:"Casa de La Trémoille", clan:"ducal", pid:"la-tremoille", titular:"Charles-Armand-René, Duque de La Trémoille y de Thouars",
   escudo:{bg:"#e0ba54",fg:"#b02828",acc:"#1f3a68",pat:"tremoille",crown:"ducal",blason:"De oro con cabrio de gules acompañado de tres águilas de azur picadas y membradas de gules (La Trémoille)."},
   rentas:"Comercio de lienzos de Vitré y vasto ducado de Thouars en el Poitou.",
   nota:"Da derecho a presidir la nobleza en los Estados de Bretaña alternando con los Rohan."},
  {id:"soubise", prov:"poitou", lon:-0.65, lat:46.25, corto:"D. de Rohan-Rohan (Frontenay)", nombre:"Ducado-Paría de Rohan-Rohan y Principado de Soubise", rango:"Ducado-Paría (1714)",
   casa:"Casa de Rohan-Soubise", clan:"ducal", pid:"hercule-meriadec-rohan", titular:"Hercule-Mériadec de Rohan, Duque de Rohan-Rohan y Príncipe de Soubise",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#e8e4d8",pat:"rohan",crown:"principe",blason:"Partido de Bretaña (armiños) y de Rohan (de gules con nueve macles de oro)."},
   rentas:"Señoríos de Frontenay en Poitou y Soubise en Saintonge, unidos al Gobierno de Champaña.",
   nota:"Hermano mayor del Cardenal de Rohan y yerno de Madame de Ventadour."},
  {id:"mortemart", prov:"limousin", lon:0.96, lat:46.04, corto:"D. de Mortemart", nombre:"Ducado-Paría de Mortemart", rango:"Ducado-Paría (1650)",
   casa:"Casa de Rochechouart de Mortemart", clan:"ducal", pid:"louis-mortemart", titular:"Louis II de Rochechouart, IV Duque de Mortemart",
   escudo:{bg:"#e8e4d8",fg:"#b02828",acc:"#ddb650",pat:"mortemart",crown:"ducal",blason:"Ondado de plata y de gules de seis piezas en faja (el antiquísimo blasón de los Rochechouart-Mortemart, casa de Mme de Montespan)."},
   rentas:"Tierras señoriales en el alto Poitou, la Marche y el Lemosín, más el principado de Tonnay-Charente.",
   nota:"Su titular es Primer Gentilhombre de la Cámara del Rey Luis XV."},
  {id:"la-rochefoucauld", prov:"saintonge", lon:0.38, lat:45.74, corto:"D. de La Rochefoucauld", nombre:"Ducado-Paría de La Rochefoucauld", rango:"Ducado-Paría (1622)",
   casa:"Casa de La Rochefoucauld", clan:"ducal", pid:"francois-la-rochefoucauld", titular:"François VIII, IV Duque de La Rochefoucauld",
   escudo:{bg:"#1f3a68",fg:"#e8e4d8",acc:"#b02828",pat:"larochefoucauld",crown:"ducal",blason:"Fajado de diez piezas de plata y azur, con tres cabrios de gules brochantes sobre el todo, el primero despuntado."},
   rentas:"Señoríos en Angoumois y Saintonge, sumados al ducado de La Roche-Guyon sobre el Sena.",
   nota:"El Duque de La Rochefoucauld es Gran Montero de Francia y Maestro del Guardarropa de Luis XV."},
  {id:"orleans-ap", prov:"orleanais", lon:1.90, lat:47.90, corto:"Apanaje de Orleans y Chartres", nombre:"Ducados de Orleans, Chartres y Blois (Gran Apanaje)", rango:"Primer Apanaje de la Sangre",
   casa:"Casa de Orleans", clan:"orleans", pid:"luis-orleans-chartres", titular:"Luis de Orleans, Duque de Chartres (heredero del Regente)",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#f0ede4",pat:"orleans",crown:"principe",blason:"De azur con tres flores de lis de oro y lambel de plata de tres pendientes (Casa Ducal de Orleans)."},
   rentas:"Peajes del Loira, bosques de Orleans, trigales de Beauce y canal de Orleans; más de 600.000 libras anuales.",
   nota:"Corazón territorial de la Casa de Orleans; da su título al joven Duque de Chartres, hijo único varón del Regente."},
  {id:"saint-aignan", prov:"berry", lon:1.37, lat:47.26, corto:"D. de Saint-Aignan", nombre:"Ducado-Paría de Saint-Aignan", rango:"Ducado-Paría (1663)",
   casa:"Casa de Beauvilliers", clan:"ducal", pid:"paul-hippolyte-st-aignan", titular:"Paul-Hippolyte de Beauvilliers, Duque de Saint-Aignan",
   escudo:{bg:"#e8e4d8",fg:"#2d6a3e",acc:"#b02828",pat:"harcourt",crown:"ducal",blason:"Fajado de plata y de sinople de seis piezas, las fajas de plata cargadas de seis merletas de gules (Beauvilliers)."},
   rentas:"Viñedos del Cher, tierras en Berry y Turena y gobierno de El Havre.",
   nota:"Hermano del difunto Duque de Beauvilliers (gobernador del padre de Luis XV) y miembro del Consejo de Regencia."},
  {id:"charost", prov:"berry", lon:2.10, lat:46.99, corto:"D. de Charost", nombre:"Ducado-Paría de Charost", rango:"Ducado-Paría (1672)",
   casa:"Casa de Béthune-Charost", clan:"ducal", pid:"charost", titular:"Armand de Béthune, II Duque de Charost",
   escudo:{bg:"#e8e4d8",fg:"#b02828",acc:"#ddb650",pat:"harcourt",crown:"ducal",blason:"De plata con faja de gules (el histórico escudo de la Casa de Béthune, duques de Sully y de Charost)."},
   rentas:"Señoríos en el Berry y baronía de Ancenis en Bretaña.",
   nota:"Elegido en secreto por el Regente y el Cardenal Dubois para sustituir al Mariscal de Villeroy como Gobernador de Luis XV en agosto de 1722."},

  // Borgoña, Lionesado y Provenza
  {id:"borbon-conde-gob", prov:"bourgogne", lon:4.85, lat:47.20, corto:"Gob. de Borgoña y Charolais", nombre:"Gobierno de Borgoña y Condado de Charolais", rango:"Gobierno Perpetuo y Condado",
   casa:"Casa de Borbón-Condé", clan:"conde", pid:"luis-enrique-borbon", titular:"Luis Enrique de Borbón-Condé, «Monsieur le Duc»",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conde",crown:"principe",blason:"Armas de Borbón-Condé acoladas con el bandado de oro y azur con bordura de gules del Ducado de Borgoña."},
   rentas:"Pensiones de los Estados de Borgoña, viñedos de la Côte-d'Or y forjas del Charolais.",
   nota:"Feudo político inexpugnable de los Condé desde tiempos del Gran Condé."},
  {id:"dombes-feudo", prov:"dombes", lon:4.95, lat:46.00, corto:"P. Soberano de Dombes", nombre:"Principado Soberano de Dombes", rango:"Principado Soberano",
   casa:"Casa de Borbón-Maine", clan:"maine", pid:"duc-du-maine", titular:"Luis Augusto de Borbón, Duque del Maine y Príncipe de Dombes",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"maine",crown:"principe",blason:"De azur con tres flores de lis de oro y barra recortada de gules (Príncipes Soberanos de Dombes)."},
   rentas:"Impuestos soberanos, acuñación de moneda y privilegios de imprenta libre en Trévoux.",
   nota:"Único territorio donde el Duque del Maine reina como soberano independiente; su hijo primogénito lleva el título de Príncipe de Dombes."},
  {id:"villars-prov", prov:"provence", lon:5.45, lat:43.55, corto:"Gob. de Provenza (Villars)", nombre:"Gobierno de Provenza y Marquesado de Les Baux", rango:"Gobierno General y Ducado",
   casa:"Casa de Villars", clan:"ducal", pid:"villars", titular:"Claude-Louis-Hector, Duque y Mariscal de Villars",
   escudo:{bg:"#e0ba54",fg:"#b02828",acc:"#1f3a68",pat:"villars",crown:"ducal",blason:"De oro con tres cabrios de gules y jefe de azur cargado de un león pasante de plata (Duque y Mariscal de Villars)."},
   rentas:"Emolumentos del Gobierno de Provenza unidos al Ducado-Paría de Villars (Vaux-le-Vicomte en Brie).",
   nota:"El glorioso vencedor de Denain representa a Provenza en el Consejo de Regencia mientras la provincia sale de la Gran Peste."},

  // Languedoc y Guyena
  {id:"ales-pezenas", prov:"languedoc", lon:3.65, lat:43.82, corto:"C. de Alès y Pézenas", nombre:"Condado de Alès y Baronías de Pézenas y Bagnols", rango:"Condado y Baronías",
   casa:"Casa de Borbón-Conti", clan:"conti", pid:"louis-armand-conti", titular:"Luis Armando II de Borbón, Príncipe de Conti",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conti",crown:"principe",blason:"De azur con tres flores de lis de oro, bastón de gules y bordura de gules (Borbón-Conti)."},
   rentas:"Minas de las Cévennes, ferias pañeras de Pézenas y rentas señoriales en el Bajo Languedoc.",
   nota:"Otorga a la Casa de Conti una poderosa clientela propia en los Estados de Languedoc."},
  {id:"uzes", prov:"languedoc", lon:4.42, lat:44.08, corto:"D. de Uzès (1er Par)", nombre:"Ducado-Paría de Uzès", rango:"Primer Ducado-Paría Laico de Francia",
   casa:"Casa de Crussol d'Uzès", clan:"ducal", pid:"jean-charles-uzes", titular:"Jean-Charles de Crussol, VII Duque de Uzès",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#1f3a68",pat:"uzes",crown:"ducal",blason:"Cuartelado: 1 y 4 fajado de oro y de sinople (Crussol); 2 y 3 de oro con tres cabrios de gules (Lévis); sobre el todo de gules con tres bandas de oro (Uzès)."},
   rentas:"Señoríos en el Gard y las Cévennes, con precedencia sobre todos los duques del Reino.",
   nota:"Por antigüedad de creación (1572), el Duque de Uzès camina el primero de todos los Pares laicos en la Consagración de Reims."},
  {id:"baronias-lang", prov:"languedoc", lon:2.35, lat:43.45, corto:"M. de Castries y Baronías", nombre:"Marquesado de Castries y Baronías de los Estados de Languedoc", rango:"Marquesado y Baronía de Estados",
   casa:"Casa de La Croix de Castries", clan:"ducal", pid:"joseph-castries", titular:"Joseph-François de La Croix, Marqués de Castries",
   escudo:{bg:"#1f3a68",fg:"#e0ba54",acc:"#1f3a68",pat:"castries",crown:"conde",blason:"De azur con cruz de oro (el célebre blasón parlante de los La Croix, marqueses de Castries y barones del Languedoc)."},
   rentas:"Derecho de asiento y voto en los Estados de Languedoc en Montpellier y gobierno del puerto de Sète.",
   nota:"El Marqués de Castries enlaza la corte del Palais-Royal (como caballero de honor de Mme d'Orléans) con la nobleza languedociana."},
  {id:"turenne", prov:"guyenne", lon:1.62, lat:44.96, corto:"V. de Turenne", nombre:"Vizcondado Soberano de Turenne y Ducado de Albret", rango:"Vizcondado Cuasi-Soberano y Ducado-Paría",
   casa:"Casa de La Tour d'Auvergne (Bouillon)", clan:"ducal", pid:"emmanuel-theodose-bouillon", titular:"Emmanuel-Théodose de La Tour d'Auvergne, Duque de Bouillon",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#e8e4d8",pat:"bouillon",crown:"principe",blason:"Cotizado de oro y de gules (Vizcondado de Turenne) cuartelado con las armas de Bouillon y de Albret."},
   rentas:"Más de cien parroquias entre el Quercy y el Lemosín exentas de la talla real, que votan sus propios impuestos.",
   nota:"Un auténtico Estado dentro del Estado en manos de la Casa de Bouillon."},
  {id:"fronsac", prov:"guyenne", lon:-0.25, lat:44.95, corto:"D. de Fronsac y Richelieu", nombre:"Ducado-Paría de Fronsac y de Richelieu", rango:"Ducado-Paría",
   casa:"Casa de Vignerot du Plessis de Richelieu", clan:"ducal", pid:"armand-richelieu", titular:"Louis-François-Armand, III Duque de Richelieu y de Fronsac",
   escudo:{bg:"#f0ede4",fg:"#b02828",acc:"#ddb650",pat:"richelieu",crown:"ducal",blason:"De plata con tres cabrios de gules (las armas inmortales del Gran Cardenal-Duque de Richelieu)."},
   rentas:"Viñedos bordeleses, peajes sobre el Dordoña y rentas ducales de Richelieu en Poitou.",
   nota:"Feudo del joven e incorregible Duque de Richelieu, ídolo de las damas de la corte y recién salido de la Bastilla."},
  {id:"antin", prov:"guyenne", lon:0.25, lat:43.33, corto:"D. de Antin y Montespan", nombre:"Ducado-Paría de Antin y Marquesado de Montespan", rango:"Ducado-Paría (1711)",
   casa:"Casa de Pardaillan de Gondrin", clan:"ducal", pid:"antin", titular:"Louis-Antoine de Pardaillan de Gondrin, I Duque de Antin",
   escudo:{bg:"#e8e4d8",fg:"#1f3a68",acc:"#b02828",pat:"antin",crown:"ducal",blason:"De plata con tres fajas ondadas de azur (Pardaillan) cuartelado con el castillo de oro sobre gules de Antin."},
   rentas:"Señoríos gascones y pirenaicos en Bigorra, unidos a la Surintendencia de los Edificios del Rey.",
   nota:"Hijo legítimo de Madame de Montespan y medio hermano de la Duquesa de Orleans, del Duque del Maine y del Conde de Toulouse."},
  {id:"gramont", prov:"bearn", lon:-1.14, lat:43.48, corto:"D. de Gramont y Bidache", nombre:"Ducado-Paría de Gramont y Soberanía de Bidache", rango:"Ducado-Paría y Principado Soberano",
   casa:"Casa de Gramont", clan:"ducal", pid:"antoine-gramont", titular:"Antoine V de Gramont, Duque de Gramont y de Guiche",
   escudo:{bg:"#e0ba54",fg:"#1f3a68",acc:"#b02828",pat:"gramont",crown:"ducal",blason:"De oro con león rampante de azur armado y lampasado de gules (Gramont), partido de gules con tres flechas de oro."},
   rentas:"Peajes pirenaicos, soberanía de Bidache y gobiernos hereditarios de Navarra, Bearn y Bayona.",
   nota:"Guardián militar de la frontera española por donde acaba de entrar en Francia la infanta Mariana Victoria."}
];

/* ---------- 2. MAPA DE LOS 13 PARLAMENTOS (Con sus emblemas judiciales y Primeros Presidentes) ---------- */
const PARLAMENTOS_LIST = [
  {id:"paris", n:"Parlamento de París", corto:"Parl. de París", sede:[2.35,48.86], color:[168,54,54],
   pid:"jean-antoine-mesmes", titular:"Jean-Antoine de Mesmes, Conde d'Avaux", cargo:"Primer Presidente del Parlamento de París",
   emblema:{bg:"#1b3668",fg:"#e0ba54",acc:"#a83636",pat:"parl-paris",lema:"«Justitia et Pax osculatae sunt» · Gran Cámara de San Luis"},
   ressort:"Cubre casi la mitad del Reino: Île-de-France, Orleanesado, Champaña, Picardía, Anjou, Maine, Turena, Berry, Nivernés, Borbonés, Auvernia, Lionesado, Poitou, Aunis y La Marche.",
   actitud:"Galicano ardiente, enemigo mortal del Cardenal Dubois y del Sistema de Law. Regresa humillado de su destierro en Pontoise (1720), pero sigue siendo el único tribunal donde se sientan los Duques y Pares.",
   uso:"Imprescindible para registrar edictos reales, casar testamentos regios (como en 1715), juzgar a un Par de Francia o dirimir pleitos sucesorios de las grandes casas."},
  {id:"toulouse", n:"Parlamento de Toulouse", corto:"Parl. de Toulouse", sede:[1.44,43.60], color:[186,88,48],
   pid:"francois-berty", titular:"François de Bertier de Montrabe", cargo:"Primer Presidente del Parlamento de Toulouse",
   emblema:{bg:"#a82a2a",fg:"#e0ba54",acc:"#f0ede4",pat:"parl-toulouse",lema:"Cruz pometeada de oro de Toulouse · Derecho Romano Escrito"},
   ressort:"Languedoc, Quercy, Rouergue, Condado de Foix y parte oriental de Gascuña.",
   actitud:"Segundo parlamento de Francia por antigüedad (1443). Rigorista en derecho romano escrito y severísimo contra los protestantes de las Cévennes.",
   uso:"Jurisdicción clave para los señoríos de Conti, Uzès y Castries y los pleitos con los Estados de Languedoc."},
  {id:"rouen", n:"Parlamento de Normandía (Ruan)", corto:"Parl. de Ruan", sede:[1.09,49.44], color:[54,108,168],
   pid:"nicolas-pontcarre", titular:"Nicolas-Pierre Camus de Pontcarré", cargo:"Primer Presidente del Parlamento de Ruan",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#1f3a68",pat:"parl-rouen",lema:"Dos leopardos de oro sobre gules · Antiguo Échiquier de Normandía"},
   ressort:"Toda la provincia de Alta y Baja Normandía.",
   actitud:"Defensor celoso de la Coutume de Normandie y la Charte aux Normands; hostil a los impuestos extraordinarios de París.",
   uso:"Decide todos los litigios de los condados normandos (Eu, Longueville, Tancarville, Évreux, Harcourt) y del comercio marítimo del Canal."},
  {id:"bordeaux", n:"Parlamento de Burdeos", corto:"Parl. de Burdeos", sede:[-0.57,44.84], color:[138,68,148],
   pid:"joseph-gillet-lacaze", titular:"Joseph de Gillet, Marqués de La Caze", cargo:"Primer Presidente del Parlamento de Burdeos",
   emblema:{bg:"#7a2244",fg:"#e0ba54",acc:"#1f3a68",pat:"parl-bordeaux",lema:"Creciente de plata y leopardo de oro de Aquitania"},
   ressort:"Guyena, Gascuña occidental, Saintonge y Lemosín.",
   actitud:"Orgullosa nobleza de toga vinícola y mercantil; recelosa de los intendentes reales y de las aduanas interiores.",
   uso:"Tribunal de apelación para los feudos de Richelieu (Fronsac), Bouillon (Turenne), Antin y Saint-Simon (Blaye)."},
  {id:"rennes", n:"Parlamento de Bretaña (Rennes)", corto:"Parl. de Rennes", sede:[-1.68,48.11], color:[48,136,124],
   pid:"pierre-brilhac", titular:"Pierre de Brilhac de Nouzières", cargo:"Primer Presidente del Parlamento de Bretaña",
   emblema:{bg:"#1f3a68",fg:"#f0ede4",acc:"#e0ba54",pat:"parl-rennes",lema:"Sembrado de armiños de Bretaña · «Potius mori quam foedari»"},
   ressort:"Todo el Ducado y Gobierno de Bretaña.",
   actitud:"Conmocionado por la represión de la Conspiración de Pontcallec (1720) y por el gran incendio de Rennes de diciembre de 1720.",
   uso:"Vital en los conflictos entre los Estados de Bretaña, el gobernador (Conde de Toulouse) y los feudos de Rohan y La Trémoille."},
  {id:"dijon", n:"Parlamento de Borgoña (Dijon)", corto:"Parl. de Dijon", sede:[5.04,47.32], color:[168,128,44],
   pid:"philippe-berbisey", titular:"Jean de Berbisey", cargo:"Primer Presidente del Parlamento de Dijon",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",pat:"parl-dijon",lema:"Bandado de oro y de azur de seis piezas con bordura de gules"},
   ressort:"Ducado de Borgoña, Bresse, Bugey, Valromey y País de Gex.",
   actitud:"Rica dinastía de magistrados eruditos muy vinculada a la Casa de Borbón-Condé, gobernadores perpetuos de la provincia.",
   uso:"Controla los registros fiscales de una provincia de Estados controlada por Monsieur le Duc."},
  {id:"grenoble", n:"Parlamento del Delfinado (Grenoble)", corto:"Parl. de Grenoble", sede:[5.72,45.19], color:[76,138,76],
   pid:"pierre-grammont", titular:"Pierre-Joseph de Grammont de Montferrand", cargo:"Primer Presidente del Parlamento de Grenoble",
   emblema:{bg:"#e0ba54",fg:"#1f3a68",acc:"#b02828",pat:"parl-grenoble",lema:"Delfín de azur crestado de gules sobre oro · Estatuto Delfinés"},
   ressort:"Todo el Delfinado y el Principado de Orange.",
   actitud:"En ausencia del Gobernador (el Duque de Chartres), el Primer Presidente ejerce por fuero histórico el mando militar y civil de la provincia.",
   uso:"Vigila la frontera con el Reino de Cerdeña-Piamonte (Saboya) y los pasos alpinos."},
  {id:"aix", n:"Parlamento de Provenza (Aix)", corto:"Parl. de Aix", sede:[5.45,43.53], color:[190,110,70],
   pid:"cardin-lebret", titular:"Cardin Le Bret, Conde de Selles", cargo:"Primer Presidente del Parlamento de Aix e Intendente de Provenza",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",pat:"parl-aix",lema:"Flor de lis de oro bajo lambel de tres pendientes de gules de Anjou-Provenza"},
   ressort:"Condado de Provenza, Marsella, Arlés y tierras adyacentes.",
   actitud:"Acaba de salir del bloqueo sanitario por la Gran Peste de Marsella y Aix (1720-1722); su Primer Presidente es a la vez Intendente Real.",
   uso:"Arbitra los pleitos marítimos con Levante y las disputas entre el obispo aceptante de Marsella (Belsunce) y el apelante de Senez (Soanen)."},
  {id:"pau", n:"Parlamento de Navarra (Pau)", corto:"Parl. de Pau", sede:[-0.37,43.30], color:[142,96,72],
   pid:"charles-fenellon-pau", titular:"Gui de Fenoyl", cargo:"Primer Presidente del Parlamento de Navarra en Pau",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",pat:"parl-pau",lema:"Cadenas de oro de Navarra y dos vacas de gules de Bearn"},
   ressort:"Reino de Baja Navarra, Vizcondado de Bearn y país de Soule.",
   actitud:"Guardián de los Fors de Béarn y de la corona separada de Navarra («Rey de Francia y de Navarra»).",
   uso:"Jurisdicción fronteriza con España estrechamente ligada al Duque de Gramont."},
  {id:"metz", n:"Parlamento de Metz", corto:"Parl. de Metz", sede:[6.18,49.12], color:[92,118,154],
   pid:"charles-antoine-metz", titular:"Pierre de Chasot de Congy", cargo:"Primer Presidente del Parlamento de Metz",
   emblema:{bg:"#22252a",fg:"#f0ede4",acc:"#e0ba54",pat:"parl-metz",lema:"Partido de sable y de plata (Ciudad Imperial y Obispado de Metz)"},
   ressort:"Los Tres Obispados (Metz, Toul y Verdún) y el Principado de Sedán.",
   actitud:"Corte estratégica de juristas expertos en derecho feudal germánico frente a los enclaves del Ducado soberano de Lorena.",
   uso:"Resuelve los litigios fronterizos con el Duque Leopoldo de Lorena (cuñado del Regente)."},
  {id:"douai", n:"Parlamento de Flandes (Douai)", corto:"Parl. de Douai", sede:[3.08,50.37], color:[156,112,58],
   pid:"charles-pollinchove", titular:"Charles-Joseph de Pollinchove", cargo:"Primer Presidente del Parlamento de Flandes",
   emblema:{bg:"#e0ba54",fg:"#22252a",acc:"#b02828",pat:"parl-douai",lema:"León rampante de sable sobre campo de oro de Flandes"},
   ressort:"Flandes francés (Lille, Douai, Dunkerque), Henao (Valenciennes) y Cambrésis (Cambrai).",
   actitud:"Leal a la Corona pero celoso de las costumbres flamencas capituladas con Luis XIV.",
   uso:"Cubre también el Arzobispado de Cambrai, sede titular del todopoderoso Cardenal Dubois."},
  {id:"besancon", n:"Parlamento de Besançon", corto:"Parl. de Besançon", sede:[6.02,47.24], color:[84,132,148],
   pid:"jobelot-montureux", titular:"Jean-Ferdinand Jobelot de Montureux", cargo:"Primer Presidente del Parlamento de Besançon",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#f0ede4",pat:"parl-besancon",lema:"Sembrado de billetes de oro con león rampante coronado del Franco Condado"},
   ressort:"Todo el Franco Condado de Borgoña.",
   actitud:"Antiguo parlamento hispano-borgoñón trasladado de Dole a Besançon; conserva tradiciones jurídicas de origen imperial.",
   uso:"Controla los feudos comtois y la frontera con los cantones suizos y el condado de Montbéliard."},
  {id:"colmar", n:"Consejo Soberano de Alsacia (Colmar)", corto:"C. Sob. de Colmar", sede:[7.36,48.08], color:[98,148,92],
   pid:"nicolas-corberon", titular:"Nicolas de Corberon, Marqués de Torvilliers", cargo:"Primer Presidente del Consejo Soberano de Alsacia",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",pat:"parl-colmar",lema:"Banda de plata bordada de encaje de oro con seis coronas de Alsacia"},
   ressort:"Alta y Baja Alsacia, Sundgau, Belfort y la Decápolis.",
   actitud:"Tribunal bilingüe (francés y alemán) que aplica las estipulaciones de los Tratados de Westfalia y Ryswick.",
   uso:"Jurisdicción secular que convive en Alsacia con el inmenso poder temporal del Cardenal-Príncipe de Rohan en Estrasburgo."}
];

const PROV_PARL = {
  "ile-de-france":"paris","picardie":"paris","champagne":"paris","maine":"paris","anjou":"paris",
  "touraine":"paris","orleanais":"paris","berry":"paris","nivernais":"paris","poitou":"paris",
  "aunis":"paris","marche":"paris","bourbonnais":"paris","auvergne":"paris","lyonnais":"paris","artois":"paris",
  "normandie":"rouen","bretagne":"rennes","flandre":"douai","trois-eveches":"metz","alsace":"colmar",
  "franche-comte":"besancon","bourgogne":"dijon","dauphine":"grenoble","provence":"aix",
  "languedoc":"toulouse","foix":"toulouse","roussillon":"toulouse",
  "guyenne":"bordeaux","saintonge":"bordeaux","limousin":"bordeaux","bearn":"pau","dombes":"dijon"
};

/* ---------- 3. MAPA DE LAS DIÓCESIS (Con sus emblemas episcopales/cardenalicios y su Obispo/Arzobispo) ---------- */
const DIOCESIS_PARTIDOS = {
  apelante:  {n:"Bastión Apelante (Jansenista / Galicano)", color:[58,118,176],
              desc:"Diócesis cuyos prelados y cabildos rechazan o apelan la bula papal Unigenitus ante un Concilio General, defendiendo las libertades galicanas."},
  aceptante: {n:"Bastión Aceptante (Ultramontano / Constitución)", color:[186,122,44],
              desc:"Diócesis fieles a Roma, a los jesuitas y al Cardenal Dubois, que exigen la sumisión sin reservas a la bula Unigenitus como ley del Reino."},
  moderado:  {n:"Sedes Moderadas o Regalianas (Partido del Silencio)", color:[112,148,108],
              desc:"Diócesis que acatan la declaración de silencio de 1720 del Regente para evitar un cisma abierto en la Iglesia de Francia."}
};

const DIOCESIS_LIST = [
  {id:"dioc-paris", n:"Arzobispado de París (Ducado de Saint-Cloud)", corto:"Arz. de París", lon:2.35, lat:48.86,
   partido:"apelante", galero:"cardenal", par:true, pid:"louis-antoine-noailles",
   titular:"Cardenal Louis-Antoine de Noailles", cargo:"Arzobispo de París, Duque de Saint-Cloud y Par de Francia",
   emblema:{bg:"#a82828",fg:"#e0ba54",acc:"#1f3a68",galero:"cardenal",pat:"noailles",lema:"Capelo cardenalicio de 30 borlas · Banda de oro sobre gules (Noailles)"},
   rentas:"Más de 120.000 libras anuales y el Ducado-Paría de Saint-Cloud.",
   nota:"Corazón de la resistencia galicana: el Cardenal de Noailles cuenta con el fervor de los párrocos de París, la Sorbona y el Parlamento frente a las presiones de Dubois."},
  {id:"dioc-reims", n:"Arzobispado-Ducado de Reims", corto:"Arz.-D. de Reims", lon:4.03, lat:49.26,
   partido:"aceptante", galero:"arzobispo", par:true, pid:"armand-jules-rohan",
   titular:"Armand-Jules de Rohan-Guémené", cargo:"Arzobispo-Duque de Reims, Primer Par Eclesiástico de Francia",
   emblema:{bg:"#1c386b",fg:"#e0ba54",acc:"#b02828",galero:"arzobispo",pat:"rohan",lema:"Manto ducal, cruz arzobispal de doble travesaño y macles de oro de Rohan"},
   rentas:"80.000 libras de renta y primacía sobre todos los Pares de Francia.",
   nota:"Sede de la Santa Ampolla. Consagrado el 6 de junio de 1722 para garantizar que un prelado aceptante de la Casa de Rohan corone a Luis XV el 25 de octubre."},
  {id:"dioc-cambrai", n:"Arzobispado-Ducado de Cambrai", corto:"Arz. de Cambrai", lon:3.23, lat:50.18,
   partido:"aceptante", galero:"cardenal", par:false, pid:"dubois",
   titular:"Cardenal Guillaume Dubois", cargo:"Arzobispo de Cambrai, Príncipe del Sacro Imperio y Primer Ministro de facto",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"cardenal",pat:"lis",lema:"Capelo rojo cardenalicio (1721) · Silla del antiguo Fénelon"},
   rentas:"Más de 150.000 libras anuales sumadas a siete grandes abadías comendatarias (más de un millón de libras en total).",
   nota:"Ordenado en una sola mañana de 1720 para recibir la riquísima sede de Cambrai; forzó el registro de la bula Unigenitus a cambio de su capelo romano."},
  {id:"dioc-estrasburgo", n:"Principado-Obispado de Estrasburgo", corto:"Ob. de Estrasburgo", lon:7.75, lat:48.58,
   partido:"aceptante", galero:"cardenal", par:false, pid:"cardenal-rohan",
   titular:"Cardenal Armand-Gaston-Maximilien de Rohan", cargo:"Príncipe-Obispo de Estrasburgo y Gran Limosnero de Francia",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",galero:"cardenal",pat:"rohan",lema:"Capelo cardenalicio, banda de plata de Estrasburgo y nueve macles de Rohan"},
   rentas:"Más de 400.000 libras de renta entre el Principado-Obispado del Rin y la Abadía de Saint-Vaast.",
   nota:"El prelado más magnífico y poderoso de Versalles; como Gran Limosnero dirige la Capilla Real y lidera el partido aceptante en el Consejo de Conciencia."},
  {id:"dioc-meaux", n:"Obispado de Meaux", corto:"Ob. de Meaux", lon:2.88, lat:48.96,
   partido:"aceptante", galero:"cardenal", par:false, pid:"henri-thiard-bissy",
   titular:"Cardenal Henri-Pons de Thiard de Bissy", cargo:"Cardenal y Obispo de Meaux, Abad de Saint-Germain-des-Prés",
   emblema:{bg:"#e0ba54",fg:"#1f3a68",acc:"#b02828",galero:"cardenal",pat:"castries",lema:"Capelo cardenalicio · Tres cangrejos de gules sobre oro (Thiard de Bissy)"},
   rentas:"Obispado de Meaux en Brie y las rentas inmensas de la Abadía Real de Saint-Germain-des-Prés en París.",
   nota:"Sucesor del gran Bossuet en Meaux y martillo implacable de Roma contra los jansenistas y contra el Cardenal de Noailles."},
  {id:"dioc-rouen", n:"Arzobispado de Ruan (Primado de Normandía)", corto:"Arz. de Ruan", lon:1.09, lat:49.44,
   partido:"moderado", galero:"arzobispo", par:false, pid:"claude-st-georges-rouen",
   titular:"Louis de La Vergne de Tressan", cargo:"Arzobispo de Ruan, Primado de Normandía y Primer Limosnero del Regente",
   emblema:{bg:"#1f3a68",fg:"#f0ede4",acc:"#e0ba54",galero:"arzobispo",pat:"villeroy",lema:"Galero arzobispal de 20 borlas verdes · Cordero pascual de Ruan"},
   rentas:"80.000 libras de renta y el espléndido palacio renacentista de Gaillon en Normandía.",
   nota:"Limosnero favorito del Regente; premiado con la sede primada de Normandía tras prestarse a consagrar obispo a Dubois."},
  {id:"dioc-lyon", n:"Arzobispado de Lyon (Primado de las Galias)", corto:"Arz. de Lyon", lon:4.83, lat:45.76,
   partido:"moderado", galero:"arzobispo", par:false, pid:"francois-paul-neufville",
   titular:"François-Paul de Neufville de Villeroy", cargo:"Arzobispo y Conde de Lyon, Primado de las Galias",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"arzobispo",pat:"villeroy",lema:"Primado de las Galias · Cabrio de oro y cruces ancoradas de Villeroy"},
   rentas:"70.000 libras del Arzobispado de Lyon y de la gran Abadía normanda de Fécamp.",
   nota:"Hijo segundo del Mariscal de Villeroy; gracias a él, la familia Villeroy domina tanto el gobierno militar como la mitra primada de Lyon."},
  {id:"dioc-vienne", n:"Arzobispado de Vienne y Abadía de Cluny", corto:"Arz. de Vienne", lon:4.87, lat:45.52,
   partido:"aceptante", galero:"arzobispo", par:false, pid:"henri-oswald-auvergne",
   titular:"Henri-Oswald de La Tour d'Auvergne", cargo:"Arzobispo y Conde de Vienne, Abad General de Cluny",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",galero:"arzobispo",pat:"bouillon",lema:"Primado de los Primados · Llaves cruzadas de Cluny y torre de Bouillon"},
   rentas:"Más de 100.000 libras sumando la metrópoli del Delfinado y la Abadía madre de Cluny en Borgoña.",
   nota:"Primo del Duque de Bouillon; corteja asiduamente a Dubois y a los Rohan para obtener el capelo de cardenal."},
  {id:"dioc-bordeaux", n:"Arzobispado de Burdeos (Primado de Aquitania)", corto:"Arz. de Burdeos", lon:-0.57, lat:44.84,
   partido:"moderado", galero:"arzobispo", par:false, pid:"francois-elie-voyer-argenson",
   titular:"François-Élie de Voyer de Paulmy d'Argenson", cargo:"Arzobispo de Burdeos y Primado de Aquitania",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"arzobispo",pat:"luynes",lema:"León de San Marcos de Venecia y leopardos de oro de Paulmy d'Argenson"},
   rentas:"65.000 libras de renta sobre los diezmos de Guyena y el Médoc.",
   nota:"Hermano del difunto Guarda de los Sellos Marc-René d'Argenson; mantiene la paz religiosa en Aquitania siguiendo las órdenes del Regente."},
  {id:"dioc-narbonne", n:"Arzobispado de Narbona", corto:"Arz. de Narbona", lon:3.00, lat:43.18,
   partido:"moderado", galero:"arzobispo", par:false, pid:"rene-francois-beaupoil",
   titular:"René-François de Beauvau du Rivau", cargo:"Arzobispo y Primado de Narbona, Presidente de los Estados de Languedoc",
   emblema:{bg:"#f0ede4",fg:"#b02828",acc:"#e0ba54",galero:"arzobispo",pat:"tremoille",lema:"Cuatro leones rampantes de gules armados y coronados de oro (Beauvau)"},
   rentas:"110.000 libras anuales y presidencia nata de los Estados Generales del Languedoc.",
   nota:"Verdadero virrey civil y fiscal del Mediodía; negocia cada año en Montpellier los millones que la provincia entrega al Tesoro Real."},
  {id:"dioc-montpellier", n:"Obispado de Montpellier", corto:"Ob. de Montpellier", lon:3.87, lat:43.61,
   partido:"apelante", galero:"obispo", par:false, pid:"charles-joachim-colbert",
   titular:"Charles-Joachim Colbert de Croissy", cargo:"Obispo de Montpellier y Conde de Melgueil",
   emblema:{bg:"#e0ba54",fg:"#1f3a68",acc:"#2d6a3e",galero:"obispo",pat:"antin",lema:"Sierpe (víbora) ondulante de azur en palo sobre campo de oro (Colbert)"},
   rentas:"35.000 libras de renta y autoridad sobre la célebre Universidad de Montpellier.",
   nota:"Sobrino del gran Colbert y uno de los Cuatro Obispos Apelantes de 1717; su Catecismo jansenista desafía abiertamente a Roma."},
  {id:"dioc-senez", n:"Obispado de Senez", corto:"Ob. de Senez", lon:6.41, lat:43.91,
   partido:"apelante", galero:"obispo", par:false, pid:"jean-soanen",
   titular:"Jean Soanen", cargo:"Obispo y Señor de Senez · Decano de los Cuatro Obispos Apelantes",
   emblema:{bg:"#1f3a68",fg:"#f0ede4",acc:"#e0ba54",galero:"obispo",pat:"castries",lema:"Paloma del Espíritu Santo y báculo pastoral · «Veritas liberabit vos»"},
   rentas:"Diócesis montañosa y pobre de apenas 10.000 libras en los Alpes de Provenza.",
   nota:"Venerado como un santo padre de la Iglesia primitiva por los jansenistas; ni las amenazas de destierro de Dubois logran doblar su pluma."},
  {id:"dioc-marseille", n:"Obispado de Marsella", corto:"Ob. de Marsella", lon:5.37, lat:43.30,
   partido:"aceptante", galero:"obispo", par:false, pid:"henri-belsunce",
   titular:"Henri-François-Xavier de Belsunce de Castelmoron", cargo:"Obispo de Marsella",
   emblema:{bg:"#f0ede4",fg:"#1f3a68",acc:"#b02828",galero:"obispo",pat:"larochefoucauld",lema:"Sagrado Corazón de Marsella (1720) y vacas de gules de Belsunce"},
   rentas:"30.000 libras de renta en el gran puerto mediterráneo.",
   nota:"Héroe de la Peste de Marsella (1720-1722); antiguo jesuita y campeón ardiente de la bula Unigenitus frente a su vecino apelante de Senez."},
  {id:"dioc-frejus", n:"Obispado de Fréjus (Feudo espiritual de Fleury)", corto:"Ob. de Fréjus (Fleury)", lon:6.73, lat:43.43,
   partido:"aceptante", galero:"obispo", par:false, pid:"fleury",
   titular:"André-Hercule de Fleury", cargo:"Antiguo Obispo de Fréjus y Preceptor del Rey Luis XV",
   emblema:{bg:"#f0ede4",fg:"#1f3a68",acc:"#e0ba54",galero:"obispo",pat:"villeroy",lema:"Tres rosas de gules sobre plata · Paciencia y oído absoluto del Rey"},
   rentas:"Abadías reales de Tournus y Saint-Étienne de Caen.",
   nota:"Aunque renunció a la mitra de Fréjus para educar a Luis XV en Versalles, su red de obispos provenzales y languedocianos prepara ya su futuro ascenso al poder."}
];

/* ---------- 4. MAPA DE APANAJES DE LA SANGRE (Con sus escudos de flores de lis y su Príncipe) ---------- */
const APANAJES_LIST = [
  {id:"ap-orleans", n:"Casa Real de Orleans (Gran Apanaje)", corto:"Apanaje de Orleans", lon:1.90, lat:47.90,
   color:[126,96,192], pid:"felipe-ii-orleans", titular:"Felipe II de Orleans, Duque de Orleans y Regente del Reino",
   cargo:"Sobrino de Luis XIV, Primer Príncipe del Apanaje y Regente de Francia",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#f0ede4",pat:"orleans",crown:"principe",
           blason:"De azur con tres flores de lis de oro, brisado en jefe con un lambel de tres pendientes de plata (Casa Ducal de Orleans)."},
   dominios:"Ducados de Orleans, Chartres, Valois, Nemours y Montpensier; Condados de Blois, Dourdan, Romorantin y Gien; Principado de Joinville; Señoríos de Montargis y Beaujolais; Gobierno del Delfinado.",
   rentas:"Más de 1.200.000 libras de renta apanajista y patrimonial, además del control supremo del Consejo de Regencia y del Palais-Royal.",
   nota:"El mayor apanaje jamás constituido en la monarquía borbónica; su heredero es Luis de Orleans, Duque de Chartres (18 años)."},
  {id:"ap-conde", n:"Casa de Borbón-Condé (Monsieur le Duc)", corto:"Tierras de Borbón-Condé", lon:4.85, lat:47.15,
   color:[56,116,188], pid:"luis-enrique-borbon", titular:"Luis Enrique de Borbón-Condé («Monsieur le Duc»)",
   cargo:"Príncipe de la Sangre, Jefe del Consejo de Regencia y Superintendente de la Educación del Rey",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conde",crown:"principe",
           blason:"De azur con tres flores de lis de oro, brisado en abismo con un bastón recortado de gules puesto en banda (Casa de Borbón-Condé)."},
   dominios:"Ducados de Borbón (Moulins), Enghien (Chantilly) y Guisa; Condados de Charolais, Dammartin y Clermont-en-Beauvaisis; Gobierno perpetuo de Borgoña y Bresse.",
   rentas:"Más de 1.800.000 libras anuales tras redimir todas sus deudas y multiplicar su fortuna especulando con las acciones de John Law.",
   nota:"Principal rival dinástico de la Casa de Orleans; desde Chantilly y el Palais-Bourbon prepara su asalto al puesto de Primer Ministro."},
  {id:"ap-conti", n:"Casa de Borbón-Conti", corto:"Tierras de Borbón-Conti", lon:3.65, lat:43.95,
   color:[52,152,136], pid:"louis-armand-conti", titular:"Luis Armando II de Borbón, Príncipe de Conti",
   cargo:"Príncipe de la Sangre y Miembro del Consejo de Regencia",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conti",crown:"principe",
           blason:"De azur con tres flores de lis de oro, brisado con un bastón recortado de gules en abismo y una bordura de gules (Casa de Borbón-Conti)."},
   dominios:"Principado de La Roche-sur-Yon (Poitou), Baronía de L'Isle-Adam y Pontoise (Île-de-France), Condado de Alès y Baronías de Pézenas y Bagnols (Languedoc), Gobierno del Poitou.",
   rentas:"Unas 450.000 libras de rentas señoriales incrementadas con sacos de oro arrancados al Banco de Law antes de su quiebra.",
   nota:"Rama menor de los Condé emparentada por doble matrimonio cruzado con Monsieur le Duc."},
  {id:"ap-maine", n:"Casa de Borbón-Maine (Legitimados)", corto:"Apanaje de Maine y Dombes", lon:4.92, lat:46.02,
   color:[198,136,48], pid:"duc-du-maine", titular:"Luis Augusto de Borbón, Duque del Maine",
   cargo:"Hijo legitimado de Luis XIV y Mme de Montespan · Príncipe Soberano de Dombes",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"maine",crown:"principe",
           blason:"De azur con tres flores de lis de oro, brisado en abismo con una barra (bastón siniestro) recortada de gules."},
   dominios:"Principado Soberano de Dombes (Trévoux), Ducado-Paría de Aumale, Condado-Paría de Eu (Normandía), Principado de Anet, Señorío de Sceaux y Gobierno General del Languedoc (en disputa).",
   rentas:"Más de 800.000 libras de renta y soberanía propia en Dombes.",
   nota:"Degradado del rango de Príncipe de la Sangre en el Lit de Justice de agosto de 1718 y encarcelado tras la Conspiración de Cellamare; vive retirado entre Sceaux y Versalles."},
  {id:"ap-toulouse", n:"Casa de Borbón-Toulouse (Legitimados)", corto:"Apanaje de Toulouse y Penthièvre", lon:-2.40, lat:48.20,
   color:[168,128,64], pid:"comte-de-toulouse", titular:"Luis Alejandro de Borbón, Conde de Toulouse",
   cargo:"Hijo legitimado menor de Luis XIV · Gran Almirante de Francia y Gobernador de Bretaña",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"toulouse",crown:"principe",
           blason:"De azur con tres flores de lis de oro y barra recortada de gules, puesto sobre las dos anclas cruzadas de Almirante de Francia."},
   dominios:"Ducados-Parías de Rambouillet (Île-de-France), Penthièvre (Bretaña), Châteauvillain y Arc-en-Barrois; Gobierno General de Bretaña.",
   rentas:"Más de 900.000 libras anuales más los derechos de presa del Almirantazgo de Francia.",
   nota:"Por su prudencia y lealtad durante la Regencia, el Regente le conservó de por vida sus honores personales en la corte."},
  {id:"ap-corona", n:"Dominio Real Directo de la Corona", corto:"Dominio Real (Luis XV)", lon:2.13, lat:48.80,
   color:[176,166,144], pid:"luis-xv", titular:"Luis XV, Rey de Francia y de Navarra",
   cargo:"Rey Cristianísimo (12 años · Consagración prevista en Reims en octubre de 1722)",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#b02828",pat:"lis",crown:"real",
           blason:"Partido de Francia (de azur con tres flores de lis de oro) y de Navarra (de gules con cadenas de oro en cruz, aspa y orla), timbrado de la Corona Real cerrada."},
   dominios:"París, Versalles, Fontainebleau, Marly, Compiègne, Saint-Germain y las provincias realengas gobernadas directamente por los Intendentes y Gobernadores del Rey.",
   rentas:"Impuestos reales de la Talla, Capitación, Gabela de la sal y Granjas Generales del Reino.",
   nota:"Patrimonio inalienable de la Corona custodiado durante la minoría de edad por el Consejo de Regencia."}
];

const PROV_APANAJE = {
  "orleanais":"ap-orleans","dauphine":"ap-orleans",
  "bourgogne":"ap-conde","bourbonnais":"ap-conde","picardie":"ap-conde",
  "poitou":"ap-conti","languedoc":"ap-conti",
  "dombes":"ap-maine","normandie":"ap-maine",
  "bretagne":"ap-toulouse",
  "ile-de-france":"ap-corona","champagne":"ap-corona","flandre":"ap-corona","artois":"ap-corona",
  "trois-eveches":"ap-corona","alsace":"ap-corona","maine":"ap-corona","anjou":"ap-corona",
  "touraine":"ap-corona","berry":"ap-corona","nivernais":"ap-corona","franche-comte":"ap-corona",
  "aunis":"ap-corona","saintonge":"ap-corona","limousin":"ap-corona","marche":"ap-corona",
  "auvergne":"ap-corona","lyonnais":"ap-corona","guyenne":"ap-corona","bearn":"ap-corona",
  "foix":"ap-corona","roussillon":"ap-corona","provence":"ap-corona"
};

/* ---------- FUNCIONES HERÁLDICAS Y DE LÍDERES (SVG Y CANVAS) ---------- */
function buscarLider(pid){
  if(!pid)return {L:null,p:null};
  const L=(typeof LIBRO!=="undefined"&&LIBRO)?LIBRO.find(c=>c.escritorio_id===pid||c.id===pid):null;
  const p=(typeof PERSONAJES!=="undefined"&&PERSONAJES)?PERSONAJES.find(c=>c.id===pid):null;
  return {L,p};
}

function abrirFichaLider(pid){
  const {L,p}=buscarLider(pid);
  if(L&&typeof openFichaL==="function"){openFichaL(L);return}
  if(p&&typeof openFicha==="function"){openFicha(p);return}
}

function liderCard(pid, titularFallback, cargoFallback){
  const {L,p}=buscarLider(pid);
  const nombre=L?(L.nombre_nac||L.nombre):p?p.nombre:titularFallback;
  const sub=L?(L.titulo_nob||L.titulo||cargoFallback):p?(p.titulo||cargoFallback):cargoFallback;
  const puesto=L?(L.puesto||L.cargo||""):p?(p.situacion_1722||""):"";
  const retratoNode=L&&typeof retratoEl==="function"?retratoEl(L):(typeof bust==="function"?bust():el("span",{},"👤"));

  const card=el("div",{class:"lider-card"},
    el("div",{class:"lider-av"},retratoNode),
    el("div",{class:"lider-body"},
      el("span",{class:"label"},"Líder / Titular en junio de 1722"),
      el("strong",{class:"lider-nm"},nombre),
      sub?el("div",{class:"note"},sub):null,
      puesto&&puesto!==sub?el("div",{class:"note"},puesto):null,
      (L||p)?el("div",{class:"lider-actions"},
        el("button",{class:"btn sm primary",onclick:()=>abrirFichaLider(pid)},"Abrir ficha en el Libro de Caras →"),
        L?el("a",{class:"btn sm",href:"libro.html#"+L.id},"Ver retrato y hoja completa ↗"):null
      ):null
    )
  );
  return card;
}

let ESCUDOS_DB = {src:{}, commons:{}, imgs:{}};

async function loadEscudosDB(){
  if(Object.keys(ESCUDOS_DB.src).length) return;
  try{
    const r = await fetch("datos/escudos.json");
    if(!r.ok) return;
    const j = await r.json();
    const files = j.files || {}, map = j.map || {};
    const imgCache = {};
    await Promise.all(Object.entries(files).map(([cname, dataUri])=>{
      return new Promise(res=>{
        const im = new Image();
        im.onload = ()=>{imgCache[cname]=im; res()};
        im.onerror = ()=>res();
        im.src = dataUri;
      });
    }));
    Object.entries(map).forEach(([eid, cname])=>{
      ESCUDOS_DB.commons[eid] = cname;
      ESCUDOS_DB.src[eid] = files[cname];
      if(imgCache[cname]) ESCUDOS_DB.imgs[eid] = imgCache[cname];
    });
  }catch(e){}
}

function renderEscudoSVG(esc, tipoMapa="ducados", entityId=""){
  if(entityId && ESCUDOS_DB.src[entityId]){
    const wrap=el("div",{class:"escudo-svg-wrap"});
    const cname=ESCUDOS_DB.commons[entityId]||"";
    const img=el("img",{src:ESCUDOS_DB.src[entityId],alt:"Escudo heráldico ("+cname+")",title:"Wikimedia Commons · Projet Blasons: "+cname,style:"width:68px;height:76px;object-fit:contain;display:block"});
    wrap.append(img);
    return wrap;
  }
  const bg=esc.bg||"#1c386b", fg=esc.fg||"#e0ba54", acc=esc.acc||"#b02828", pat=esc.pat||"lis";
  let charges="";
  if(pat==="lis"||pat==="orleans"||pat==="conde"||pat==="conti"||pat==="maine"||pat==="toulouse"){
    // Tres flores de lis de Francia
    charges+=`<g fill="${fg}" stroke="#111" stroke-width="0.4">
      <path d="M24 22c0-4 2.2-6.5 2.2-6.5S28.4 18 28.4 22c2-1.8 4.4-1.2 4.4 1s-2.8 2.8-5.2 2.2l1.2 4h-5.2l1.2-4c-2.4.6-5.2 0-5.2-2.2s2.4-2.8 4.4-1z"/>
      <path d="M40 22c0-4 2.2-6.5 2.2-6.5S44.4 18 44.4 22c2-1.8 4.4-1.2 4.4 1s-2.8 2.8-5.2 2.2l1.2 4h-5.2l1.2-4c-2.4.6-5.2 0-5.2-2.2s2.4-2.8 4.4-1z"/>
      <path d="M32 37c0-4 2.2-6.5 2.2-6.5S36.4 33 36.4 37c2-1.8 4.4-1.2 4.4 1s-2.8 2.8-5.2 2.2l1.2 4h-5.2l1.2-4c-2.4.6-5.2 0-5.2-2.2s2.4-2.8 4.4-1z"/>
    </g>`;
    if(pat==="orleans") charges+=`<path d="M20 15h28v3h-4v4h-4v-4h-4v4h-4v-4h-4v4h-4v-4h-4z" fill="#f4f2ec" stroke="#222" stroke-width="0.5"/>`;
    if(pat==="conde") charges+=`<line x1="27" y1="24" x2="41" y2="38" stroke="#d42c2c" stroke-width="4" stroke-linecap="square"/>`;
    if(pat==="conti") charges+=`<line x1="27" y1="24" x2="41" y2="38" stroke="#d42c2c" stroke-width="3.6"/><path d="M17 14h34v18c0 12-17 20-17 20S17 44 17 32z" fill="none" stroke="#d42c2c" stroke-width="3"/>`;
    if(pat==="maine"||pat==="toulouse") charges+=`<line x1="41" y1="24" x2="27" y2="38" stroke="#d42c2c" stroke-width="4" stroke-linecap="square"/>`;
  } else if(pat==="rohan"){
    // 9 macles de oro de Rohan
    const pts=[[24,20],[34,20],[44,20],[24,30],[34,30],[44,30],[27,40],[34,40],[41,40]];
    charges+=pts.map(([x,y])=>`<polygon points="${x},${y-4} ${x+3.5},${y} ${x},${y+4} ${x-3.5},${y}" fill="none" stroke="${fg}" stroke-width="1.8"/>`).join("");
  } else if(pat==="bouillon"){
    charges+=`<path d="M17 28h34M34 14v38" stroke="${fg}" stroke-width="6"/><rect x="29" y="22" width="10" height="12" fill="${acc}" stroke="#222" stroke-width="0.7"/>`;
  } else if(pat==="mazarin"){
    charges+=`<rect x="32" y="16" width="4" height="28" fill="${fg}"/><path d="M36 18c6 0 7 6 0 7z" fill="#f0ede4"/><rect x="17" y="27" width="34" height="6" fill="${acc}"/><circle cx="24" cy="30" r="2" fill="${fg}"/><circle cx="34" cy="30" r="2" fill="${fg}"/><circle cx="44" cy="30" r="2" fill="${fg}"/>`;
  } else if(pat==="harcourt"||pat==="mortemart"){
    charges+=`<rect x="17" y="21" width="34" height="6" fill="${fg}"/><rect x="17" y="33" width="34" height="6" fill="${fg}"/>`;
  } else if(pat==="noailles"){
    charges+=`<polygon points="17,18 24,14 51,41 44,46" fill="${fg}"/>`;
  } else if(pat==="villeroy"||pat==="richelieu"||pat==="tremoille"||pat==="villars"||pat==="larochefoucauld"){
    charges+=`<path d="M19 36 L34 21 L49 36" fill="none" stroke="${fg}" stroke-width="4.5"/><path d="M21 44 L34 31 L47 44" fill="none" stroke="${acc}" stroke-width="3"/>`;
  } else if(pat==="stsimon"||pat==="castries"){
    charges+=`<path d="M17 29h34M34 14v38" stroke="${fg}" stroke-width="6.5"/>`;
  } else {
    charges+=`<path d="M34 18l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="${fg}" stroke="#222" stroke-width="0.6"/>`;
  }

  let timbre="";
  if(tipoMapa==="parlamentos"){
    // Mortero de Primer Presidente + Balanza de la Justicia
    timbre=`<rect x="21" y="3" width="26" height="8" rx="1.5" fill="#1b1d22" stroke="#e0ba54" stroke-width="1.5"/>
            <line x1="21" y1="6" x2="47" y2="6" stroke="#e0ba54" stroke-width="1.6"/>
            <path d="M24 28h20M34 19v18M25 28l-3 7h6zM43 28l-3 7h6z" stroke="#fff" stroke-width="1.5" fill="${fg}"/>`;
  } else if(tipoMapa==="diocesis"){
    // Galero cardenalicio (rojo) o episcopal (verde) con borlas y cruz procesional
    const gCol=esc.galero==="cardenal"?"#b8242c":"#2b7a44";
    timbre=`<line x1="34" y1="1" x2="34" y2="14" stroke="#d4af37" stroke-width="2"/>
            <line x1="29" y1="4" x2="39" y2="4" stroke="#d4af37" stroke-width="1.8"/>
            ${esc.galero!=="obispo"?`<line x1="27" y1="7.5" x2="41" y2="7.5" stroke="#d4af37" stroke-width="1.8"/>`:""}
            <ellipse cx="34" cy="10" rx="16" ry="3.2" fill="${gCol}" stroke="#222" stroke-width="0.7"/>
            <path d="M24 10 A10 5 0 0 1 44 10" fill="${gCol}" stroke="#222" stroke-width="0.7"/>
            <circle cx="13" cy="18" r="2.2" fill="${gCol}"/><circle cx="11" cy="24" r="2.2" fill="${gCol}"/><circle cx="15" cy="24" r="2.2" fill="${gCol}"/>
            <circle cx="55" cy="18" r="2.2" fill="${gCol}"/><circle cx="53" cy="24" r="2.2" fill="${gCol}"/><circle cx="57" cy="24" r="2.2" fill="${gCol}"/>`;
  } else {
    // Corona real, principesca o ducal de florones de oro
    timbre=`<path d="M20 12l2-6 6 4 6-6 6 6 6-4 2 6z" fill="#e0ba54" stroke="#3a2a0a" stroke-width="0.9"/>
            <rect x="20" y="11" width="28" height="2.8" rx="1" fill="#d4af37" stroke="#3a2a0a" stroke-width="0.7"/>`;
  }

  const wrap=el("div",{class:"escudo-svg-wrap"});
  wrap.innerHTML=`<svg viewBox="0 0 68 60" width="66" height="58" aria-hidden="true">
    <defs><clipPath id="sh-${pat}-${tipoMapa}"><path d="M17 14h34v18c0 13-17 21-17 21S17 45 17 32z"/></clipPath></defs>
    <path d="M17 14h34v18c0 13-17 21-17 21S17 45 17 32z" fill="${bg}"/>
    <g clip-path="url(#sh-${pat}-${tipoMapa})">${charges}</g>
    <path d="M17 14h34v18c0 13-17 21-17 21S17 45 17 32z" fill="none" stroke="#d4af37" stroke-width="2"/>
    ${timbre}
  </svg>`;
  return wrap;
}

/* Escala de escudos y nombres: el lienzo se dibuja a la resolución del mapa base y el navegador lo reduce;
   FR_K compensa para que se lean al tamaño en pantalla (se calcula en cada dibujo). */
let FR_K=1.6;
function drawEmblemCanvas(ctx, x, y, esc, tipoMapa, isSel, entityId=""){
  ctx.save();
  ctx.translate(x, y);
  const sc=(isSel?1.32:1.0)*FR_K;
  ctx.scale(sc, sc);

  if(isSel){
    ctx.beginPath(); ctx.arc(0,0,19,0,7);
    ctx.fillStyle="rgba(218,176,76,0.38)"; ctx.fill();
    ctx.strokeStyle="#9e2a28"; ctx.lineWidth=2.4; ctx.stroke();
  }

  const wikiImg = entityId && ESCUDOS_DB.imgs[entityId];
  if(wikiImg){
    const iw=wikiImg.naturalWidth||100, ih=wikiImg.naturalHeight||115;
    const targetH = tipoMapa==="ducados" ? 28 : 32;
    const targetW = Math.round(targetH * (iw / ih));
    ctx.shadowColor="rgba(0,0,0,0.38)";
    ctx.shadowBlur=4;
    ctx.shadowOffsetY=1.5;
    ctx.drawImage(wikiImg, -targetW/2, -targetH/2, targetW, targetH);
    ctx.restore();
    return;
  }

  // Sombra y forma de escudo francés antiguo (respaldo vectorial)
  ctx.beginPath();
  ctx.moveTo(-10,-9); ctx.lineTo(10,-9); ctx.lineTo(10,2);
  ctx.bezierCurveTo(10,10, 0,14, 0,14);
  ctx.bezierCurveTo(0,14, -10,10, -10,2);
  ctx.closePath();
  ctx.fillStyle=esc?.bg||"#1c386b";
  ctx.fill();

  // Pieza heráldica interior en el lienzo
  const fg=esc?.fg||"#e0ba54", acc=esc?.acc||"#b02828", pat=esc?.pat||"lis";
  ctx.save();
  ctx.clip();
  ctx.fillStyle=fg; ctx.strokeStyle=fg;
  if(tipoMapa==="parlamentos"){
    // Balanza judicial en oro
    ctx.lineWidth=1.8;
    ctx.beginPath(); ctx.moveTo(-6,0); ctx.lineTo(6,0); ctx.moveTo(0,-5); ctx.lineTo(0,8); ctx.stroke();
    ctx.beginPath(); ctx.arc(-5,4,2.2,0,Math.PI); ctx.arc(5,4,2.2,0,Math.PI); ctx.fill();
  } else if(tipoMapa==="diocesis"){
    // Cruz arzobispal/episcopal en el escudo
    ctx.lineWidth=2.2;
    ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(0,10); ctx.moveTo(-5,-2); ctx.lineTo(5,-2);
    if(esc?.galero!=="obispo"){ctx.moveTo(-4,3); ctx.lineTo(4,3);}
    ctx.stroke();
  } else if(pat==="rohan"){
    ctx.lineWidth=1.4;
    [[-4,-3],[4,-3],[0,4]].forEach(([cx,cy])=>{
      ctx.beginPath(); ctx.moveTo(cx,cy-3); ctx.lineTo(cx+2.5,cy); ctx.lineTo(cx,cy+3); ctx.lineTo(cx-2.5,cy); ctx.closePath(); ctx.stroke();
    });
  } else if(pat==="harcourt"||pat==="mortemart"){
    ctx.fillRect(-10,-5,20,3.2); ctx.fillRect(-10,2,20,3.2);
  } else if(pat==="noailles"){
    ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(-9,-8); ctx.lineTo(9,10); ctx.stroke();
  } else if(pat==="bouillon"||pat==="stsimon"||pat==="castries"){
    ctx.lineWidth=3.5; ctx.beginPath(); ctx.moveTo(-10,1); ctx.lineTo(10,1); ctx.moveTo(0,-9); ctx.lineTo(0,13); ctx.stroke();
  } else if(pat==="villeroy"||pat==="richelieu"||pat==="tremoille"||pat==="villars"||pat==="larochefoucauld"){
    ctx.lineWidth=2.6; ctx.beginPath(); ctx.moveTo(-8,6); ctx.lineTo(0,-3); ctx.lineTo(8,6); ctx.stroke();
  } else {
    // Tres lises reales + brisura si procede
    [[-4.2,-3],[4.2,-3],[0,5]].forEach(([lx,ly])=>{
      ctx.beginPath(); ctx.arc(lx,ly,2.1,0,7); ctx.fill();
    });
    if(pat==="orleans"){ctx.fillStyle="#fff"; ctx.fillRect(-7,-7.5,14,2.2);}
    if(pat==="conde"||pat==="conti"){ctx.strokeStyle="#d62828"; ctx.lineWidth=2.4; ctx.beginPath(); ctx.moveTo(-4,-2); ctx.lineTo(4,5); ctx.stroke();}
    if(pat==="maine"||pat==="toulouse"){ctx.strokeStyle="#d62828"; ctx.lineWidth=2.4; ctx.beginPath(); ctx.moveTo(4,-2); ctx.lineTo(-4,5); ctx.stroke();}
  }
  ctx.restore();

  // Borde dorado del escudo
  ctx.beginPath();
  ctx.moveTo(-10,-9); ctx.lineTo(10,-9); ctx.lineTo(10,2);
  ctx.bezierCurveTo(10,10, 0,14, 0,14);
  ctx.bezierCurveTo(0,14, -10,10, -10,2);
  ctx.closePath();
  ctx.strokeStyle=isSel?"#9e2a28":"#d8b254";
  ctx.lineWidth=isSel?2.2:1.6;
  ctx.stroke();

  // Timbre superior según el mapa (Corona ducal/real, Mortero judicial o Galero eclesiástico)
  if(tipoMapa==="parlamentos"){
    ctx.fillStyle="#181a20"; ctx.strokeStyle="#e0ba54"; ctx.lineWidth=1.2;
    ctx.fillRect(-7,-14,14,4.5); ctx.strokeRect(-7,-14,14,4.5);
  } else if(tipoMapa==="diocesis"){
    const gCol=esc?.galero==="cardenal"?"#c4242c":"#2b7a44";
    ctx.fillStyle=gCol;
    ctx.beginPath(); ctx.ellipse(0,-11.5,10,2.4,0,0,7); ctx.fill();
    ctx.beginPath(); ctx.arc(-11,-4,2,0,7); ctx.arc(11,-4,2,0,7); ctx.fill();
  } else {
    ctx.fillStyle="#e0ba54"; ctx.strokeStyle="#3a2a0a"; ctx.lineWidth=0.9;
    ctx.beginPath();
    ctx.moveTo(-8,-9); ctx.lineTo(-7,-13.5); ctx.lineTo(-3.5,-11); ctx.lineTo(0,-14.5);
    ctx.lineTo(3.5,-11); ctx.lineTo(7,-13.5); ctx.lineTo(8,-9); ctx.closePath();
    ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}

/* ---------- PREPROCESADO DEL MAPA DE FRANCIA EN SUS 4 DIVISIONES ---------- */
async function loadProvinces(){
  await loadEscudosDB();
  if(provState)return provState;
  const img=new Image(); img.src=PROV_PNG; await img.decode();
  const w=img.width,h=img.height,c=document.createElement("canvas"); c.width=w;c.height=h;
  const x=c.getContext("2d",{willReadFrequently:true}); x.drawImage(img,0,0);
  const px=x.getImageData(0,0,w,h).data, key=new Map(PROV_DEF.map((r,i)=>[(r.r<<16)|(r.g<<8)|r.b,i]));
  const ids=new Int16Array(w*h); for(let i=0;i<w*h;i++){const k=(px[i*4]<<16)|(px[i*4+1]<<8)|px[i*4+2];ids[i]=key.has(k)?key.get(k):-1}
  const edge=new Uint8Array(w*h); for(let y=0;y<h;y++)for(let x2=0;x2<w;x2++){const i=y*w+x2,a=ids[i];if((x2+1<w&&ids[i+1]!==a)||(y+1<h&&ids[i+w]!==a))edge[i]=1}
  const s=w/((GEO.lon1-GEO.lon0)*GEO.k);
  const P=([lo,la])=>[(lo-GEO.lon0)*GEO.k*s,(GEO.lat1-la)*s];

  const provIdxBySlug=Object.fromEntries(PROV_DEF.map((r,i)=>[r.id,i]));
  const feudoPts=FEUDOS.map(f=>{const [fx,fy]=P([f.lon,f.lat]);return {fx,fy,pi:provIdxBySlug[f.prov]??-1}});
  const parlPts=PARLAMENTOS_LIST.map(p=>{const [fx,fy]=P(p.sede);return {fx,fy}});
  const diocPts=DIOCESIS_LIST.map(d=>{const [fx,fy]=P([d.lon,d.lat]);return {fx,fy}});
  const apanPts=APANAJES_LIST.map(a=>{const [fx,fy]=P([a.lon,a.lat]);return {fx,fy}});

  const parlIdxById=Object.fromEntries(PARLAMENTOS_LIST.map((p,i)=>[p.id,i]));
  const apanIdxById=Object.fromEntries(APANAJES_LIST.map((a,i)=>[a.id,i]));

  // Mapas de píxeles independientes para cada uno de los 4 modos
  const feudoIds=new Int16Array(w*h).fill(-1);
  const parlIds=new Int16Array(w*h).fill(-1);
  const diocIds=new Int16Array(w*h).fill(-1);
  const apanIds=new Int16Array(w*h).fill(-1);

  // Agrupar feudos por provincia cuando los hay; si una provincia no tiene feudo propio, asignarla al feudo más cercano
  const feudosByProv=PROV_DEF.map(()=>[]);
  feudoPts.forEach((pt,fi)=>{if(pt.pi>=0)feudosByProv[pt.pi].push(fi)});

  for(let y=0;y<h;y++){
    const row=y*w;
    for(let x2=0;x2<w;x2++){
      const i=row+x2, pId=ids[i]; if(pId<=0)continue;
      const r=PROV_DEF[pId]; if(r.tipo==="fuera")continue;

      // 1. Ducado / Señorío más cercano (priorizando los de su misma provincia histórica)
      const cand=feudosByProv[pId];
      if(cand&&cand.length===1){
        feudoIds[i]=cand[0];
      } else {
        const pool=(cand&&cand.length)?cand:FEUDOS.map((_,idx)=>idx);
        let bestF=pool[0], bestFD=1e12;
        for(let k=0;k<pool.length;k++){
          const fi=pool[k], pt=feudoPts[fi], dx=x2-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
          if(d2<bestFD){bestFD=d2;bestF=fi}
        }
        feudoIds[i]=bestF;
      }

      // 2. Parlamento soberano de esa provincia
      const pk=PROV_PARL[r.id];
      if(pk!==undefined&&parlIdxById[pk]!==undefined) parlIds[i]=parlIdxById[pk];

      // 3. Diócesis / Provincia eclesiástica más cercana
      if(r.tipo==="reino"){
        let bestDi=0, bestDD=1e12;
        for(let k=0;k<diocPts.length;k++){
          const pt=diocPts[k], dx=x2-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
          if(d2<bestDD){bestDD=d2;bestDi=k}
        }
        diocIds[i]=bestDi;
      }

      // 4. Apanaje de la Sangre (según el señorío o provincia)
      const fClan=FEUDOS[feudoIds[i]]?.clan;
      const apSlug=fClan==="orleans"?"ap-orleans":fClan==="conde"?"ap-conde":fClan==="conti"?"ap-conti":
                   fClan==="maine"?"ap-maine":fClan==="toulouse"?"ap-toulouse":(PROV_APANAJE[r.id]||"ap-corona");
      apanIds[i]=apanIdxById[apSlug]??5;
    }
  }

  // Calcular fronteras limpias de cada uno de los 4 mapas por separado
  const feudoEdge=new Uint8Array(w*h);
  const parlEdge=new Uint8Array(w*h);
  const diocEdge=new Uint8Array(w*h);
  const apanEdge=new Uint8Array(w*h);
  const coastEdge=new Uint8Array(w*h);

  for(let y=0;y<h-1;y++){
    const row=y*w;
    for(let x2=0;x2<w-1;x2++){
      const i=row+x2, pA=ids[i], pR=ids[i+1], pD=ids[i+w];
      if((pA>0)!==(pR>0)||(pA>0)!==(pD>0)) coastEdge[i]=1;
      if(pA<=0)continue;
      if(pR>0&&feudoIds[i]!==feudoIds[i+1]||pD>0&&feudoIds[i]!==feudoIds[i+w]) feudoEdge[i]=1;
      if(pR>0&&parlIds[i]!==parlIds[i+1]||pD>0&&parlIds[i]!==parlIds[i+w]) parlEdge[i]=1;
      if(pR>0&&diocIds[i]!==diocIds[i+1]||pD>0&&diocIds[i]!==diocIds[i+w]) diocEdge[i]=1;
      if(pR>0&&apanIds[i]!==apanIds[i+1]||pD>0&&apanIds[i]!==apanIds[i+w]) apanEdge[i]=1;
    }
  }

  provState={w,h,ids,edge,coastEdge,P,feudoIds,feudoEdge,feudoPts,parlIds,parlEdge,parlPts,diocIds,diocEdge,diocPts,apanIds,apanEdge,apanPts};
  return provState;
}

function tokenRGB(name){const v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();const m=v.match(/^#([0-9a-f]{6})$/i);if(m){const n=parseInt(m[1],16);return [n>>16,(n>>8)&255,n&255]}return [128,128,128]}
function hexRGB(hex){const m=String(hex||"").match(/^#([0-9a-f]{6})$/i);if(m){const n=parseInt(m[1],16);return [n>>16,(n>>8)&255,n&255]}return [140,120,90]}
const mix=(a,b,t)=>a.map((v,i)=>Math.round(v*(1-t)+b[i]*t));

/* ---------- RENDERIZADO TOTALMENTE SEPARADO DE LOS 4 MAPAS DE FRANCIA ---------- */
function renderProvinces(canvas){
  const {w,h,ids,coastEdge,feudoIds,feudoEdge,feudoPts,parlIds,parlEdge,parlPts,diocIds,diocEdge,diocPts,apanIds,apanEdge,apanPts}=provState;
  const ctx=canvas.getContext("2d"), im=ctx.createImageData(w,h), d=im.data;
  const chip=tokenRGB("--chip"),line=tokenRGB("--line"),muted=tokenRGB("--muted"),gilt=tokenRGB("--gilt"),paper=tokenRGB("--paper"),ink=tokenRGB("--ink");

  const feudoColors=FEUDOS.map((f,idx)=>mix(chip,hexRGB(f.escudo?.bg),.34+(idx%3)*0.06));
  const selParlIdx=PARLAMENTOS_LIST.findIndex(p=>p.id===selParl);
  const selDiocIdx=DIOCESIS_LIST.findIndex(x=>x.id===selDioc);
  const selApanIdx=APANAJES_LIST.findIndex(a=>a.id===selApanaje);

  for(let i=0;i<w*h;i++){
    const id=ids[i];
    if(id<=0){d[i*4+3]=0;continue}
    const r=PROV_DEF[id], x2=i%w, y=(i/w)|0;
    let c=paper;

    if(r.tipo==="extranjero"){
      c=(x2+y)%9<2?line:paper;
    } else if(capaFrancia==="ducados"){
      const fi=feudoIds[i];
      c=fi>=0?feudoColors[fi]:chip;
      if(fi===selDucado) c=mix(c,gilt,.55);
      if(feudoEdge[i]) c=(x2+y)%6<4?mix(ink,gilt,.25):c;
    } else if(capaFrancia==="parlamentos"){
      const pi=parlIds[i];
      c=pi>=0?mix(chip,PARLAMENTOS_LIST[pi].color,.46):chip;
      if(pi===selParlIdx) c=mix(c,gilt,.50);
      if(parlEdge[i]) c=ink;
    } else if(capaFrancia==="diocesis"){
      const di=diocIds[i];
      const part=di>=0?DIOCESIS_PARTIDOS[DIOCESIS_LIST[di].partido]:null;
      c=part?mix(chip,part.color,.42+(di%2)*0.08):chip;
      if(di===selDiocIdx) c=mix(c,gilt,.52);
      if(diocEdge[i]) c=(x2+y)%7<5?ink:c;
    } else if(capaFrancia==="apanajes"){
      const ai=apanIds[i];
      c=ai>=0?mix(chip,APANAJES_LIST[ai].color,.46):chip;
      if(ai===selApanIdx) c=mix(c,gilt,.50);
      if(apanEdge[i]) c=ink;
    }

    if(coastEdge[i]) c=muted;
    const o=i*4; d[o]=c[0]; d[o+1]=c[1]; d[o+2]=c[2]; d[o+3]=255;
  }
  ctx.putImageData(im,0,0);

  const fam=getComputedStyle(document.body).fontFamily;

  // Dibujar únicamente los escudos/emblemas y etiquetas del mapa activo
  {const cw=ctx.canvas.clientWidth||0; FR_K=Math.min(3.2,Math.max(1.4,cw?(w/cw)*1.05:1.8));}
  if(capaFrancia==="ducados"){
    FEUDOS.forEach((f,fi)=>{
      const {fx:x,fy:y}=feudoPts[fi], isSel=fi===selDucado;
      drawEmblemCanvas(ctx,x,y,f.escudo,"ducados",isSel,f.id);
      ctx.font=`${isSel?`700 ${(15.5*FR_K).toFixed(1)}px`:`600 ${(13*FR_K).toFixed(1)}px`} ${fam}`;
      ctx.textAlign="left"; ctx.textBaseline="middle";
      const tw=ctx.measureText(f.corto).width;
      const lx=x+16*FR_K+tw>w-8?x-16*FR_K-tw:x+16*FR_K, ly=y+(fi%2===0?-5:6)*FR_K;
      ctx.strokeStyle=`rgba(${paper},.92)`; ctx.lineWidth=3.2*FR_K; ctx.strokeText(f.corto,lx,ly);
      ctx.fillStyle=isSel?"#8b2020":`rgb(${ink})`; ctx.fillText(f.corto,lx,ly);
    });
  } else if(capaFrancia==="parlamentos"){
    PARLAMENTOS_LIST.forEach((p,pi)=>{
      const {fx:x,fy:y}=parlPts[pi], isSel=p.id===selParl;
      drawEmblemCanvas(ctx,x,y,p.emblema,"parlamentos",isSel,p.id);
      ctx.font=`${isSel?`700 ${(16.5*FR_K).toFixed(1)}px`:`600 ${(14.5*FR_K).toFixed(1)}px`} ${fam}`;
      ctx.textAlign="left"; ctx.textBaseline="middle";
      const tw=ctx.measureText(p.corto).width;
      const lx=x+17*FR_K+tw>w-8?x-17*FR_K-tw:x+17*FR_K;
      ctx.strokeStyle=`rgba(${paper},.94)`; ctx.lineWidth=3.6*FR_K; ctx.strokeText(p.corto,lx,y);
      ctx.fillStyle=isSel?"#8b2020":`rgb(${ink})`; ctx.fillText(p.corto,lx,y);
    });
  } else if(capaFrancia==="diocesis"){
    DIOCESIS_LIST.forEach((dioc,di)=>{
      const {fx:x,fy:y}=diocPts[di], isSel=dioc.id===selDioc;
      drawEmblemCanvas(ctx,x,y,dioc.emblema,"diocesis",isSel,dioc.id);
      ctx.font=`${isSel?`700 ${(16*FR_K).toFixed(1)}px`:`600 ${(14*FR_K).toFixed(1)}px`} ${fam}`;
      ctx.textAlign="left"; ctx.textBaseline="middle";
      const tw=ctx.measureText(dioc.corto).width;
      const lx=x+17*FR_K+tw>w-8?x-17*FR_K-tw:x+17*FR_K;
      ctx.strokeStyle=`rgba(${paper},.94)`; ctx.lineWidth=3.5*FR_K; ctx.strokeText(dioc.corto,lx,y);
      ctx.fillStyle=isSel?"#8b2020":`rgb(${ink})`; ctx.fillText(dioc.corto,lx,y);
    });
  } else if(capaFrancia==="apanajes"){
    APANAJES_LIST.forEach((ap,ai)=>{
      const {fx:x,fy:y}=apanPts[ai], isSel=ap.id===selApanaje;
      drawEmblemCanvas(ctx,x,y,ap.escudo,"apanajes",isSel,ap.id);
      ctx.font=`${isSel?`700 ${(17*FR_K).toFixed(1)}px`:`600 ${(15*FR_K).toFixed(1)}px`} ${fam}`;
      ctx.textAlign="left"; ctx.textBaseline="middle";
      const tw=ctx.measureText(ap.corto).width;
      const lx=x+18*FR_K+tw>w-8?x-18*FR_K-tw:x+18*FR_K;
      ctx.strokeStyle=`rgba(${paper},.94)`; ctx.lineWidth=3.8*FR_K; ctx.strokeText(ap.corto,lx,y);
      ctx.fillStyle=isSel?"#8b2020":`rgb(${ink})`; ctx.fillText(ap.corto,lx,y);
    });
  }
}

/* ---------- PANELES DE DETALLE CON ESCUDO/EMBLEMA Y LÍDER ---------- */
function showFranciaSelection(){
  const wrap=el("div",{class:"fr-info-wrap"});
  if(capaFrancia==="ducados"){
    const f=FEUDOS[selDucado]||FEUDOS[0];
    const provObj=PROV_DEF.find(r=>r.id===f.prov);
    wrap.append(
      el("div",{class:"emblema-header"},
        renderEscudoSVG(f.escudo,"ducados",f.id),
        el("div",{class:"emblema-meta"},
          el("span",{class:"tag ej"},f.rango),
          el("div",{},el("b",{},"Casa señorial: "),f.casa),
          provObj?el("div",{class:"note"},"Gobierno histórico: "+provObj.nombre):null,
          el("div",{class:"note blason-txt"},el("b",{},"Blasón histórico: "),f.escudo.blason)
        )
      ),
      liderCard(f.pid, f.titular, f.rango+" · "+f.casa),
      el("span",{class:"label"},"Rentas, tierras y privilegios en 1722"),
      el("p",{},f.rentas),
      el("span",{class:"label"},"Peso político en la corte de Versalles"),
      el("p",{class:"note"},f.nota)
    );
    mapInfo(f.nombre, "Mapa 1 · Los Ducados y Señoríos de Francia (cada uno con su escudo heráldico real y su señor).", wrap);
  } else if(capaFrancia==="parlamentos"){
    const p=PARLAMENTOS_LIST.find(x=>x.id===selParl)||PARLAMENTOS_LIST[0];
    wrap.append(
      el("div",{class:"emblema-header"},
        renderEscudoSVG(p.emblema,"parlamentos",p.id),
        el("div",{class:"emblema-meta"},
          el("span",{class:"tag"},"⚖ Corte Soberana de Justicia"),
          el("div",{},el("b",{},"Sede del Tribunal: "),p.n.replace("Parlamento de ","").replace("Consejo Soberano de ","")),
          el("div",{class:"note blason-txt"},el("b",{},"Armas de la jurisdicción: "),p.emblema.lema)
        )
      ),
      liderCard(p.pid, p.titular, p.cargo),
      el("span",{class:"label"},"Jurisdicción territorial (Ressort)"),
      el("p",{},p.ressort),
      el("span",{class:"label"},"Posición política en junio de 1722"),
      el("p",{},p.actitud),
      el("span",{class:"label"},"Uso en intrigas y pleitos"),
      el("p",{class:"note"},p.uso)
    );
    mapInfo(p.n, "Mapa 2 · Los 13 Parlamentos y Consejos Soberanos de Francia (con sus emblemas históricos y Primeros Presidentes).", wrap);
  } else if(capaFrancia==="diocesis"){
    const d=DIOCESIS_LIST.find(x=>x.id===selDioc)||DIOCESIS_LIST[0];
    const part=DIOCESIS_PARTIDOS[d.partido];
    wrap.append(
      el("div",{class:"emblema-header"},
        renderEscudoSVG(d.emblema,"diocesis",d.id),
        el("div",{class:"emblema-meta"},
          el("span",{class:"tag"},part?part.n:"Diócesis del Reino"),
          d.par?el("span",{class:"tag ej",style:"margin-left:6px"},"Par Eclesiástico de Francia"):null,
          el("div",{class:"note blason-txt"},el("b",{},"Armas episcopales / cardenalicias: "),d.emblema.lema)
        )
      ),
      liderCard(d.pid, d.titular, d.cargo),
      el("span",{class:"label"},"Rentas y beneficios eclesiásticos"),
      el("p",{},d.rentas),
      el("span",{class:"label"},"Alineamiento ante la Bula Unigenitus y el Sacre de Reims"),
      el("p",{class:"note"},d.nota)
    );
    mapInfo(d.n, "Mapa 3 · Las Diócesis y Provincias Eclesiásticas de Francia (con sus emblemas reales y prelados).", wrap);
  } else if(capaFrancia==="apanajes"){
    const ap=APANAJES_LIST.find(x=>x.id===selApanaje)||APANAJES_LIST[0];
    wrap.append(
      el("div",{class:"emblema-header"},
        renderEscudoSVG(ap.escudo,"apanajes",ap.id),
        el("div",{class:"emblema-meta"},
          el("span",{class:"tag ej"},"⚜ Armas de Sangre Real"),
          el("div",{class:"note blason-txt"},el("b",{},"Blasón y brisura: "),ap.escudo.blason)
        )
      ),
      liderCard(ap.pid, ap.titular, ap.cargo),
      el("span",{class:"label"},"Ducados, condados y gobiernos del Apanaje"),
      el("p",{},ap.dominios),
      el("span",{class:"label"},"Rentas y peso en la Regencia"),
      el("p",{},ap.rentas+" "+ap.nota)
    );
    mapInfo(ap.n, "Mapa 4 · Los Apanajes de la Sangre y Dominios de la Casa Real (con sus escudos de armas reales y su líder).", wrap);
  }
}

function renderFranciaLegend(legBox, selDrop){
  legBox.innerHTML="";
  selDrop.innerHTML="";
  if(capaFrancia==="ducados"){
    legBox.append(
      el("span",{},"🛡 Cada ducado, condado y marquesado muestra su escudo heráldico"),
      el("span",{},"⋯ Frontera señorial · Clic en un escudo o territorio para ver su líder")
    );
    selDrop.append(el("option",{value:""},"Ir a un Ducado o Señorío (30)…"),
      ...FEUDOS.map((f,i)=>el("option",{value:String(i),selected:i===selDucado},f.nombre+" — "+f.titular)));
  } else if(capaFrancia==="parlamentos"){
    PARLAMENTOS_LIST.slice(0,7).forEach(p=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${p.color})`}),p.corto)));
    selDrop.append(el("option",{value:""},"Ir a un Parlamento (13)…"),
      ...PARLAMENTOS_LIST.map(p=>el("option",{value:p.id,selected:p.id===selParl},p.n+" — "+p.titular)));
  } else if(capaFrancia==="diocesis"){
    Object.values(DIOCESIS_PARTIDOS).forEach(d=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${d.color})`}),d.n)));
    selDrop.append(el("option",{value:""},"Ir a una Diócesis o Arzobispado (14)…"),
      ...DIOCESIS_LIST.map(d=>el("option",{value:d.id,selected:d.id===selDioc},d.n+" — "+d.titular)));
  } else if(capaFrancia==="apanajes"){
    APANAJES_LIST.forEach(a=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${a.color})`}),a.corto)));
    selDrop.append(el("option",{value:""},"Ir a un Apanaje de la Sangre (6)…"),
      ...APANAJES_LIST.map(a=>el("option",{value:a.id,selected:a.id===selApanaje},a.n+" — "+a.titular)));
  }
}

function provInfo(i,fIdx=-1){
  if(fIdx>=0&&FEUDOS[fIdx]){
    capaFrancia="ducados"; selDucado=fIdx;
  } else if(i>=0&&PROV_DEF[i]){
    const r=PROV_DEF[i];
    if(capaFrancia==="ducados"){
      const fi=FEUDOS.findIndex(f=>f.prov===r.id);
      if(fi>=0) selDucado=fi;
    } else if(capaFrancia==="parlamentos"&&PROV_PARL[r.id]){
      selParl=PROV_PARL[r.id];
    } else if(capaFrancia==="apanajes"&&PROV_APANAJE[r.id]){
      selApanaje=PROV_APANAJE[r.id];
    }
  }
  const cv=document.querySelector("#map-box canvas");
  if(cv) renderProvinces(cv);
  showFranciaSelection();
}

async function drawProvinces(box){
  mapInfo("Reino de Francia","Cargando los 4 mapas separados del Reino de Francia…");
  try{await loadProvinces()}catch(e){mapInfo("Reino de Francia","No se pudo cargar el mapa de Francia.");return}
  const {w,h}=provState;

  const tb=el("div",{class:"map-toolbar"});
  const cBar=el("div",{class:"sectores-bar fr-tabs",role:"group","aria-label":"Los 4 mapas separados de Francia"});
  const legBox=el("div",{class:"leyenda-map"});
  const selDrop=el("select",{id:"francia-entity-sel","aria-label":"Seleccionar territorio en el mapa activo"});
  const canvas=el("canvas",{width:w,height:h,role:"img","aria-label":"Mapa de Francia en junio de 1722",style:"display:block;width:100%;height:auto;cursor:pointer"});

  Object.entries(CAPAS_FRANCIA).forEach(([k,v])=>{
    const b=el("button",{class:"btn sm","aria-pressed":String(capaFrancia===k),onclick:()=>{
      capaFrancia=k;
      [...cBar.children].forEach(x=>x.setAttribute("aria-pressed","false"));
      b.setAttribute("aria-pressed","true");
      renderFranciaLegend(legBox,selDrop);
      renderProvinces(canvas);
      showFranciaSelection();
    }},`${v.ico} ${v.num}. ${v.label}`);
    cBar.append(b);
  });

  selDrop.onchange=()=>{
    const val=selDrop.value; if(!val)return;
    if(capaFrancia==="ducados") selDucado=+val;
    else if(capaFrancia==="parlamentos") selParl=val;
    else if(capaFrancia==="diocesis") selDioc=val;
    else if(capaFrancia==="apanajes") selApanaje=val;
    renderProvinces(canvas);
    showFranciaSelection();
  };

  tb.append(cBar, el("div",{class:"sectores-bar"},selDrop));
  renderFranciaLegend(legBox,selDrop);
  box.append(tb,legBox,canvas);

  canvas.addEventListener("click",e=>{
    const r=canvas.getBoundingClientRect();
    const x=Math.floor((e.clientX-r.left)*w/r.width), y=Math.floor((e.clientY-r.top)*h/r.height);
    const idx=y*w+x;

    if(capaFrancia==="ducados"){
      let bestFi=-1, bestD=(28*FR_K)*(28*FR_K);
      provState.feudoPts.forEach((pt,fi)=>{
        const dx=x-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
        if(d2<bestD){bestD=d2;bestFi=fi}
      });
      if(bestFi<0&&provState.feudoIds[idx]>=0) bestFi=provState.feudoIds[idx];
      if(bestFi>=0){selDucado=bestFi; selDrop.value=String(bestFi); renderProvinces(canvas); showFranciaSelection();}
    } else if(capaFrancia==="parlamentos"){
      let bestPi=-1, bestD=(30*FR_K)*(30*FR_K);
      provState.parlPts.forEach((pt,pi)=>{
        const dx=x-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
        if(d2<bestD){bestD=d2;bestPi=pi}
      });
      if(bestPi<0&&provState.parlIds[idx]>=0) bestPi=provState.parlIds[idx];
      if(bestPi>=0){selParl=PARLAMENTOS_LIST[bestPi].id; selDrop.value=selParl; renderProvinces(canvas); showFranciaSelection();}
    } else if(capaFrancia==="diocesis"){
      let bestDi=-1, bestD=(30*FR_K)*(30*FR_K);
      provState.diocPts.forEach((pt,di)=>{
        const dx=x-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
        if(d2<bestD){bestD=d2;bestDi=di}
      });
      if(bestDi<0&&provState.diocIds[idx]>=0) bestDi=provState.diocIds[idx];
      if(bestDi>=0){selDioc=DIOCESIS_LIST[bestDi].id; selDrop.value=selDioc; renderProvinces(canvas); showFranciaSelection();}
    } else if(capaFrancia==="apanajes"){
      let bestAi=-1, bestD=32*32;
      provState.apanPts.forEach((pt,ai)=>{
        const dx=x-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
        if(d2<bestD){bestD=d2;bestAi=ai}
      });
      if(bestAi<0&&provState.apanIds[idx]>=0) bestAi=provState.apanIds[idx];
      if(bestAi>=0){selApanaje=APANAJES_LIST[bestAi].id; selDrop.value=selApanaje; renderProvinces(canvas); showFranciaSelection();}
    }
  });

  renderProvinces(canvas);
  showFranciaSelection();
}
