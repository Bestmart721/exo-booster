import React, { useEffect, useState } from "react";
import { fetchUserData } from "../firebaseAuth";
import axios from "axios";
import { useSelector } from "react-redux";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useMobileOrTabletMediaQuery } from "../responsiveHook";
import { Link } from "react-router-dom";
import {
	MDBBtn,
	MDBContainer,
	MDBListGroup,
	MDBListGroupItem,
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBIcon,
	MDBCard,
	MDBCardBody,
	MDBInput,
	MDBRow,
	MDBCol,
	MDBTextArea,
} from "mdb-react-ui-kit";
import { Input } from "reactstrap";
// import { Select } from "reactstrap";

const Home = () => {
	const isMobileOrTablet = useMobileOrTabletMediaQuery();
	const location = "home";
	const user = useSelector((state) => state.auth.user);
	const [isOpen, setIsOpen] = React.useState(false);
	const [data, setData] = useState({
		instagram: {
			display_name: {
				en: "Instagram",
				fr: "Instagram",
			},
			code_name: "instagram",
			enabled: true,
			thumbnail_url:
				"https://firebasestorage.googleapis.com/v0/b/exobooster-59de3.appspot.com/o/categoriesthumbnails%2FInstagram_logo_200x200.png?alt=media&token=01c777a8-e8e9-459b-b0ff-ebd3b05b12a2",
			order_position: 1,
			services: {
				instagram_followers: {
					category_name: "instagram",
					order_position: 1,
					service_id: "instagram_followers",
					display_name: {
						en: "Followers",
						fr: "Followers",
					},
					enabled: true,
					subservices: {
						instagram_followers_avg_quality: {
							type: "default",
							enabled: true,
							min: 100,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos abonnés sont en chemin !",
							},
							link_field_text: {
								en: "Instagram account link:",
								fr: "le lien du compte Instagram:",
							},
							subservice_id: "instagram_followers_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							link_check: true,
							max: 5000000,
							rate: {
								xaf: 500,
							},
							price_text: {
								xaf: {
									en: "(500 XAF / 1k Followers)",
									fr: "(500 XAF / 1k Followers)",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							youtube_tutorial: {
								en: "https://youtu.be/kA1HtjkBHBo",
								fr: "https://youtu.be/oBtXDYnrVZs",
							},
							block_duplicate_orders: true,
							display_name: {
								en: "Average Quality Followers",
								fr: "Followers de Qualité Moyenne",
							},
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							description: {
								en: "MAKE SURE YOUR INSTAGRAM ACCOUNT IS NOT PRIVATE OR ELSE YOUR ORDER WILL BE CANCELLED and don't change your instagram username while followers are been added !|Average quality means a shorter guarantee length, semi-real accounts/engagements, and average drops|Due to a recent instagram update , you might have to turn off 'Flag for review' on your account for followers to be added properly, watch the tutorial below if you don't know how to do that 👇",
								fr: "ASSUREZ-VOUS QUE VOTRE COMPTE INSTAGRAM N'EST PAS PRIVÉ, SINON VOTRE COMMANDE SERA ANNULÉE et ne changez pas votre nom d'utilisateur instagram pendant que des followers sont ajoutés !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes|En raison d'une récente mise à jour d'Instagram, il se peut que vous deviez désactiver l'option « À vérifier » sur votre compte pour que les followers soient ajoutés correctement, regardez le tutoriel ci-dessous si vous ne savez pas comment faire 👇",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 500XAF / 1k Followers|Average Completion Time: 1 Hour|Guarantee: 4 months",
									fr: "Prix : 500XAF / 1k Followers|Temps moyen de réalisation: 1 Heure|Garantie: 4 mois",
								},
							},
						},
						instagram_followers_high_quality: {
							link_check: true,
							type: "default",
							enabled: true,
							min: 50,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos abonnés sont en chemin !",
							},
							link_field_text: {
								en: "Instagram account link:",
								fr: "le lien du compte Instagram:",
							},
							max: 350000,
							display_name: {
								en: "High Quality Followers",
								fr: "Followers de haute qualité",
							},
							subservice_id: "instagram_followers_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							rate: {
								xaf: 2200,
							},
							price_text: {
								xaf: {
									en: "(2200 XAF / 1k Followers)",
									fr: "(2200 XAF / 1k Followers)",
								},
							},
							order_position: 3,
							sub_display_name: {
								xaf: {
									en: "Price: 2200XAF / 1k Followers|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix : 2200XAF / 1k Followers|Temps moyen de réalisation: 30 Minutes|Garantie: 1 An",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							youtube_tutorial: {
								en: "https://youtu.be/kA1HtjkBHBo",
								fr: "https://youtu.be/oBtXDYnrVZs",
							},
							block_duplicate_orders: true,
							description: {
								en: "MAKE SURE YOUR INSTAGRAM ACCOUNT IS NOT PRIVATE OR ELSE YOUR ORDER WILL BE CANCELLED and don't change your instagram username while followers are been added !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops|Due to a recent instagram update , you might have to turn off 'Flag for review' on your account for followers to be added properly, watch the tutorial below if you don't know how to do that 👇",
								fr: "ASSUREZ-VOUS QUE VOTRE COMPTE INSTAGRAM N'EST PAS PRIVÉ, SINON VOTRE COMMANDE SERA ANNULÉE et ne changez pas votre nom d'utilisateur instagram pendant que des followers sont ajoutés !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes|En raison d'une récente mise à jour d'Instagram, il se peut que vous deviez désactiver l'option « À vérifier » sur votre compte pour que les followers soient ajoutés correctement, regardez le tutoriel ci-dessous si vous ne savez pas comment faire 👇",
							},
						},
					},
				},
				instagram_likes: {
					category_name: "instagram",
					order_position: 2,
					service_id: "instagram_likes",
					display_name: {
						en: "Post Likes",
						fr: "J'aime",
					},
					enabled: true,
					subservices: {
						instagram_likes_avg_quality: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos J'aime sont en chemin !",
							},
							link_field_text: {
								en: "Instagram Post Link:",
								fr: "Le lien de la publication Instagram:",
							},
							display_name: {
								en: "Average Quality Likes",
								fr: "J'aime De Qualité Moyenne",
							},
							subservice_id: "instagram_likes_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							youtube_tutorial: {
								en: "https://youtu.be/QnFf9GsfrsU?si=Y9_RVLVof9rc53hJ",
								fr: "https://youtu.be/b41QwQQkSaA",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/(reel|p)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							block_duplicate_orders: true,
							min: 50,
							description: {
								en: "Make sure the post is from an instagram account that's not private !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops|You should expect a 3-5% drop in likes after some weeks !",
								fr: "Assurez vous que la publication provient d'un compte instagram qui n'est pas privé !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes|Il faut s'attendre à une baisse de 3 à 5 % du nombre de j'aime après quelques semaines !",
							},
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							rate: {
								xaf: 30,
							},
							max: 300000,
							price_text: {
								xaf: {
									en: "(30 XAF / 1K Likes)",
									fr: "(30 XAF / 1K J'aime)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 30XAF / 1K Likes|Average Completion Time: 1 Hour|Guarantee: 1 Month",
									fr: "Prix: 30XAF / 1K J'aime|Temps moyen de réalisation: 1 Heure|Garantie: 1 mois",
								},
							},
						},
						instagram_likes_high_quality: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way",
								fr: "Vos J'aime sont en chemin !",
							},
							link_field_text: {
								en: "Instagram Post Link:",
								fr: "Le lien de la publication Instagram:",
							},
							display_name: {
								en: "High Quality Likes",
								fr: "J'aime de haute qualité",
							},
							subservice_id: "instagram_likes_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							youtube_tutorial: {
								en: "https://youtu.be/QnFf9GsfrsU?si=Y9_RVLVof9rc53hJ",
								fr: "https://youtu.be/b41QwQQkSaA",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/(reel|p)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							block_duplicate_orders: true,
							description: {
								en: "Make sure the post is from an instagram account that's not private !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Assurez vous que la publication provient d'un compte instagram qui n'est pas privé !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							min: 100,
							rate: {
								xaf: 100,
							},
							max: 1000000,
							price_text: {
								xaf: {
									en: "(100 XAF / 1K Likes)",
									fr: "(100 XAF / 1K J'aime)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 100XAF / 1K Likes|Average Completion Time: 1 Hour|Guarantee: 3 Months",
									fr: "Prix: 100XAF / 1K J'aime|Temps moyen de réalisation: 1 Heure|Garantie: 3 mois",
								},
							},
						},
					},
				},
				instagram_views: {
					category_name: "instagram",
					order_position: 3,
					service_id: "instagram_views",
					display_name: {
						en: "Video/Reel Views",
						fr: "Vues Video/Reel",
					},
					enabled: true,
					subservices: {
						instagram_views_avg_quality: {
							description: {
								en: "Make sure the video is from an instagram account that's not private !|If you have purchased views before and want to purchase again for the same video, make sure your previous order was completed already !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Assurez vous que la vidéo provient d'un compte instagram qui n'est pas privé !|Si vous avez déjà acheté des vues et que vous souhaitez en acheter à nouveau pour la même video , assurez vous que votre commande précédente est déjà terminée !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							rate: {
								xaf: 100,
							},
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Instagram video/reel link:",
								fr: "Lien vers la vidéo/réel Instagram:",
							},
							max: 100000000,
							price_text: {
								xaf: {
									en: "(100 XAF / 1K Views)",
									fr: "(100 XAF / 1K Vues)",
								},
							},
							display_name: {
								en: "Average Quality Views",
								fr: "Vues De Qualité Moyenne",
							},
							subservice_id: "instagram_views_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							youtube_tutorial: {
								en: "https://youtu.be/sMBuF6lI9GE?si=8KeyCLofJjii6dLx",
								fr: "https://youtu.be/OaSUi1YOEJk",
							},
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 100XAF / 1k Views|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix: 100XAF / 1K Vues|Temps moyen de réalisation: 30 Minutes|Garantie: 1 an",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/(reel|p)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							block_duplicate_orders: false,
						},
						instagram_views_high_quality: {
							description: {
								en: "Make sure the video is from an instagram account that's not private !|If you have purchased views before and want to purchase again for the same video, make sure your previous order was completed already !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Assurez vous que la vidéo provient d'un compte instagram qui n'est pas privé !|Si vous avez déjà acheté des vues et que vous souhaitez en acheter à nouveau pour la même video, assurez vous que votre commande précédente est déjà terminée !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							rate: {
								xaf: 150,
							},
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Instagram video/reel link:",
								fr: "Lien vers la vidéo/reel Instagram:",
							},
							max: 100000000,
							price_text: {
								xaf: {
									en: "(150 XAF / 1K Views)",
									fr: "(150 XAF / 1K Vues)",
								},
							},
							display_name: {
								en: "High Quality Views",
								fr: "Vues de haute qualité",
							},
							subservice_id: "instagram_views_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							youtube_tutorial: {
								en: "https://youtu.be/sMBuF6lI9GE?si=8KeyCLofJjii6dLx",
								fr: "https://youtu.be/OaSUi1YOEJk",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 150XAF / 1K Views|Average Completion Time: 1 Hour|Guarantee: 1 year",
									fr: "Prix: 150XAF / 1K Vues|Temps moyen de réalisation: 1 Heure|Garantie: 1 an",
								},
							},
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/(reel|p)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							block_duplicate_orders: false,
						},
					},
				},
				instagram_custom_comments: {
					category_name: "instagram",
					order_position: 4,
					service_id: "instagram_custom_comments",
					display_name: {
						en: "Custom Comments",
						fr: "Commentaires personnalisés",
					},
					enabled: true,
					subservices: {
						instagram_custom_comments_avg_quality: {
							link_check: true,
							type: "custom_comments",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your comments are on the way !",
								fr: "Vos commentaires sont en chemin !",
							},
							link_field_text: {
								en: "Instagram post link:",
								fr: "Lien de la publication Instagram:",
							},
							display_name: {
								en: "Average Quality Comments",
								fr: "Commentaires de qualité moyenne",
							},
							subservice_id: "instagram_custom_comments_avg_quality",
							order_position: 1,
							youtube_tutorial: {
								en: "https://youtu.be/XCcXJnVoaRA?si=o_gH9QC2d7Q72eo2",
								fr: "https://youtu.be/H-cttDNrpks",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/(reel|p)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							description: {
								en: 'Make sure the post is from an instagram account that\'s not private !|Make sure none of the comments have "@" or "#" in them|If you have purchased comments before and want to purchase again for the same post, make sure your previous order was completed already !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops',
								fr: "Assurez vous que la publication provient d'un compte instagram qui n'est pas privé !|Assurez-vous qu'aucun des commentaires ne comporte de \"@\" ou \"#\"|Si vous avez déjà acheté des commentaires et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							min: 10,
							rate: {
								xaf: 12000,
							},
							max: 3000,
							price_text: {
								xaf: {
									en: "(120XAF / 10 Comments)",
									fr: "(120XAF / 10 Commentaires)",
								},
							},
							average_time: {
								en: "3 Hours",
								fr: "3 Heures",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 120XAF / 10 Comments|Average Completion Time: 3 Hours|Guarantee: 1 month",
									fr: "Prix: 120XAF / 10 Commentaires|Temps moyen de réalisation: 3 Heures|Garantie: 1 mois",
								},
							},
							comments_seperator_text: {
								fr: "(Séparez chaque commentaire en passant à une nouvelle ligne)",
								en: "(Seperate each comment by moving to a new line)",
							},
							block_duplicate_orders: false,
						},
						instagram_custom_comments_high_quality: {
							link_check: true,
							type: "custom_comments",
							enabled: true,
							min: 10,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your comments are on the way!",
								fr: "Vos commentaires sont en chemin !",
							},
							link_field_text: {
								en: "Instagram Post Link:",
								fr: "Le lien de publication sur Instagram :",
							},
							display_name: {
								en: "High Quality Comments",
								fr: "Commentaires De Haute Qualité",
							},
							subservice_id: "instagram_custom_comments_high_quality",
							comments_seperator_text: {
								en: "(Seperate each comment by moving to a new line)",
								fr: "(Séparez chaque commentaire en passant à une nouvelle ligne)",
							},
							order_position: 1,
							youtube_tutorial: {
								en: "https://youtu.be/XCcXJnVoaRA?si=o_gH9QC2d7Q72eo2",
								fr: "https://youtu.be/H-cttDNrpks",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/(reel|p)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							description: {
								en: 'Make sure the post is from an instagram account that\'s not private !|Make sure none of the comments have "@" or "#" in them|If you have purchased comments before and want to purchase again for the same post, make sure your previous order was completed already|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops',
								fr: "Assurez vous que la publication provient d'un compte instagram qui n'est pas privé !|Assurez-vous qu'aucun des commentaires ne comporte de \"@\" ou \"#\"|Si vous avez déjà acheté des commentaires et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							max: 100000,
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							rate: {
								xaf: 13000,
							},
							price_text: {
								xaf: {
									en: "(130XAF / 10 Comments)",
									fr: "(130XAF / 10 Commentaires)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 130XAF / 10 Comments|Average Completion Time: 30 Minutes|Guarantee: 6 months",
									fr: "Prix: 130XAF / 10 Commentaires|Temps moyen de réalisation: 30 Minutes|Garantie: 6 mois",
								},
							},
							block_duplicate_orders: false,
						},
					},
				},
				instagram_story_views: {
					category_name: "instagram",
					order_position: 5,
					service_id: "instagram_story_views",
					display_name: {
						en: "Story Views",
						fr: "Vues Story",
					},
					enabled: true,
					subservices: {
						instagram_story_views_average_quality: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Instagram story link:",
								fr: "Lien de la story Instagram:",
							},
							max: 10000,
							subservice_id: "instagram_story_views_average_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							average_time: {
								en: "20 Minutes",
								fr: "20 Minutes",
							},
							min: 100,
							display_name: {
								en: "Average Quality Story Views",
								fr: "Vues Story de Qualité Moyenne",
							},
							description: {
								en: "Viewers will be from asian countries",
								fr: "Les spectateurs seront originaires de pays asiatiques",
							},
							youtube_tutorial: {
								en: "",
								fr: "",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/stories\\/[^\\s]+$",
							block_duplicate_orders: false,
							rate: {
								xaf: 100,
							},
							price_text: {
								xaf: {
									en: "(100 XAF / 1K Views)",
									fr: "(100 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 100XAF / 1K Views|Average Completion Time: 20 Minutes|Guarantee: 1 Year",
									fr: "Prix: 100XAF / 1K Vues|Temps moyen de réalisation: 20 Minutes|Garantie : 1 An",
								},
							},
						},
						instagram_story_views_high_quality: {
							average_time: {
								en: "20 Minutes",
								fr: "20 Minutes",
							},
							youtube_tutorial: {
								en: "",
								fr: "https://youtu.be/KaMRvWPdhEM",
							},
							description: {
								en: "Viewers will be from European countries",
								fr: "Les spectateurs seront des pays Européens",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 20,
							rate: {
								xaf: 1800,
							},
							multiple_of_10_enforced: false,
							sub_display_name: {
								xaf: {
									en: "Price: 1800XAF / 1K Views|Average Completion Time: 20 Minutes|Guarantee: 1 Year",
									fr: "Prix: 1800XAF / 1K Vues|Temps moyen de réalisation: 20 Minutes|Garantie : 1 An",
								},
							},
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Instagram story link:",
								fr: "Lien de la story Instagram:",
							},
							max: 10000,
							price_text: {
								xaf: {
									en: "(1800 XAF / 1K Views)",
									fr: "(1800 XAF / 1K Vues)",
								},
							},
							display_name: {
								en: "High Quality Story Views",
								fr: "Vues Story de Haute Qualité",
							},
							subservice_id: "instagram_story_views_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?instagram\\.com\\/stories\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
					},
				},
			},
		},
		tiktok: {
			display_name: {
				en: "Tiktok",
				fr: "Tiktok",
			},
			code_name: "tiktok",
			enabled: true,
			thumbnail_url:
				"https://firebasestorage.googleapis.com/v0/b/exobooster-59de3.appspot.com/o/categoriesthumbnails%2Ftiktok_logo_200x200.png?alt=media&token=d45e4e2a-4b57-43af-b130-082f225cb4f3",
			order_position: 2,
			services: {
				tiktok_followers: {
					category_name: "tiktok",
					order_position: 1,
					service_id: "tiktok_followers",
					display_name: {
						en: "Followers",
						fr: "Followers",
					},
					enabled: true,
					subservices: {
						tiktok_followers_avg_quality: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos followers sont en chemin !",
							},
							display_name: {
								en: "Average Quality Followers",
								fr: "Followers de qualité moyenne",
							},
							subservice_id: "tiktok_followers_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							youtube_tutorial: {
								en: "https://youtu.be/PMQQiiv0naw?si=riAZOzuLBjNQHiAh",
								fr: "https://youtu.be/cLBtfmF7pt0",
							},
							link_field_text: {
								en: "Tiktok account link:",
								fr: "Le lien du compte Tiktok:",
							},
							average_time: {
								en: "2 Hours",
								fr: "2 Heures",
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							min: 50,
							block_duplicate_orders: true,
							description: {
								en: "Make sure the Tiktok account is not private, and dont change the accounts username while followers are been added !|Almost no drop in followers!|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Assurez-vous que le compte Tiktok n'est pas privé, et ne changez pas le nom d'utilisateur du compte pendant que des followers sont ajoutés !|Presque pas de baisse des followers!|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							rate: {
								xaf: 1500,
							},
							max: 1000000,
							price_text: {
								xaf: {
									en: "(1500 XAF / 1k Followers)",
									fr: "(1500 XAF / 1k Followers)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1500XAF / 1k Followers|Average Completion Time: 2 Hours|Guarantee: 2 Months",
									fr: "Prix : 1500XAF / 1k Followers|Temps moyen de réalisation: 2 Heures|Garantie: 2 Mois",
								},
							},
						},
						tiktok_followers_high_quality: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos followers sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok account link:",
								fr: "le lien du compte Tiktok:",
							},
							display_name: {
								en: "High Quality Followers",
								fr: "Followers de haute qualité",
							},
							subservice_id: "tiktok_followers_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							youtube_tutorial: {
								en: "https://youtu.be/PMQQiiv0naw?si=riAZOzuLBjNQHiAh",
								fr: "https://youtu.be/cLBtfmF7pt0",
							},
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							min: 50,
							block_duplicate_orders: true,
							description: {
								en: "Make sure the Tiktok account is not private, and dont change the accounts username while followers are been added !|Almost no drop in followers !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Assurez-vous que le compte Tiktok n'est pas privé, et ne changez pas le nom d'utilisateur du compte pendant que des followers sont ajoutés !|Presque pas de baisse des followers !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							rate: {
								xaf: 1800,
							},
							max: 200000,
							price_text: {
								xaf: {
									en: "(1800 XAF / 1k Followers)",
									fr: "(1800 XAF / 1k Followers)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1800XAF / 1k Followers|Average Completion Time: 1 Hour|Guarantee: 6 Months",
									fr: "Prix : 1800XAF / 1k Followers|Temps moyen de réalisation: 1 Heure|Garantie: 6 mois",
								},
							},
						},
					},
				},
				tiktok_likes: {
					category_name: "tiktok",
					order_position: 2,
					service_id: "tiktok_likes",
					display_name: {
						en: "Video Likes",
						fr: "J’aime",
					},
					enabled: true,
					subservices: {
						tiktok_likes_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/mmYuJPPOLZ8?si=N7W_I_jhljs6tIFx",
								fr: "https://youtu.be/KaMRvWPdhEM",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos J'aime sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok Video Link:",
								fr: "Le lien de la vidéo Tiktok:",
							},
							display_name: {
								en: "Average Quality Likes",
								fr: "J'aime De Qualité Moyenne",
							},
							subservice_id: "tiktok_likes_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							min: 50,
							max: 100000,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							average_time: {
								en: "2 Hours",
								fr: "2 Heures",
							},
							description: {
								en: "MAKE SURE THE LINK YOU ARE SUBMITTING IS THE LINK OF A VIDEO FROM YOUR TIKTOK ACCOUNT, NOT THE LINK OF YOUR TIKTOK ACCOUNT !!!!|Make sure the video is from a Tiktok account that's not private !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "ASSUREZ-VOUS QUE LE LIEN QUE VOUS SOUMETTEZ EST LE LIEN D'UNE VIDÉO DE VOTRE COMPTE TIKTOK, ET NON LE LIEN DE VOTRE COMPTE TIKTOK !!!!|Assurez vous que la vidéo \nprovient d'un compte Tiktok qui n'est pas privé !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							block_duplicate_orders: true,
							rate: {
								xaf: 150,
							},
							price_text: {
								xaf: {
									en: "(150 XAF / 1K Likes)",
									fr: "(150 XAF / 1K J'aime)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 150XAF / 1K Likes|Average Completion Time: 2 Hours|Guarantee: 1 Month",
									fr: "Prix: 150XAF / 1K J'aime|Temps moyen de réalisation: 2 Heures|Garantie: 1 mois",
								},
							},
						},
						tiktok_likes_high_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/mmYuJPPOLZ8?si=N7W_I_jhljs6tIFx",
								fr: "https://youtu.be/KaMRvWPdhEM",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos J'aime sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok Video Link:",
								fr: "Le lien de la vidéo Tiktok:",
							},
							display_name: {
								en: "High Quality Likes",
								fr: "J'aime De Haute Qualité",
							},
							subservice_id: "tiktok_likes_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							average_time: {
								en: "2 Hours",
								fr: "2 Heures",
							},
							description: {
								en: "MAKE SURE THE LINK YOU ARE SUBMITTING IS THE LINK OF A VIDEO FROM YOUR TIKTOK ACCOUNT, NOT THE LINK OF YOUR TIKTOK ACCOUNT !!!!|Make sure the video is from a Tiktok account that's not private !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "ASSUREZ-VOUS QUE LE LIEN QUE VOUS SOUMETTEZ EST LE LIEN D'UNE VIDÉO DE VOTRE COMPTE TIKTOK, ET NON LE LIEN DE VOTRE COMPTE TIKTOK !!!!|Assurez vous que la vidéo provient d'un compte Tiktok qui n'est pas privé !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							block_duplicate_orders: true,
							min: 50,
							max: 100000,
							rate: {
								xaf: 200,
							},
							price_text: {
								xaf: {
									en: "(200 XAF / 1K Likes)",
									fr: "(200 XAF / 1K J'aime)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 200XAF / 1K Likes|Average Completion Time: 2 Hours|Guarantee: 1 year",
									fr: "Prix: 200XAF / 1K J'aime|Temps moyen de réalisation: 2 Heures|Guarantee: 1 An",
								},
							},
						},
					},
				},
				tiktok_views: {
					category_name: "tiktok",
					order_position: 3,
					service_id: "tiktok_views",
					display_name: {
						en: "Video Views",
						fr: "Vues",
					},
					enabled: true,
					subservices: {
						tiktok_views_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/mmYuJPPOLZ8?si=N7W_I_jhljs6tIFx",
								fr: "https://youtu.be/ffVOkSBHAHQ",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok video link:",
								fr: "Lien vers la vidéo Tiktok:",
							},
							max: 100000000,
							display_name: {
								en: "Average Quality Views",
								fr: "Vues De Qualité Moyenne",
							},
							subservice_id: "tiktok_views_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							rate: {
								xaf: 10,
							},
							price_text: {
								xaf: {
									en: "(10 XAF / 1K Views)",
									fr: "(10 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 10XAF / 1k Views|Average Completion Time: 30 Minutes|Guarantee: 1 year",
									fr: "Prix: 10XAF / 1K Vues|Temps moyen de réalisation: 30 Minutes|Garantie : 1 An",
								},
							},
							min: 500,
							block_duplicate_orders: true,
							description: {
								en: "MAKE SURE THE LINK YOU ARE SUBMITTING IS THE LINK OF A VIDEO FROM YOUR TIKTOK ACCOUNT, NOT THE LINK OF YOUR TIKTOK ACCOUNT !!!!|Make sure the video is from a Tiktok account that's not private !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "ASSUREZ-VOUS QUE LE LIEN QUE VOUS SOUMETTEZ EST LE LIEN D'UNE VIDÉO DE VOTRE COMPTE TIKTOK, ET NON LE LIEN DE VOTRE COMPTE TIKTOK ! !!!|Assurez vous que la vidéo provient d'un compte Tiktok qui n'est pas privé !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
						},
						tiktok_views_high_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/mmYuJPPOLZ8?si=N7W_I_jhljs6tIFx",
								fr: "https://youtu.be/ffVOkSBHAHQ",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok video link:",
								fr: "Lien vers la vidéo Tiktok:",
							},
							max: 100000000,
							display_name: {
								en: "High Quality Views",
								fr: "Vues De Haute Qualité",
							},
							subservice_id: "tiktok_views_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							rate: {
								xaf: 20,
							},
							price_text: {
								xaf: {
									en: "(20 XAF / 1K Views)",
									fr: "(20 XAF / 1K Vues)",
								},
							},
							average_time: {
								en: "15 Minutes",
								fr: "15 Minutes",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 20XAF / 1k Views|Average Completion Time: 15 Minutes|Guarantee: 1 year",
									fr: "Prix: 20XAF / 1K Vues|Temps moyen de réalisation: 15 Minutes|Garantie: 1 An",
								},
							},
							min: 500,
							description: {
								en: "MAKE SURE THE LINK YOU ARE SUBMITTING IS THE LINK OF A VIDEO FROM YOUR TIKTOK ACCOUNT, NOT THE LINK OF YOUR TIKTOK ACCOUNT !!!!|Make sure the video is from a Tiktok account that's not private !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "ASSUREZ-VOUS QUE LE LIEN QUE VOUS SOUMETTEZ EST LE LIEN D'UNE VIDÉO DE VOTRE COMPTE TIKTOK, ET NON LE LIEN DE VOTRE COMPTE TIKTOK !!!!|Assurez vous que la vidéo provient d'un compte Tiktok qui n'est pas privé !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							block_duplicate_orders: true,
						},
					},
				},
				tiktok_saves: {
					category_name: "tiktok",
					order_position: 4,
					service_id: "tiktok_saves",
					display_name: {
						en: "Video Saves",
						fr: "Sauvegardes Vidéo",
					},
					enabled: true,
					subservices: {
						tiktok_saves_average_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/mmYuJPPOLZ8?si=N7W_I_jhljs6tIFx",
								fr: "https://youtu.be/KaMRvWPdhEM",
							},
							description: {
								en: "Make sure the video is from a Tiktok account that's not private !|If you have purchased saves before and want to purchase again for the same video, make sure your previous order was completed already !",
								fr: "Assurez vous que la vidéo \nprovient d'un compte Tiktok qui n'est pas privé !|Si vous avez déjà acheté des sauvegardes et que vous souhaitez en acheter à nouveau pour la même vidéo, assurez vous que votre commande précédente est déjà terminée !",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 10,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your saves are on the way !",
								fr: "Vos sauvegardes sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok video link:",
								fr: "Le lien de la vidéo Tiktok:",
							},
							max: 100000,
							display_name: {
								en: "Video Saves",
								fr: "Sauvegardes vidéo",
							},
							subservice_id: "tiktok_saves_average_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
							rate: {
								xaf: 50,
							},
							price_text: {
								xaf: {
									en: "(50 XAF / 1K Saves)",
									fr: "(50 XAF / 1K Sauvegardes)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 50XAF / 1K Saves|Average Completion Time: 1 Hour|Guarantee: 1 Year",
									fr: "Prix: 50XAF / 1K Sauvegardes|Temps moyen de réalisation: 1 Heure|Garantie : 1 An",
								},
							},
						},
					},
				},
				tiktok_shares: {
					category_name: "tiktok",
					order_position: 5,
					service_id: "tiktok_shares",
					display_name: {
						en: "Video Shares",
						fr: "Partages Vidéo",
					},
					enabled: true,
					subservices: {
						tiktok_shares_average_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/mmYuJPPOLZ8?si=N7W_I_jhljs6tIFx",
								fr: "https://youtu.be/KaMRvWPdhEM",
							},
							description: {
								en: "Make sure the video is from a Tiktok account that's not private !|If you have purchased shares before and want to purchase again for the same video, make sure your previous order was completed already !",
								fr: "Assurez vous que la vidéo \nprovient d'un compte Tiktok qui n'est pas privé !|Si vous avez déjà acheté des partages et que vous souhaitez en acheter à nouveau pour la même vidéo, assurez vous que votre commande précédente est déjà terminée !",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 50,
							rate: {
								xaf: 200,
							},
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your shares are on the way !",
								fr: "Vos partages sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok video link:",
								fr: "Le lien de la vidéo Tiktok:",
							},
							max: 400000,
							price_text: {
								xaf: {
									en: "(200 XAF / 1K Shares)",
									fr: "(200 XAF / 1K Partages)",
								},
							},
							display_name: {
								en: "Video Shares",
								fr: "Partages Vidéo",
							},
							subservice_id: "tiktok_shares_average_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							sub_display_name: {
								xaf: {
									en: "Price: 200XAF / 1K Shares|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix: 200XAF / 1K Partages|Temps moyen de réalisation: 30 Minutes|Garantie : 1 An",
								},
							},
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
					},
				},
				tiktok_live_views: {
					category_name: "tiktok",
					order_position: 8,
					service_id: "tiktok_live_views",
					display_name: {
						en: "Live Viewers",
						fr: "Téléspectateurs pour votre direct",
					},
					enabled: true,
					subservices: {
						tiktok_live_views_30mins: {
							average_time: {
								en: "10 Minutes",
								fr: "10 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/ZwF0yErwoLg",
								fr: "https://youtu.be/lYHtPQ5DGH0",
							},
							description: {
								en: "The viewers will watch your Tiktok live for 30 Minutes",
								fr: "Les téléspectateurs regarderont votre direct pendant 30 minutes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your viewers are on the way !",
								fr: "Vos téléspectateurs sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok live link:",
								fr: "Lien vers le direct Tiktok:",
							},
							display_name: {
								en: "Viewers (30 Mins WatchTime)",
								fr: "Téléspectateurs (durée de visionnage de 30 minutes)",
							},
							subservice_id: "tiktok_live_views_30mins",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							rate: {
								xaf: 400,
							},
							price_text: {
								xaf: {
									en: "(400 XAF / 1K Viewers)",
									fr: "(400 XAF / 1K Téléspectateurs )",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 400XAF / 1k Viewers|Average Completion Time: 10 Minutes",
									fr: "Prix: 400XAF / 1K Téléspectateurs|Temps moyen de réalisation: 10 Minutes",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
							min: 100,
							max: 50000,
						},
						tiktok_live_views_60mins: {
							average_time: {
								en: "10 Minutes",
								fr: "10 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/ZwF0yErwoLg",
								fr: "https://youtu.be/lYHtPQ5DGH0",
							},
							description: {
								en: "The viewers will watch your Tiktok live for 60 Minutes",
								fr: "Les téléspectateurs regarderont votre direct pendant 60 minutes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your viewers are on the way !",
								fr: "Vos téléspectateurs sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok live link:",
								fr: "Lien vers le direct Tiktok:",
							},
							display_name: {
								en: "Viewers (60 Mins WatchTime)",
								fr: "Téléspectateurs (durée de visionnage de 60 minutes)",
							},
							subservice_id: "tiktok_live_views_60mins",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
							min: 100,
							rate: {
								xaf: 600,
							},
							max: 50000,
							price_text: {
								xaf: {
									en: "(600 XAF / 1K Viewers)",
									fr: "(600 XAF / 1K Téléspectateurs )",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 600XAF / 1k Viewers|Average Completion Time: 10 Minutes",
									fr: "Prix: 600XAF / 1K Téléspectateurs|Temps moyen de réalisation: 10 Minutes",
								},
							},
						},
						tiktok_live_views_120mins: {
							average_time: {
								en: "10 Minutes",
								fr: "10 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/ZwF0yErwoLg",
								fr: "https://youtu.be/lYHtPQ5DGH0",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your viewers are on the way !",
								fr: "Vos téléspectateurs sont en chemin !",
							},
							link_field_text: {
								en: "Tiktok live link:",
								fr: "Lien vers le direct Tiktok:",
							},
							subservice_id: "tiktok_live_views_120mins",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 3,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
							rate: {
								xaf: 1600,
							},
							price_text: {
								xaf: {
									en: "(1600 XAF / 1K Viewers)",
									fr: "(1600 XAF / 1K Téléspectateurs )",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1600XAF / 1k Viewers|Average Completion Time: 10 Minutes",
									fr: "Prix: 1600XAF / 1K Téléspectateurs|Temps moyen de réalisation: 10 Minutes",
								},
							},
							min: 100,
							max: 50000,
							description: {
								en: "The viewers will watch your Tiktok live for 180 Minutes",
								fr: "Les téléspectateurs regarderont votre direct pendant 180 minutes",
							},
							display_name: {
								en: "Viewers (180 Mins WatchTime)",
								fr: "Téléspectateurs (durée de visionnage de 180 minutes)",
							},
						},
					},
				},
			},
		},
		facebook: {
			display_name: {
				en: "Facebook",
				fr: "Facebook",
			},
			code_name: "facebook",
			enabled: true,
			thumbnail_url:
				"https://firebasestorage.googleapis.com/v0/b/exobooster-59de3.appspot.com/o/categoriesthumbnails%2Ffacebook_logo_200x200.webp?alt=media&token=2fd37f36-2df9-46cf-b5f2-d2adba400f40",
			order_position: 3,
			services: {
				facebook_page_followers: {
					category_name: "facebook",
					order_position: 1,
					service_id: "facebook_page_followers",
					display_name: {
						en: "Page Followers",
						fr: "Abonnés pour votre page",
					},
					enabled: true,
					subservices: {
						facebook_page_followers: {
							youtube_tutorial: {
								en: "https://youtu.be/t7ia28nEMrU?si=ps6ydr0m6GkGG75F",
								fr: "https://youtu.be/ZlF4tQ5gd7E",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos abonnés sont en chemin !",
							},
							link_field_text: {
								en: "Page Link:",
								fr: "Lien vers la page Facebook:",
							},
							display_name: {
								en: "Average Quality Followers",
								fr: "Abonnés de qualité moyenne",
							},
							subservice_id: "facebook_page_followers",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							min: 100,
							max: 500000,
							block_duplicate_orders: false,
							description: {
								en: "IF THERE IS A FACEBOOK UPDATE THEN YOUR ORDER MIGHT TAKE A LITTLE BIT LONGER THAN USUAL !|If you have purchased followers before and want to purchase again for the same Page, make sure your previous order was completed already !|You get page followers and bonus page likes !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "EN CAS DE MISE À JOUR DE FACEBOOK, VOTRE COMMANDE PEUT PRENDRE UN PEU PLUS DE TEMPS QUE D'HABITUDE !|Si vous avez déjà acheté des Abonnés et que vous souhaitez en acheter à nouveau pour la même page, assurez-vous que votre commande précédente est déjà terminée !|Vous obtenez à la fois des followers et des likes pour votre page !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							average_time: {
								en: "10 Hours",
								fr: "10 Heures",
							},
							rate: {
								xaf: 400,
							},
							price_text: {
								xaf: {
									en: "(400XAF / 1K Followers)",
									fr: "(400XAF / 1K Abonnés)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 400XAF / 1K Followers|Average Completion Time: 10 Hours|Guarantee: 2 Months",
									fr: "Prix: 400XAF / 1K Abonnés|Temps moyen de réalisation: 10 Heures|Garantie: 2 Mois",
								},
							},
						},
						facebook_page_high_quality_followers: {
							youtube_tutorial: {
								en: "https://youtu.be/t7ia28nEMrU?si=ps6ydr0m6GkGG75F",
								fr: "https://youtu.be/ZlF4tQ5gd7E",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos abonnés sont en chemin !",
							},
							link_field_text: {
								en: "Page Link:",
								fr: "Lien vers la page Facebook:",
							},
							display_name: {
								en: "High Quality Followers",
								fr: "Abonnés de haute qualité",
							},
							subservice_id: "facebook_page_high_quality_followers",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
							description: {
								en: "IF THERE IS A FACEBOOK UPDATE THEN YOUR ORDER MIGHT TAKE A LITTLE BIT LONGER THAN USUAL !|If you have purchased followers before and want to purchase again for the same Page, make sure your previous order was completed already !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "EN CAS DE MISE À JOUR DE FACEBOOK, VOTRE COMMANDE PEUT PRENDRE UN PEU PLUS DE TEMPS QUE D'HABITUDE !|Si vous avez déjà acheté des Abonnés et que vous souhaitez en acheter à nouveau pour la même page, assurez-vous que votre commande précédente est déjà terminée !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							average_time: {
								en: "9 Hours",
								fr: "9 Heures",
							},
							min: 100,
							rate: {
								xaf: 600,
							},
							price_text: {
								xaf: {
									en: "(600XAF / 1K Followers)",
									fr: "(600XAF / 1K Abonnés)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 600XAF / 1K Followers|Average Completion Time: 9 Hours|Guarantee: 10 Months",
									fr: "Prix: 600XAF / 1K Abonnés|Temps moyen de réalisation: 9 Heures|Garantie: 10 Mois",
								},
							},
							max: 350000,
						},
					},
				},
				facebook_profile_followers: {
					category_name: "facebook",
					order_position: 2,
					service_id: "facebook_profile_followers",
					display_name: {
						en: "Profile Followers",
						fr: " Abonnés pour votre profil",
					},
					enabled: true,
					subservices: {
						facebook_profile_followers_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/qnwnaDaTij8?si=y4FReyJGdXYpDjDa",
								fr: "https://youtu.be/zTNxE-DxgwQ",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos abonnés sont en chemin !",
							},
							link_field_text: {
								en: "Profile Link:",
								fr: "Lien vers le profil Facebook:",
							},
							display_name: {
								en: "Average Quality Followers",
								fr: "Abonnés de qualité moyenne",
							},
							subservice_id: "facebook_profile_followers_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							description: {
								en: "If you have purchased followers before and want to purchase again for the same Profile, make sure your previous order was completed already !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops|MAKE SURE THE FACEBOOK PROFILE IS IN PROFESSIONAL MODE, IF YOU DON'T KNOW HOW TO DO IT THEN WATCH THE TUTORIAL BELOW 👇",
								fr: "Si vous avez déjà acheté des Abonnés et que vous souhaitez en acheter à nouveau pour le même Profil, assurez-vous que votre commande précédente est déjà terminée !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes|ASSUREZ-VOUS QUE LE PROFIL FACEBOOK EST EN MODE PROFESSIONNEL, SI VOUS NE SAVEZ PAS COMMENT FAIRE, REGARDEZ LE TUTORIEL CI-DESSOUS 👇",
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							max: 1000000,
							block_duplicate_orders: false,
							average_time: {
								en: "8 Hours",
								fr: "8 Heures",
							},
							rate: {
								xaf: 600,
							},
							price_text: {
								xaf: {
									en: "(600XAF / 1K Followers)",
									fr: "(600XAF / 1K Abonnés)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 600XAF / 1K Followers|Average Completion Time: 8 Hours|Guarantee: 1 Month",
									fr: "Prix: 600XAF / 1K Abonnés|Temps moyen de réalisation: 8 Heures|Garantie: 1 Mois",
								},
							},
						},
						facebook_profile_high_quality_followers: {
							youtube_tutorial: {
								en: "https://youtu.be/qnwnaDaTij8?si=y4FReyJGdXYpDjDa",
								fr: "https://youtu.be/zTNxE-DxgwQ",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos abonnés sont en chemin !",
							},
							link_field_text: {
								en: "Profile Link:",
								fr: "Lien vers le profil Facebook:",
							},
							display_name: {
								en: "High Quality Followers",
								fr: "Abonnés de haute qualité",
							},
							subservice_id: "facebook_profile_high_quality_followers",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							description: {
								en: "If you have purchased followers before and want to purchase again for the same Profile, make sure your previous order was completed already !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops|MAKE SURE THE FACEBOOK PROFILE IS IN PROFESSIONAL MODE, IF YOU DON'T KNOW HOW TO DO IT THEN WATCH THE TUTORIAL BELOW 👇",
								fr: "Si vous avez déjà acheté des Abonnés et que vous souhaitez en acheter à nouveau pour le même Profil, assurez-vous que votre commande précédente est déjà terminée !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes|ASSUREZ-VOUS QUE LE PROFIL FACEBOOK EST EN MODE PROFESSIONNEL, SI VOUS NE SAVEZ PAS COMMENT FAIRE, REGARDEZ LE TUTORIEL CI-DESSOUS 👇",
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							max: 500000,
							block_duplicate_orders: false,
							average_time: {
								en: "7 Hours",
								fr: "7 Heures",
							},
							rate: {
								xaf: 900,
							},
							price_text: {
								xaf: {
									en: "(900XAF / 1K Followers)",
									fr: "(900XAF / 1K Abonnés)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 900XAF / 1K Followers|Average Completion Time: 7 Hours|Guarantee: 4 Months",
									fr: "Prix: 900XAF / 1K Abonnés|Temps moyen de réalisation: 7 Heures|Garantie: 4 Mois",
								},
							},
						},
					},
				},
				facebook_page_likes: {
					category_name: "facebook",
					order_position: 3,
					service_id: "facebook_page_likes",
					display_name: {
						en: "Page Likes",
						fr: "J'aime pour votre page",
					},
					enabled: true,
					subservices: {
						facebook_page_likes_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/ByszquFXQeM?si=CHmEXQDVZgHsrFg-",
								fr: "https://youtu.be/-dJC-NFlHug",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos j'aime sont en chemin !",
							},
							link_field_text: {
								en: "Page Link:",
								fr: "Lien vers la page Facebook:",
							},
							display_name: {
								en: "Average Quality Likes",
								fr: "J'aime De Qualité Moyenne",
							},
							subservice_id: "facebook_page_likes_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							rate: {
								xaf: 500,
							},
							max: 100000,
							price_text: {
								xaf: {
									en: "(500 XAF / 1K Likes)",
									fr: "(500 XAF / 1K J'aime)",
								},
							},
							description: {
								en: "Make sure you are sending the likes to a Page, not a Profile !|You will get followers as bonus|If you have purchased likes before and want to purchase again for the same page, make sure your previous order was completed already !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Assurez vous que vous envoyez les j'aime à une page et non à un profil !|Vous obtiendrez des followers en bonus|Si vous avez déjà acheté des j'aime et que vous souhaitez en acheter à nouveau pour la même page, assurez vous que votre commande précédente est déjà terminée !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							block_duplicate_orders: false,
							average_time: {
								en: "7 Hours",
								fr: "7 Heures",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 500XAF / 1K Likes|Average Completion Time: 7 Hours|Guarantee: 2 Months",
									fr: "Prix: 500XAF / 1K J'aime|Temps moyen de réalisation: 7 Heures|Garantie: 2 Mois",
								},
							},
						},
						facebook_page_likes_high_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/ByszquFXQeM?si=CHmEXQDVZgHsrFg-",
								fr: "https://youtu.be/-dJC-NFlHug",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos j'aime sont en chemin !",
							},
							link_field_text: {
								en: "Page Link:",
								fr: "Lien vers la page Facebook:",
							},
							display_name: {
								en: "High Quality Likes",
								fr: "J'aime De Haute Qualité",
							},
							subservice_id: "facebook_page_likes_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							min: 100,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							rate: {
								xaf: 600,
							},
							max: 500000,
							price_text: {
								xaf: {
									en: "(600 XAF / 1K Likes)",
									fr: "(600 XAF / 1K J'aime)",
								},
							},
							description: {
								en: "Make sure you are sending the likes to a Page, not a Profile !|You will get bonus followers| If you have purchased likes before and want to purchase again for the same page, make sure your previous order was completed already !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Assurez vous que vous envoyez les j'aime à une page et non à un profil !|Vous obtiendrez des followers en bonus|Si vous avez déjà acheté des j'aime et que vous souhaitez en acheter à nouveau pour la même page, assurez vous que votre commande précédente est déjà terminée !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							block_duplicate_orders: false,
							average_time: {
								en: "7 Hours",
								fr: "7 Heures",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 600XAF / 1K Likes|Average Completion Time: 7 Hours|Guarantee: 4 Months",
									fr: "Prix: 600XAF / 1K J'aime|Temps moyen de réalisation: 7 Heures|Garantie: 4 Mois",
								},
							},
						},
					},
				},
				facebook_post_likes: {
					category_name: "facebook",
					order_position: 4,
					service_id: "facebook_post_likes",
					enabled: true,
					display_name: {
						en: "Post Likes",
						fr: "J'aime pour votre publication",
					},
					subservices: {
						facebook_post_likes_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/7zLMXNaIUIU?si=tWgXvhgQw9oCqGOt",
								fr: "https://youtu.be/cvUutzu7Aco",
							},
							description: {
								en: "If the post is from a facebook account, make sure the accounts posts are public !|If you have purchased likes before and want to purchase again for the same post, make sure your previous order was completed already !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Si la publication provient d'un compte Facebook, assurez vous que les publications du compte sont publiques !|Si vous avez déjà acheté des j'aime et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos J'aime sont en route !",
							},
							link_field_text: {
								en: "Post Link:",
								fr: "Le lien de la publication Facebook:",
							},
							display_name: {
								en: "Average Quality Likes",
								fr: "J'aime De Qualité Moyenne",
							},
							subservice_id: "facebook_post_likes_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							min: 100,
							max: 20000,
							rate: {
								xaf: 500,
							},
							price_text: {
								xaf: {
									en: "(500 XAF / 1K Likes)",
									fr: "(500 XAF / 1K J'aime)",
								},
							},
							average_time: {
								en: "4 Hours",
								fr: "4 Heures",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 500XAF / 1K Likes|Average Completion Time: 4 Hours|Guarantee: 1 Month",
									fr: "Prix: 500XAF / 1K J'aime|Temps moyen de réalisation: 4 Heures|Garantie: 1 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
						facebook_post_likes_high_quality: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/7zLMXNaIUIU?si=tWgXvhgQw9oCqGOt",
								fr: "https://youtu.be/cvUutzu7Aco",
							},
							description: {
								en: "If the post is from a facebook account, make sure the accounts posts are public !|If you have purchased likes before and want to purchase again for the same post, make sure your previous order was completed already !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Si la publication provient d'un compte Facebook, assurez vous que les publications du compte sont publiques !|Si vous avez déjà acheté des j'aime et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos J'aime sont en route !",
							},
							link_field_text: {
								en: "Post Link:",
								fr: "Le lien de la publication Facebook:",
							},
							max: 10000,
							display_name: {
								en: "High Quality Likes",
								fr: "J'aime De Haute Qualité",
							},
							subservice_id: "facebook_post_likes_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							min: 30,
							rate: {
								xaf: 750,
							},
							price_text: {
								xaf: {
									en: "(750 XAF / 1K Likes)",
									fr: "(750 XAF / 1K J'aime)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 750XAF / 1K Likes|Average Completion Time: 30 Minutes|Guarantee: 2 Months",
									fr: "Prix: 750XAF / 1K J'aime|Temps moyen de réalisation: 30 Minutes|Garantie: 2 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
					},
				},
				facebook_group_members: {
					category_name: "facebook",
					order_position: 5,
					service_id: "facebook_group_members",
					display_name: {
						en: "Group Members",
						fr: "Membres pour votre groupe",
					},
					enabled: true,
					subservices: {
						facebook_group_members_avg_quality: {
							youtube_tutorial: {
								en: "",
								fr: "https://youtu.be/bsX-Mgkae78",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your members are on the way !",
								fr: "Vos membres sont en chemin !",
							},
							link_field_text: {
								en: "Group Link:",
								fr: "Lien du groupe Facebook:",
							},
							display_name: {
								en: "Average Quality Members",
								fr: "Membres de qualité moyenne",
							},
							subservice_id: "facebook_group_members_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: true,
							average_time: {
								en: "3 Hours",
								fr: "3 Heures",
							},
							max: 100000,
							description: {
								en: "MAKE SURE THE GROUP IS PUBLIC , NOT PRIVATE OR ELSE YOUR ORDER WILL BE CANCELLED !!!|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "ASSUREZ-VOUS QUE LE GROUPE EST PUBLIC ET NON PRIVÉ, SINON VOTRE COMMANDE SERA ANNULÉE !!!|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							rate: {
								xaf: 300,
							},
							price_text: {
								xaf: {
									en: "(300XAF / 1K Members)",
									fr: "(300XAF / 1K Membres)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 300XAF / 1K Members|Average Completion Time: 3 Hours|Guarantee: 1 Month",
									fr: "Prix: 300XAF / 1K Membres|Temps moyen de réalisation: 3 Heures|Garantie: 1 Mois",
								},
							},
						},
						facebook_group_members_high_quality: {
							youtube_tutorial: {
								en: "",
								fr: "https://youtu.be/bsX-Mgkae78",
							},
							link_check: true,
							type: "default",
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your members are on the way !",
								fr: "Vos membres sont en chemin !",
							},
							link_field_text: {
								en: "Group Link:",
								fr: "Lien du groupe Facebook:",
							},
							display_name: {
								en: "High Quality Members",
								fr: "Membres de haute qualité",
							},
							subservice_id: "facebook_group_members_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: true,
							min: 100,
							enabled: true,
							average_time: {
								en: "4 Hours",
								fr: "4 Heures",
							},
							description: {
								en: "MAKE SURE THE GROUP IS PUBLIC , NOT PRIVATE OR ELSE YOUR ORDER WILL BE CANCELLED !!!|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "ASSUREZ-VOUS QUE LE GROUPE EST PUBLIC ET NON PRIVÉ, SINON VOTRE COMMANDE SERA ANNULÉE !!!|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							rate: {
								xaf: 600,
							},
							price_text: {
								xaf: {
									en: "(600XAF / 1K Members)",
									fr: "(600XAF / 1K Membres)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 600XAF / 1K Members|Average Completion Time: 4 Hours|Guarantee: 3 Months",
									fr: "Prix: 600XAF / 1K Membres|Temps moyen de réalisation: 4 Heures|Garantie: 3 Mois",
								},
							},
							max: 50000,
						},
					},
				},
				facebook_video_views: {
					category_name: "facebook",
					order_position: 6,
					service_id: "facebook_video_views",
					display_name: {
						en: "Video/Reel Views",
						fr: "Vues Video/Reel",
					},
					enabled: true,
					subservices: {
						facebook_video_views_avg_quality: {
							youtube_tutorial: {
								en: "",
								fr: "https://youtu.be/2rEwXp2xxRI",
							},
							description: {
								en: "Make sure the video is from an account that's not private !|If you have purchased views before and want to purchase again for the same video, make sure your previous order was completed already !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Assurez vous que la vidéo provient d'un compte qui n'est pas privé !|Si vous avez déjà acheté des vues et que vous souhaitez en acheter à nouveau pour la même video , assurez vous que votre commande précédente est déjà terminée !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 500,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Facebook video/reel link:",
								fr: "Lien vers la vidéo/réel Facebook:",
							},
							display_name: {
								en: "Average Quality Views",
								fr: "Vues de qualité moyenne",
							},
							subservice_id: "facebook_video_views_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							max: 10000000,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							rate: {
								xaf: 150,
							},
							price_text: {
								xaf: {
									en: "(150 XAF / 1K Views)",
									fr: "(150 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 150XAF / 1k Views|Average Completion Time: 1 Hour|Guarantee: 1 Month",
									fr: "Prix: 150XAF / 1K Vues|Temps moyen de réalisation: 1 Heure|Garantie: 1 Mois",
								},
							},
							block_duplicate_orders: false,
						},
						facebook_video_views_high_quality: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "",
								fr: "https://youtu.be/2rEwXp2xxRI",
							},
							description: {
								en: "Make sure the video is from an account that's not private !|If you have purchased views before and want to purchase again for the same video, make sure your previous order was completed already !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Assurez vous que la vidéo provient d'un compte qui n'est pas privé !|Si vous avez déjà acheté des vues et que vous souhaitez en acheter à nouveau pour la même video , assurez vous que votre commande précédente est déjà terminée !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 500,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Facebook video/reel link:",
								fr: "Lien vers la vidéo/réel Facebook:",
							},
							display_name: {
								en: "High Quality Views",
								fr: "Vues de haute qualité",
							},
							subservice_id: "facebook_video_views_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							max: 20000000,
							rate: {
								xaf: 300,
							},
							price_text: {
								xaf: {
									en: "(300 XAF / 1K Views)",
									fr: "(300  XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 300XAF / 1k Views|Average Completion Time: 30 Minutes|Guarantee: 3 Months",
									fr: "Prix: 300XAF / 1K Vues|Temps moyen de réalisation: 30 Minutes|Garantie: 3 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
					},
				},
				facebook_custom_comments: {
					category_name: "facebook",
					order_position: 7,
					service_id: "facebook_custom_comments",
					display_name: {
						en: "Custom Comments",
						fr: "Commentaires personnalisés",
					},
					enabled: true,
					subservices: {
						facebook_custom_comments_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/7E-x5_UXsAQ?si=N-ixADFdlw1n7ezZ",
								fr: "https://youtu.be/hi6YfbI9nb4",
							},
							description: {
								en: "Make sure the post is from an account that's not private !|If you have purchased comments before and want to purchase again for the same post, make sure your previous order was completed already !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Assurez vous que la publication provient d'un compte qui n'est pas privé !|Si vous avez déjà acheté des commentaires et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							link_check: true,
							type: "custom_comments",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your comments are on the way !",
								fr: "Vos commentaires sont en chemin !",
							},
							link_field_text: {
								en: "Post link:",
								fr: "Lien de la publication Facebook:",
							},
							display_name: {
								en: "Average Quality Comments",
								fr: "Commentaires de qualité moyenne",
							},
							subservice_id: "facebook_custom_comments_avg_quality",
							comments_seperator_text: {
								en: "(Seperate each comment by moving to a new line)",
								fr: "(Séparez chaque commentaire en passant à une nouvelle ligne)",
							},
							order_position: 1,
							min: 10,
							average_time: {
								en: "14 Hours",
								fr: "14 Heures",
							},
							max: 1000,
							rate: {
								xaf: 20000,
							},
							price_text: {
								xaf: {
									en: "(200XAF / 10 Comments)",
									fr: "(200XAF / 10 Commentaires)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 200XAF / 10 Comments|Average Completion Time: 14 Hours|Guarantee: 1 Month",
									fr: "Prix: 200XAF / 10 Commentaires|Temps moyen de réalisation: 14 Heures|Garantie: 1 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
						facebook_custom_comments_high_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/7E-x5_UXsAQ?si=N-ixADFdlw1n7ezZ",
								fr: "https://youtu.be/hi6YfbI9nb4",
							},
							description: {
								en: "Make sure the post is from an account that's not private !|If you have purchased comments before and want to purchase again for the same post, make sure your previous order was completed already !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Assurez vous que la publication provient d'un compte qui n'est pas privé !|Si vous avez déjà acheté des commentaires et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							link_check: true,
							type: "custom_comments",
							enabled: true,
							min: 10,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your comments are on the way !",
								fr: "Vos commentaires sont en chemin !",
							},
							link_field_text: {
								en: "Post link:",
								fr: "Lien de la publication Facebook:",
							},
							max: 250,
							display_name: {
								en: "High Quality Comments",
								fr: "Commentaires de haute qualité",
							},
							subservice_id: "facebook_custom_comments_high_quality",
							comments_seperator_text: {
								en: "(Seperate each comment by moving to a new line)",
								fr: "(Séparez chaque commentaire en passant à une nouvelle ligne)",
							},
							order_position: 2,
							rate: {
								xaf: 65000,
							},
							price_text: {
								xaf: {
									en: "(650XAF / 10 Comments)",
									fr: "(650XAF / 10 Commentaires)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 650XAF / 10 Comments|Average Completion Time: 14 Hours|Guarantee: 2 Months",
									fr: "Prix: 650XAF / 10 Commentaires|Temps moyen de réalisation: 14 Heures|Garantie: 2 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
							average_time: {
								en: "14 Hours",
								fr: "14 Heures",
							},
						},
					},
				},
				facebook_page_reviews: {
					category_name: "facebook",
					order_position: 8,
					service_id: "facebook_page_reviews",
					display_name: {
						en: "Page Reviews",
						fr: "Avis Pour Votre Page",
					},
					enabled: true,
					subservices: {
						facebook_avg_quality_reviews: {
							link_check: true,
							type: "custom_comments",
							enabled: true,
							min: 5,
							multiple_of_10_enforced: false,
							link_field_text: {
								en: "Facebook Page Link:",
								fr: "Lien de la page Facebook:",
							},
							subservice_id: "facebook_avg_quality_reviews",
							comments_seperator_text: {
								en: "(Seperate each review by moving to a new line)",
								fr: "(Séparez chaque avis en passant à une nouvelle ligne)",
							},
							order_position: 1,
							display_name: {
								en: "Average Quality Reviews",
								fr: "Avis de qualité moyenne",
							},
							purchase_success_text: {
								en: "Your reviews are on the way !",
								fr: "Vos avis sont en chemin !",
							},
							max: 500,
							youtube_tutorial: {
								en: "",
								fr: "",
							},
							description: {
								en: "Mostly male UK accounts will drop the reviews !",
								fr: "Ce sont des comptes Européens qui effectuent les avis !",
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
							average_time: {
								en: "10 Hours",
								fr: "10 Heures",
							},
							rate: {
								xaf: 60000,
							},
							price_text: {
								xaf: {
									en: "(600XAF / 10 Reviews)",
									fr: "(600XAF / 10 Avis)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 600XAF / 10 Reviews |Average Completion Time: 10 Hours|Guarantee: 3 Months",
									fr: "Prix: 600XAF / 10 Avis|Temps moyen de réalisation: 10 Heures|Garantie: 3 Mois",
								},
							},
						},
						facebook_high_quality_page_reviews: {
							youtube_tutorial: {
								en: "",
								fr: "",
							},
							description: {
								en: "Mostly male UK accounts will drop the reviews !",
								fr: "Ce sont des comptes Européens qui effectuent les avis !",
							},
							link_check: true,
							type: "custom_comments",
							enabled: true,
							min: 5,
							rate: {
								xaf: 680000,
							},
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your reviews are on the way !",
								fr: "Vos avis sont en chemin !",
							},
							link_field_text: {
								en: "Facebook Page Link:",
								fr: "Lien de la page Facebook:",
							},
							max: 100,
							price_text: {
								xaf: {
									en: "(6800XAF / 10 Reviews)",
									fr: "(6800XAF / 10 Avis)",
								},
							},
							display_name: {
								en: "High Quality Reviews",
								fr: "Avis de haute qualité",
							},
							subservice_id: "facebook_high_quality_page_reviews",
							comments_seperator_text: {
								en: "(Seperate each review by moving to a new line)",
								fr: "(Séparez chaque avis en passant à une nouvelle ligne)",
							},
							order_position: 2,
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
							average_time: {
								en: "10 Hours",
								fr: "10 Heures",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 6800XAF / 10 Reviews |Average Completion Time: 10 Hours|Guarantee: 1 Year",
									fr: "Prix: 6800XAF / 10 Avis|Temps moyen de réalisation: 10 Heures|Garantie: 1 An",
								},
							},
						},
					},
				},
			},
		},
		telegram: {
			order_position: 4,
			display_name: {
				en: "Telegram",
				fr: "Telegram",
			},
			code_name: "telegram",
			enabled: true,
			thumbnail_url:
				"https://firebasestorage.googleapis.com/v0/b/exobooster-59de3.appspot.com/o/categoriesthumbnails%2Ftelegram_logo_200x200.webp?alt=media&token=1bc27582-f108-4e8e-aa7c-f05ce0f6d4ad",
			services: {
				telegram_members: {
					category_name: "telegram",
					order_position: 1,
					service_id: "telegram_members",
					display_name: {
						en: "Group/Channel Members",
						fr: "Membres pour votre Groupe/Canal",
					},
					enabled: true,
					subservices: {
						telegram_members_avg_quality: {
							link_check: true,
							type: "default",
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your members are on the way !",
								fr: "Vos membres sont en chemin !",
							},
							link_field_text: {
								en: "Group/Channel Link:",
								fr: "Lien du groupe/canal Telegram:",
							},
							display_name: {
								en: "Average Quality Members",
								fr: "Membres de qualité moyenne",
							},
							subservice_id: "telegram_members_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							youtube_tutorial: {
								en: "https://youtu.be/GeJRpy23QE4?si=fvrIla02I6-l4aT2",
								fr: "https://youtu.be/BHTJhVF0b8A",
							},
							order_position: 2,
							min: 500,
							max: 100000,
							average_time: {
								en: "4 Hours",
								fr: "4 Heures",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							block_duplicate_orders: true,
							description: {
								en: "Don't change the channel/group username while members are been added !|There's no drop in members !|10% chance that the members will have normal english names, otherwise they are asian members|Average quality means a shorter guarantee, semi-reel looking accounts/engagements, and average drops",
								fr: "Ne changez pas le nom d'utilisateur du canal/groupe pendant que des membres sont ajoutés !|Il n'y a pas de baisse du nombre de membres !|10% de chances que les membres aient des noms anglais normaux, sinon ce sont des membres asiatiques|Une moyenne signifie une garantie plus courte, des comptes/engagements d'apparence semi-réelle et moins de chutes",
							},
							rate: {
								xaf: 1500,
							},
							price_text: {
								xaf: {
									en: "(1500XAF / 1K Members)",
									fr: "(1500XAF / 1K Membres)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1500XAF / 1K Members|Average Completion Time: 4 Hours|Guarantee: 2 Months",
									fr: "Prix: 1500XAF / 1K Membres|Temps moyen de réalisation: 4 Heures|Garantie: 2 Mois",
								},
							},
							enabled: true,
						},
						telegram_members_high_quality: {
							link_check: true,
							type: "default",
							enabled: true,
							min: 500,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your members are on the way !",
								fr: "Vos membres sont en chemin !",
							},
							link_field_text: {
								en: "Group/Channel Link:",
								fr: "Lien du groupe/canal Telegram:",
							},
							display_name: {
								en: "High Quality Members",
								fr: "Membres de haute qualité",
							},
							subservice_id: "telegram_members_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							youtube_tutorial: {
								en: "https://youtu.be/GeJRpy23QE4?si=fvrIla02I6-l4aT2",
								fr: "https://youtu.be/BHTJhVF0b8A",
							},
							order_position: 3,
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							average_time: {
								en: "2 Hours",
								fr: "2 Heures",
							},
							max: 100000,
							block_duplicate_orders: true,
							description: {
								en: "Don't change the channel/group username while members are been added !|There's no drop in members !|10% chance that the members will have normal english names, otherwise they are asian members|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Ne changez pas le nom d'utilisateur du canal/groupe pendant que des membres sont ajoutés !|Il n'y a pas de baisse du nombre de membres !|10% de chances que les membres aient des noms anglais normaux, sinon ce sont des membres asiatiques|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							rate: {
								xaf: 1600,
							},
							price_text: {
								xaf: {
									en: "(1600XAF / 1K Members)",
									fr: "(1600XAF / 1K Membres)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1600XAF / 1K Members|Average Completion Time: 2 Hours|Guarantee: 6 Months",
									fr: "Prix: 1600XAF / 1K Membres|Temps moyen de réalisation: 2 Heures|Garantie: 6 Mois",
								},
							},
						},
					},
				},
				telegram_views: {
					category_name: "telegram",
					order_position: 2,
					service_id: "telegram_views",
					enabled: true,
					display_name: {
						fr: "Vues pour une publication specifique",
						en: "Post Views (Specific Post)",
					},
					subservices: {
						telegram_views_one_post: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Post link:",
								fr: "Lien de la publication:",
							},
							display_name: {
								en: "Views for a specific post",
								fr: "Vues pour une publication spécifique",
							},
							subservice_id: "telegram_views_one_post",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							youtube_tutorial: {
								en: "https://youtu.be/ZhfW-v4Oru8?si=TwIVkCbGwNDSk7rv",
								fr: "https://youtu.be/RHzMUybsZy8",
							},
							min: 50,
							average_time: {
								en: "10 Minutes",
								fr: "10 Minutes",
							},
							max: 50000,
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/([^\\s/]+)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							rate: {
								xaf: 20,
							},
							price_text: {
								xaf: {
									en: "(20 XAF / 1K Views)",
									fr: "(20 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 20XAF / 1k Views|Average Completion Time: 10 Minutes|Guarantee: 1 Year",
									fr: "Prix: 20XAF / 1K Vues|Temps moyen de réalisation: 10 Minutes|Garantie: 1 An",
								},
							},
							block_duplicate_orders: false,
							description: {
								en: "DUE TO A RECENT UPDATE ON THE TELEGRAM APP FOR ANDROID, IF YOUR TELEGRAM MESSAGE CONTAINS MULTIPLE PHOTOS THEN YOU MIGHT NOT BE ABLE TO SEE THE VIEWS PURCHASED , BUT IF YOU OPEN THE MESSAGE ON IPHONE/COMPUTER YOU WILL SEE THE VIEWS, SO KEEP THAT IN MIND WHEN POSTING ON TELEGRAM !!|Views can be added only to posts in a public Channel, not Groups !",
								fr: "EN RAISON D'UNE RÉCENTE MISE À JOUR DE L'APPLICATION TELEGRAM POUR ANDROID, SI VOTRE MESSAGE TELEGRAM CONTIENT PLUSIEURS PHOTOS, IL SE PEUT QUE VOUS NE PUISSIEZ PAS VOIR LES VUES ACHETÉES, MAIS SI VOUS OUVREZ LE MESSAGE SUR IPHONE/ORDINATEUR, VOUS VERREZ LES VUES, ALORS GARDEZ CELA EN TETE LORSQUE VOUS PUBLIEZ SUR TELEGRAM !|Les vues ne peuvent être ajoutées qu'aux messages d'un canal publique, pas aux groupes !",
							},
						},
					},
				},
				telegram_views_previous_posts: {
					category_name: "telegram",
					order_position: 3,
					service_id: "telegram_views_previous_posts",
					display_name: {
						en: "Post Views (Previous Posts)",
						fr: "Vues pour vos publications précédents",
					},
					enabled: true,
					subservices: {
						telegram_views_last_20_posts: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/sWJLVauUD_U?si=zVEe-NqgW9K-X3B9",
								fr: "https://youtu.be/1s2eQOVDouM",
							},
							link_check: true,
							type: "default",
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Channel link:",
								fr: "Lien du Canal Telegram :",
							},
							display_name: {
								en: "Views for your last 20 Posts",
								fr: "Vues pour vos 20 derniers publications",
							},
							subservice_id: "telegram_views_last_20_posts",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/[^+]([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							min: 100,
							rate: {
								xaf: 400,
							},
							max: 300000,
							price_text: {
								xaf: {
									en: "(400 XAF / 1K Views)",
									fr: "(400 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 400XAF / 1k Views|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix: 400XAF / 1K Vues|Temps moyen de réalisation: 30 Minutes|Garantie: 1 An",
								},
							},
							enabled: true,
							block_duplicate_orders: false,
							description: {
								en: "Due to a recent telegram update, if you post more than 1 picture/video per post, then each picture is considered as a seperate post, TAKE NOTE !|Views can only be added to public channels , not groups !!",
								fr: "En raison d'une récente mise à jour de Telegram, si vous postez plus d'une image/vidéo par message, chaque image est considérée comme un message séparé !|Les vues ne peuvent être ajoutées qu'aux canals publique, pas aux groupes !",
							},
						},
						telegram_views_last_30_posts: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/sWJLVauUD_U?si=zVEe-NqgW9K-X3B9",
								fr: "https://youtu.be/1s2eQOVDouM",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Channel link:",
								fr: "Lien du Canal Telegram :",
							},
							subservice_id: "telegram_views_last_30_posts",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							display_name: {
								en: "Views for your last 50 Posts",
								fr: "Vues pour vos 50 derniers publications",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/[^+]([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							min: 100,
							rate: {
								xaf: 850,
							},
							max: 300000,
							price_text: {
								xaf: {
									en: "(850 XAF / 1K Views)",
									fr: "(850 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 850XAF / 1k Views|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix: 850XAF / 1K Vues|Temps moyen de réalisation: 30 Minutes|Garantie: 1 An",
								},
							},
							block_duplicate_orders: false,
							description: {
								en: "Due to a recent telegram update, if you post more than 1 picture per post, then each picture is considered as a seperate post, TAKE NOTE !|Views can only be added to public channels , not groups !!",
								fr: "En raison d'une récente mise à jour de Telegram, si vous postez plus d'une image/vidéo par message, chaque image est considérée comme un message séparé !|Les vues ne peuvent être ajoutées qu'aux canals publique, pas aux groupes !",
							},
						},
						telegram_views_last_200_posts: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/sWJLVauUD_U?si=zVEe-NqgW9K-X3B9",
								fr: "https://youtu.be/1s2eQOVDouM",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Channel link:",
								fr: "Lien du Canal Telegram:",
							},
							subservice_id: "telegram_views_last_200_posts",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 4,
							display_name: {
								en: "Views for your last 100 Posts",
								fr: "Vues pour vos 100 derniers publications",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/[^+]([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							min: 100,
							rate: {
								xaf: 1600,
							},
							price_text: {
								xaf: {
									en: "(1600 XAF / 1K Views)",
									fr: "(1600 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1600XAF / 1k Views|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix: 1600XAF / 1K Vues|Temps moyen de réalisation: 30 Minutes|Garantie: 1 An",
								},
							},
							max: 300000,
							block_duplicate_orders: false,
							description: {
								en: "Due to a recent telegram update, if you post more than 1 picture/video per post, then each picture is considered as a seperate post, TAKE NOTE !|Views can only be added to public channels , not groups !!",
								fr: "En raison d'une récente mise à jour de Telegram, si vous postez plus d'une image/vidéo par message, chaque image est considérée comme un message séparé !|Les vues ne peuvent être ajoutées qu'aux canals publique, pas aux groupes !",
							},
						},
					},
				},
				telegram_views_future_posts: {
					category_name: "telegram",
					service_id: "telegram_views_future_posts",
					order_position: 4,
					display_name: {
						en: "Post Views (Future Posts)",
						fr: "Vues pour vos futurs publications",
					},
					enabled: true,
					subservices: {
						telegram_views_20_future_posts: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Channel link:",
								fr: "Lien du Canal Telegram :",
							},
							subservice_id: "telegram_views_20_future_posts",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							youtube_tutorial: {
								en: "https://youtu.be/cA-oT7IC9ns?si=lMW6r8g8JDAG0YlX",
								fr: "https://youtu.be/Q8LV-1xgrk4",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/[^+]([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							rate: {
								xaf: 400,
							},
							price_text: {
								xaf: {
									en: "(400 XAF / 1K Views)",
									fr: "(400 XAF / 1K Vues)",
								},
							},
							block_duplicate_orders: false,
							min: 50,
							average_time: {
								en: "20 Minutes",
								fr: "20 Minutes",
							},
							max: 50000,
							display_name: {
								en: "Views for your 20 future posts",
								fr: "Vues pour vos 20 futurs publications",
							},
							sub_display_name: {
								xaf: {
									en: "Price: 400XAF / 1k Views|Average Completion Time: 20 Minutes|Guarantee: 1 Year",
									fr: "Prix: 400XAF / 1K Vues|Temps moyen de réalisation: 20 Minutes|Garantie: 1 An",
								},
							},
							description: {
								en: "NOT ALL CHANNELS CAN GET FUTURE VIEWS, SO TEST WITH A SMALL QUANTITY FIRST, IF IT WORKS FOR YOUR CHANNEL THEN YOU CAN KEEP ON USING IT , OTHERWISE YOU'LL HAVE TO USE SPECIFIC POST VIEWS, ZERO REFUNDS IF YOU DON'T READ THIS ⚠️ ⚠️ |Views can be added only to posts in a Channel, not Groups !|When your order is complete, you can start posting in your channel, views will be added automatically to the posts within 15-20 minutes after you've posted them|DO NOT CHANGE YOUR TELEGRAM CHANNEL USERNAME AFTER YOU HAVE BOUGHT FUTURE VIEWS, OR ELSE THEY WON'T APLY TO YOUR CHANNEL ANYMORE !!!",
								fr: "PAS TOUT LES CANALS PEUVENT OBTENIR DES VUES POUR LES FUTURS PUBLICATIONS, ALORS TESTEZ D'ABORD AVEC UNE PETITE QUANTITÉ, SI CELA FONCTIONNE POUR VOTRE CANAL, VOUS POUVEZ CONTINUER À L'UTILISER, SINON VOUS DEVREZ UTILISER DES VUES POUR PUBLICATIONS SPÉCIFIQUES, AUCUN REMBOURSEMENT SI VOUS NE LISEZ PAS CECI ⚠️ ⚠️|Les vues ne peuvent être ajoutées qu'aux messages d'un canal, pas aux groupes !|Lorsque votre commande est terminée, vous pouvez commencer à publier des messages sur votre canal. Les vues seront ajoutées automatiquement aux messages dans les 15 à 20 minutes qui suivent leur publication|NE CHANGEZ PAS LE NOM D'UTILISATEUR DE VOTRE CANAL TELEGRAM APRÈS AVOIR ACHETÉ DES VUES FUTURES, SINON ELLES NE S'APPLIQUERONT PLUS À VOTRE CANAL !!!",
							},
						},
						telegram_views_50_future_posts: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Channel link:",
								fr: "Lien du Canal Telegram:",
							},
							display_name: {
								en: "Views for your 50 future posts",
								fr: "Vues pour vos 50 futurs publications",
							},
							subservice_id: "telegram_views_50_future_posts",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							youtube_tutorial: {
								en: "https://youtu.be/cA-oT7IC9ns?si=lMW6r8g8JDAG0YlX",
								fr: "https://youtu.be/Q8LV-1xgrk4",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/[^+]([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							block_duplicate_orders: false,
							min: 50,
							average_time: {
								en: "20 Minutes",
								fr: "20 Minutes",
							},
							rate: {
								xaf: 1000,
							},
							max: 50000,
							price_text: {
								xaf: {
									en: "(1000 XAF / 1K Views)",
									fr: "(1000 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1000XAF / 1k Views|Average Completion Time: 20 Minutes|Guarantee: 1 Year",
									fr: "Prix: 1000XAF / 1K Vues|Temps moyen de réalisation: 20 Minutes|Garantie: 1 An",
								},
							},
							description: {
								en: "NOT ALL CHANNELS CAN GET FUTURE VIEWS, SO TEST WITH A SMALL QUANTITY FIRST, IF IT WORKS FOR YOUR CHANNEL THEN YOU CAN KEEP ON USING IT , OTHERWISE YOU'LL HAVE TO USE SPECIFIC POST VIEWS, ZERO REFUNDS IF YOU DON'T READ THIS ⚠️ ⚠️|Views can be added only to posts in a Channel, not Groups !|When your order is complete, you can start posting in your channel, views will be added automatically to the posts within 15-20 minutes after you've posted them|DO NOT CHANGE YOUR TELEGRAM CHANNEL USERNAME AFTER YOU HAVE BOUGHT FUTURE VIEWS, OR ELSE THEY WON'T APLY TO YOUR CHANNEL ANYMORE !!!",
								fr: "PAS TOUT LES CANALS PEUVENT OBTENIR DES VUES POUR LES FUTURS PUBLICATIONS, ALORS TESTEZ D'ABORD AVEC UNE PETITE QUANTITÉ, SI CELA FONCTIONNE POUR VOTRE CANAL, VOUS POUVEZ CONTINUER À L'UTILISER, SINON VOUS DEVREZ UTILISER DES VUES POUR PUBLICATIONS SPÉCIFIQUES, AUCUN REMBOURSEMENT SI VOUS NE LISEZ PAS CECI ⚠️ ⚠️|Les vues ne peuvent être ajoutées qu'aux messages d'un canal, pas aux groupes !|Lorsque votre commande est terminée, vous pouvez commencer à publier des messages sur votre canal. Les vues seront ajoutées automatiquement aux messages dans les 15 à 20 minutes qui suivent leur publication|NE CHANGEZ PAS LE NOM D'UTILISATEUR DE VOTRE CANAL TELEGRAM APRÈS AVOIR ACHETÉ DES VUES FUTURES, SINON ELLES NE S'APPLIQUERONT PLUS À VOTRE CANAL !!!",
							},
						},
						telegram_views_100_future_posts: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Channel link:",
								fr: "Lien du Canal Telegram:",
							},
							display_name: {
								en: "Views for your 100 future posts",
								fr: "Vues pour vos 100 futurs publications",
							},
							subservice_id: "telegram_views_100_future_posts",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 3,
							youtube_tutorial: {
								en: "https://youtu.be/cA-oT7IC9ns?si=lMW6r8g8JDAG0YlX",
								fr: "https://youtu.be/Q8LV-1xgrk4",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/[^+]([^\\s/]+)\\/?(\\?([^\\/\\s]+)?)?$",
							block_duplicate_orders: false,
							min: 50,
							average_time: {
								en: "20 Minutes",
								fr: "20 Minutes",
							},
							rate: {
								xaf: 2000,
							},
							max: 50000,
							price_text: {
								xaf: {
									en: "(2000 XAF / 1K Views)",
									fr: "(2000 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 2000XAF / 1k Views|Average Completion Time: 20 Minutes|Guarantee: 1 Year",
									fr: "Prix: 2000XAF / 1K Vues|Temps moyen de réalisation: 20 Minutes|Garantie: 1 An",
								},
							},
							description: {
								en: "NOT ALL CHANNELS CAN GET FUTURE VIEWS, SO TEST WITH A SMALL QUANTITY FIRST, IF IT WORKS FOR YOUR CHANNEL THEN YOU CAN KEEP ON USING IT , OTHERWISE YOU'LL HAVE TO USE SPECIFIC POST VIEWS, ZERO REFUNDS IF YOU DON'T READ THIS ⚠️ ⚠️|Views can be added only to posts in a Channel, not Groups !|When your order is complete, you can start posting in your channel, views will be added automatically to the posts within 15-20 minutes after you've posted them|DO NOT CHANGE YOUR TELEGRAM CHANNEL USERNAME AFTER YOU HAVE BOUGHT FUTURE VIEWS, OR ELSE THEY WON'T APLY TO YOUR CHANNEL ANYMORE !!!",
								fr: "PAS TOUT LES CANALS PEUVENT OBTENIR DES VUES POUR LES FUTURS PUBLICATIONS, ALORS TESTEZ D'ABORD AVEC UNE PETITE QUANTITÉ, SI CELA FONCTIONNE POUR VOTRE CANAL, VOUS POUVEZ CONTINUER À L'UTILISER, SINON VOUS DEVREZ UTILISER DES VUES POUR PUBLICATIONS SPÉCIFIQUES, AUCUN REMBOURSEMENT SI VOUS NE LISEZ PAS CECI ⚠️ ⚠️|Les vues ne peuvent être ajoutées qu'aux messages d'un canal, pas aux groupes !|Lorsque votre commande est terminée, vous pouvez commencer à publier des messages sur votre canal. Les vues seront ajoutées automatiquement aux messages dans les 15 à 20 minutes qui suivent leur publication|NE CHANGEZ PAS LE NOM D'UTILISATEUR DE VOTRE CANAL TELEGRAM APRÈS AVOIR ACHETÉ DES VUES FUTURES, SINON ELLES NE S'APPLIQUERONT PLUS À VOTRE CANAL !!!",
							},
						},
					},
				},
				telegram_reactions: {
					category_name: "telegram",
					service_id: "telegram_reactions",
					display_name: {
						en: "Post Reactions",
						fr: "Réactions pour votre publication",
					},
					enabled: true,
					order_position: 5,
					subservices: {
						telegram_reactions_average_quality: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your reactions are on the way !",
								fr: "Vos réactions sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Post link:",
								fr: "Lien de la publication:",
							},
							subservice_id: "telegram_reactions_average_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							youtube_tutorial: {
								en: "https://youtu.be/SRSNFTCXRzo?si=2jLAs3FFcimT9gtu",
								fr: "https://youtu.be/AH6DIUStHLc",
							},
							display_name: {
								en: "Reactions (👍❤️👏🔥🥰🤩🎉😁)",
								fr: "Réactions (👍❤️👏🔥🥰🤩🎉😁)",
							},
							description: {
								en: "These reactions are for a specific post !|Works only for posts in a PUBLIC channel",
								fr: "Ces réactions sont pour une publication spécifique !|Ne fonctionne que pour les messages publiés dans un canal PUBLIQUE",
							},
							average_time: {
								en: "1 hour",
								fr: "1 Heure",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/([^\\s/]+)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							rate: {
								xaf: 50,
							},
							price_text: {
								xaf: {
									en: "(50 XAF / 1K Reactions)",
									fr: "(50 XAF / 1K Réactions )",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 50XAF / 1k Reactions|Average Completion Time: 1 Hour|Guarantee: 1 Year",
									fr: "Prix: 50XAF / 1K Réactions|Temps moyen de réalisation: 1 Heure|Garantie: 1 An",
								},
							},
							block_duplicate_orders: false,
							min: 10,
							max: 50000,
						},
						telegram_reactions_high_quality: {
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your reactions are on the way !",
								fr: "Vos réactions sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Post link:",
								fr: "Lien de la publication:",
							},
							subservice_id: "telegram_reactions_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							youtube_tutorial: {
								en: "https://youtu.be/SRSNFTCXRzo?si=2jLAs3FFcimT9gtu",
								fr: "https://youtu.be/AH6DIUStHLc",
							},
							max: 50000,
							description: {
								en: "These reactions are for a specific post !|Works only for posts in a PUBLIC channel",
								fr: "Ces réactions sont pour une publication spécifique !|Ne fonctionne que pour les messages publiés sur un canal PUBLIQUE",
							},
							display_name: {
								en: "Reactions (👎💩😢🤮😱)",
								fr: "Réactions (👎💩😢🤮😱)",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/([^\\s/]+)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							min: 10,
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							rate: {
								xaf: 50,
							},
							price_text: {
								xaf: {
									en: "(50 XAF / 1K Reactions)",
									fr: "(50 XAF / 1K Réactions )",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 50XAF / 1k Reactions|Average Completion Time: 1 Hour|Guarantee: 1 Year",
									fr: "Prix: 50XAF / 1K Réactions|Temps moyen de réalisation: 1 Heure|Garantie: 1 An",
								},
							},
							block_duplicate_orders: false,
						},
						telegram_reactions_three: {
							youtube_tutorial: {
								en: "https://youtu.be/SRSNFTCXRzo?si=2jLAs3FFcimT9gtu",
								fr: "https://youtu.be/AH6DIUStHLc",
							},
							description: {
								en: "These reactions are for a specific post !|Works only for posts in a PUBLIC channel",
								fr: "Ces réactions sont pour une publication spécifique !|Ne fonctionne que pour les messages publiés dans un canal PUBLIQUE",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your reactions are on the way !",
								fr: "Vos réactions sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Post link:",
								fr: "Lien de la publication:",
							},
							display_name: {
								en: "Reactions (👍)",
								fr: "Réactions (👍)",
							},
							subservice_id: "telegram_reactions_three",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 3,
							average_time: {
								en: "30 minutes",
								fr: "30 minutes",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/([^\\s/]+)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							rate: {
								xaf: 50,
							},
							price_text: {
								xaf: {
									en: "(50 XAF / 1K Reactions)",
									fr: "(50 XAF / 1K Réactions )",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 50XAF / 1k Reactions|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix: 50XAF / 1K Réactions|Temps moyen de réalisation: 30 Minutes|Garantie: 1 An",
								},
							},
							block_duplicate_orders: false,
							min: 10,
							max: 50000,
						},
						telegram_reactions_four: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/SRSNFTCXRzo?si=2jLAs3FFcimT9gtu",
								fr: "https://youtu.be/AH6DIUStHLc",
							},
							description: {
								en: "These reactions are for a specific post !|Works only for posts in a PUBLIC channel",
								fr: "Ces réactions sont pour une publication spécifique !|Ne fonctionne que pour les messages publiés dans un canal PUBLIQUE",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your reactions are on the way !",
								fr: "Vos réactions sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Post link:",
								fr: "Lien de la publication:",
							},
							display_name: {
								en: "Reactions (💯)",
								fr: "Réactions (💯)",
							},
							subservice_id: "telegram_reactions_four",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 4,
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/([^\\s/]+)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							rate: {
								xaf: 50,
							},
							price_text: {
								xaf: {
									en: "(50 XAF / 1K Reactions)",
									fr: "(50 XAF / 1K Réactions )",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 50XAF / 1k Reactions|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix: 50XAF / 1K Réactions|Temps moyen de réalisation: 30 Minutes|Garantie: 1 An",
								},
							},
							block_duplicate_orders: false,
							min: 10,
							max: 50000,
						},
						telegram_reactions_five: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/SRSNFTCXRzo?si=2jLAs3FFcimT9gtu",
								fr: "https://youtu.be/AH6DIUStHLc",
							},
							description: {
								en: "These reactions are for a specific post !|Works only for posts in a PUBLIC channel",
								fr: "Ces réactions sont pour une publication spécifique !|Ne fonctionne que pour les messages publiés dans un canal PUBLIQUE",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your reactions are on the way !",
								fr: "Vos réactions sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Post link:",
								fr: "Lien de la publication:",
							},
							subservice_id: "telegram_reactions_five",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 5,
							display_name: {
								en: "Reactions (🔥)",
								fr: "Réactions (🔥)",
							},
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/([^\\s/]+)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							rate: {
								xaf: 50,
							},
							price_text: {
								xaf: {
									en: "(50 XAF / 1K Reactions)",
									fr: "(50 XAF / 1K Réactions )",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 50XAF / 1k Reactions|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix: 50XAF / 1K Réactions|Temps moyen de réalisation: 30 Minutes|Garantie: 1 An",
								},
							},
							block_duplicate_orders: false,
							min: 10,
							max: 50000,
						},
						telegram_reactions_six: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/SRSNFTCXRzo?si=2jLAs3FFcimT9gtu",
								fr: "https://youtu.be/AH6DIUStHLc",
							},
							description: {
								en: "These reactions are for a specific post !|Works only for posts in a PUBLIC channel",
								fr: "Ces réactions sont pour une publication spécifique !|Ne fonctionne que pour les messages publiés dans un canal PUBLIQUE",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your reactions are on the way !",
								fr: "Vos réactions sont en chemin !",
							},
							link_field_text: {
								en: "Telegram Post link:",
								fr: "Lien de la publication:",
							},
							display_name: {
								en: "Reactions (❤️)",
								fr: "Réactions (❤️)",
							},
							subservice_id: "telegram_reactions_six",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 6,
							validity_regex:
								"^(https?:\\/\\/)?(www\\.)?t\\.me\\/([^\\s/]+)\\/[^\\s/]+\\/?(\\?([^\\/\\s]+)?)?$",
							rate: {
								xaf: 50,
							},
							price_text: {
								xaf: {
									en: "(50 XAF / 1K Reactions)",
									fr: "(50 XAF / 1K Réactions )",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 50XAF / 1k Reactions|Average Completion Time: 30 Minutes|Guarantee: 1 Year",
									fr: "Prix: 50XAF / 1K Réactions|Temps moyen de réalisation: 30 Minutes|Garantie: 1 An",
								},
							},
							block_duplicate_orders: false,
							min: 10,
							max: 50000,
						},
					},
				},
			},
		},
		twitter: {
			order_position: 5,
			display_name: {
				en: "Twitter/X",
				fr: "Twitter/X",
			},
			code_name: "twitter",
			enabled: true,
			thumbnail_url:
				"https://firebasestorage.googleapis.com/v0/b/exobooster-59de3.appspot.com/o/categoriesthumbnails%2Ftwitter_logo_200x200.png?alt=media&token=d845a551-c7ab-4107-b4f7-516314a97791",
			services: {
				twitter_followers: {
					category_name: "twitter",
					order_position: 1,
					service_id: "twitter_followers",
					display_name: {
						en: "Followers",
						fr: "Abonnés",
					},
					enabled: true,
					subservices: {
						twitter_followers_average_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/vpnBXJqWEOM?si=ic8yBdzf8uddQXLj",
								fr: "",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos abonnés sont en chemin !",
							},
							link_field_text: {
								en: "Twitter account link:",
								fr: "le lien du compte Twitter:",
							},
							display_name: {
								en: "Average Quality Followers",
								fr: "Abonnés de Qualité Moyenne",
							},
							subservice_id: "twitter_followers_average_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							average_time: {
								en: "4 Hours",
								fr: "4 Heures",
							},
							max: 100000,
							rate: {
								xaf: 1150,
							},
							price_text: {
								xaf: {
									en: "(1150 XAF / 1k Followers)",
									fr: "(1150 XAF / 1k Abonnés)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1150XAF / 1k Followers|Average Completion Time: 4 Hours|Guarantee: 1 Month",
									fr: "Prix : 1150XAF / 1k Abonnés|Temps moyen de réalisation: 4 Heures|Garantie: 1 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							description: {
								en: "If you have purchased followers before and want to purchase again for the same account, make sure your previous order was completed already !|20-40% drop in followers is to be expected|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Si vous avez déjà acheté des followers et que vous souhaitez en acheter à nouveau pour le même compte , assurez vous que votre commande précédente est déjà terminée !|Il faut s'attendre à une baisse de 20 à 40 % du nombre abonnés.|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							block_duplicate_orders: false,
						},
						twitter_followers_high_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/vpnBXJqWEOM?si=ic8yBdzf8uddQXLj",
								fr: "",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your followers are on the way !",
								fr: "Vos abonnés sont en chemin !",
							},
							link_field_text: {
								en: "Twitter account link:",
								fr: "le lien du compte Twitter:",
							},
							display_name: {
								en: "High Quality Followers",
								fr: "Abonnés de Haute Qualité",
							},
							subservice_id: "twitter_followers_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							average_time: {
								en: "2 Hours",
								fr: "2 Heures",
							},
							max: 500000,
							rate: {
								xaf: 1550,
							},
							price_text: {
								xaf: {
									en: "(1550 XAF / 1k Followers)",
									fr: "(1550 XAF / 1k Abonnés)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1550XAF / 1k Followers|Average Completion Time: 3 Hours|Guarantee: 1 Month",
									fr: "Prix : 1550XAF / 1k Abonnés|Temps moyen de réalisation: 3 Heures|Garantie: 1 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							description: {
								en: "If you have purchased followers before and want to purchase again for the same account, make sure your previous order was completed already !|20-40% drop in followers is to be expected|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Si vous avez déjà acheté des followers et que vous souhaitez en acheter à nouveau pour le même compte , assurez vous que votre commande précédente est déjà terminée !|Il faut s'attendre à une baisse de 20 à 40 % du nombre abonnés.|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							block_duplicate_orders: false,
						},
					},
				},
				twitter_retweets: {
					category_name: "twitter",
					order_position: 2,
					service_id: "twitter_retweets",
					display_name: {
						en: "Retweets",
						fr: "Republications/Retweets",
					},
					enabled: true,
					subservices: {
						twitter_retweets_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/j_zoZZo5ULY?si=8njjiF_IKIE5oH05",
								fr: "",
							},
							description: {
								en: "If you have purchased retweets before and want to purchase again for the same post, make sure your previous order was completed already !|5-10% drop in retweets is to be expected|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Si vous avez déjà acheté des retweets et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Il faut s'attendre à une baisse de 5 à 10 % des retweets|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your retweets are on the way !",
								fr: "Vos retweets sont en chemin !",
							},
							link_field_text: {
								en: "Twitter Post link:",
								fr: "Le lien de la publication Twitter:",
							},
							display_name: {
								en: "Average Quality Retweets",
								fr: "Retweets de Qualité Moyenne",
							},
							subservice_id: "twitter_retweets_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							max: 50000,
							rate: {
								xaf: 1500,
							},
							price_text: {
								xaf: {
									en: "(1500 XAF / 1k Retweets)",
									fr: "(1500 XAF / 1k Retweets)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1500XAF / 1k Retweets|Average Completion Time: 1 Hour|Guarantee: 1 Month",
									fr: "Prix : 1500XAF / 1k Retweets|Temps moyen de réalisation: 1 Hour|Garantie: 1 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
						twitter_retweets_high_quality: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/j_zoZZo5ULY?si=8njjiF_IKIE5oH05",
								fr: "",
							},
							description: {
								en: "If you have purchased retweets before and want to purchase again for the same post, make sure your previous order was completed already !|5-10% drop in retweets is to be expected|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Si vous avez déjà acheté des retweets et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Il faut s'attendre à une baisse de 5 à 10 % des retweets|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							rate: {
								xaf: 2500,
							},
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your retweets are on the way !",
								fr: "Vos retweets sont en chemin !",
							},
							link_field_text: {
								en: "Twitter Post link:",
								fr: "Le lien de la publication Twitter:",
							},
							price_text: {
								xaf: {
									en: "(2500 XAF / 1k Retweets)",
									fr: "(2500 XAF / 1k Retweets)",
								},
							},
							display_name: {
								en: "High Quality Retweets",
								fr: "Retweets de Haute Qualité",
							},
							subservice_id: "twitter_retweets_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							min: 100,
							max: 10000000,
							sub_display_name: {
								xaf: {
									en: "Price: 2500XAF / 1k Retweets|Average Completion Time: 30 Minutes|Guarantee: 1 Month",
									fr: "Prix : 2500XAF / 1k Retweets|Temps moyen de réalisation: 30 Minutes|Garantie: 1 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
					},
				},
				twitter_likes: {
					category_name: "twitter",
					order_position: 3,
					service_id: "twitter_likes",
					display_name: {
						en: "Likes",
						fr: "J'aime",
					},
					enabled: true,
					subservices: {
						twitter_likes_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/krCNk501cmY?si=kb3gvzgQsFvwZ4Fk",
								fr: "",
							},
							description: {
								en: "If you have purchased likes before and want to purchase again for the same post, make sure your previous order was completed already !|5-10% drop in likes is to be expected|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Si vous avez déjà acheté des j'aime et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Il faut s'attendre à une baisse de 5 à 10 % du nombre de j'aime|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 10,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos J'aime sont en chemin !",
							},
							link_field_text: {
								en: "Twitter post link:",
								fr: "Lien de la publication Twitter:",
							},
							display_name: {
								en: "Average Quality Likes",
								fr: "J'aime De Qualité Moyenne",
							},
							subservice_id: "twitter_likes_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							average_time: {
								en: "2 Hours",
								fr: "2 Heures",
							},
							max: 10000,
							rate: {
								xaf: 900,
							},
							price_text: {
								xaf: {
									en: "(900 XAF / 1K Likes)",
									fr: "(900 XAF / 1K J'aime)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 900XAF / 1K Likes|Average Completion Time: 2 Hours|Guarantee: 1 Months",
									fr: "Prix: 900XAF / 1K J'aime|Temps moyen de réalisation: 2 Heures|Garantie: 1 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
						twitter_likes_high_quality: {
							average_time: {
								en: "30 Minutes",
								fr: "30 Minutes",
							},
							youtube_tutorial: {
								en: "https://youtu.be/krCNk501cmY?si=kb3gvzgQsFvwZ4Fk",
								fr: "",
							},
							description: {
								en: "If you have purchased likes before and want to purchase again for the same post, make sure your previous order was completed already !|5-10% drop in likes is to be expected|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Si vous avez déjà acheté des j'aime et que vous souhaitez en acheter à nouveau pour la même publication , assurez vous que votre commande précédente est déjà terminée !|Il faut s'attendre à une baisse de 5 à 10 % du nombre de j'aime|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos J'aime sont en chemin !",
							},
							link_field_text: {
								en: "Twitter post link:",
								fr: "Lien de la publication Twitter:",
							},
							display_name: {
								en: "High Quality Likes",
								fr: "J'aime De Haute Qualité",
							},
							subservice_id: "twitter_likes_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							min: 100,
							max: 1000000,
							rate: {
								xaf: 2500,
							},
							price_text: {
								xaf: {
									en: "(2500 XAF / 1K Likes)",
									fr: "(2500 XAF / 1K J'aime)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 2500XAF / 1K Likes|Average Completion Time: 30 Minutes|Guarantee: 2 Months",
									fr: "Prix: 2500XAF / 1K J'aime|Temps moyen de réalisation: 30 Minutes|Garantie: 2 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
					},
				},
			},
		},
		youtube: {
			order_position: 6,
			display_name: {
				en: "Youtube",
				fr: "Youtube",
			},
			code_name: "youtube",
			enabled: true,
			thumbnail_url:
				"https://firebasestorage.googleapis.com/v0/b/exobooster-59de3.appspot.com/o/categoriesthumbnails%2FYoutube_logo.png?alt=media&token=06f60496-e830-499d-ae40-a28e767a17e7",
			services: {
				youtube_subscribers: {
					category_name: "youtube",
					order_position: 1,
					service_id: "youtube_subscribers",
					enabled: true,
					display_name: {
						en: "Subscribers",
						fr: "Abonnés",
					},
					subservices: {
						youtube_subscribers_high_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/T_K6CtakZKU?si=tf6ZF8s-VRz3Mygw",
								fr: "",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							link_field_text: {
								en: "Youtube channel link:",
								fr: "Lien vers la chaîne Youtube:",
							},
							subservice_id: "youtube_subscribers_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							purchase_success_text: {
								en: "Your subscribers are on the way !",
								fr: "Vos abonnés sont en chemin !",
							},
							min: 100,
							average_time: {
								en: "24 Hours",
								fr: "24 Hours",
							},
							max: 100000,
							display_name: {
								en: "High Quality Subscribers",
								fr: "Abonnés de Haute Qualité",
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							description: {
								en: "If you have purchased subscribers before and want to purchase again for the same channel, make sure your previous order was completed already !|1-5% Drop is to be expected !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Si vous avez déjà acheté des abonnés et que vous souhaitez en acheter à nouveau pour la même chaîne youtube, assurez vous que votre commande précédente est déjà terminée !|Il faut s'attendre à une baisse de 1 à 5% !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							rate: {
								xaf: 3600,
							},
							price_text: {
								xaf: {
									en: "(3600 XAF / 1k Subscribers)",
									fr: "(3600 XAF / 1k Abonné(e)s)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 3600XAF / 1k Subscribers|Average Completion Time: 24 Hours|Guarantee: 3 Months",
									fr: "Prix : 3600XAF / 1k Abonnés|Temps moyen de réalisation: 24 Heures|Guarantee: 3 Mois",
								},
							},
							block_duplicate_orders: false,
						},
					},
				},
				youtube_views: {
					category_name: "youtube",
					order_position: 2,
					service_id: "youtube_views",
					display_name: {
						en: "Views",
						fr: "Vues",
					},
					enabled: true,
					subservices: {
						youtube_views_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/Gr7Hfc2jN4g?si=bPOSy1QvNRoNySi-",
								fr: "",
							},
							description: {
								en: "If you have purchased views before and want to purchase again for the same video, make sure your previous order was completed already !|Almost no drop in views !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Si vous avez déjà acheté des vues et que vous souhaitez en acheter à nouveau pour la même vidéo, assurez vous que votre commande précédente est déjà terminée !|Presque aucune baisse des vues !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							min: 100,
							rate: {
								xaf: 1000,
							},
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Youtube video link:",
								fr: "Lien vers la vidéo Youtube:",
							},
							price_text: {
								xaf: {
									en: "(1000 XAF / 1K Views)",
									fr: "(1000 XAF / 1K Vues)",
								},
							},
							display_name: {
								en: "Average Quality Views",
								fr: "Vues De Qualité Moyenne",
							},
							subservice_id: "youtube_views_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							average_time: {
								en: "4 Hours",
								fr: "4 Heures",
							},
							max: 1000000,
							sub_display_name: {
								xaf: {
									en: "Price: 1000XAF / 1k Views|Average Completion Time: 4 Hours|Guarantee: 1 Year",
									fr: "Prix: 1000XAF / 1K Vues|Temps moyen de réalisation: 4 Heures|Garantie: 1 An",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
						youtube_views_high_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/Gr7Hfc2jN4g?si=bPOSy1QvNRoNySi-",
								fr: "",
							},
							description: {
								en: "If you have purchased views before and want to purchase again for the same video, make sure your previous order was completed already !|Almost no drop in views !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Si vous avez déjà acheté des vues et que vous souhaitez en acheter à nouveau pour la même vidéo, assurez vous que votre commande précédente est déjà terminée !|Presque aucune baisse des vues !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your views are on the way !",
								fr: "Vos vues sont en chemin !",
							},
							link_field_text: {
								en: "Youtube video link:",
								fr: "Lien vers la vidéo Youtube:",
							},
							display_name: {
								en: "High Quality Views",
								fr: "Vues De Haute Qualité",
							},
							subservice_id: "youtube_views_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							min: 100,
							average_time: {
								en: "2 Hours",
								fr: "2 Heures",
							},
							max: 10000000,
							rate: {
								xaf: 1600,
							},
							price_text: {
								xaf: {
									en: "(1600 XAF / 1K Views)",
									fr: "(1600 XAF / 1K Vues)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 1600XAF / 1k Views|Average Completion Time: 2 Hours|Guarantee: 1 Year",
									fr: "Prix: 1600XAF / 1K Vues|Temps moyen de réalisation: 2 Heures|Garantie: 1 An",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
					},
				},
				youtube_likes: {
					category_name: "youtube",
					order_position: 3,
					service_id: "youtube_likes",
					display_name: {
						en: "Likes",
						fr: "J'aime",
					},
					enabled: true,
					subservices: {
						youtube_likes_avg_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/Gr7Hfc2jN4g?si=bPOSy1QvNRoNySi-",
								fr: "",
							},
							description: {
								en: "If you have purchased likes before and want to purchase again for the same video, make sure your previous order was completed already !|Almost no drop in likes !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Si vous avez déjà acheté des j'aime et que vous souhaitez en acheter à nouveau pour la même vidéo, assurez vous que votre commande précédente est déjà terminée !|Presque aucune baisse de j'aime !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos J'aime sont en chemin !",
							},
							link_field_text: {
								en: "Youtube video link:",
								fr: "Le lien de la video Youtube:",
							},
							display_name: {
								en: "Average Quality Likes",
								fr: "J'aime De Qualité Moyenne",
							},
							subservice_id: "youtube_likes_avg_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 1,
							min: 10,
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							max: 25000,
							rate: {
								xaf: 850,
							},
							price_text: {
								xaf: {
									en: "(850 XAF / 1K Likes)",
									fr: "(850 XAF / 1K J'aime)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 850XAF / 1K Likes|Average Completion Time: 1 Hour|Guarantee: 1 Month",
									fr: "Prix: 850XAF / 1K J'aime|Temps moyen de réalisation: 1 Heure|Garantie: 1 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
						youtube_likes_high_quality: {
							youtube_tutorial: {
								en: "https://youtu.be/Gr7Hfc2jN4g?si=bPOSy1QvNRoNySi-",
								fr: "",
							},
							description: {
								en: "If you have purchased likes before and want to purchase again for the same video, make sure your previous order was completed already !|Almost no drop in likes !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Si vous avez déjà acheté des j'aime et que vous souhaitez en acheter à nouveau pour la même vidéo, assurez vous que votre commande précédente est déjà terminée !|Presque aucune baisse de j'aime !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							link_check: true,
							type: "default",
							enabled: true,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your likes are on the way !",
								fr: "Vos J'aime sont en chemin !",
							},
							link_field_text: {
								en: "Youtube video link:",
								fr: "Le lien de la video Youtube:",
							},
							max: 100000,
							display_name: {
								en: "High Quality Likes",
								fr: "J'aime De Haute Qualité",
							},
							subservice_id: "youtube_likes_high_quality",
							comments_seperator_text: {
								en: "",
								fr: "",
							},
							order_position: 2,
							min: 20,
							average_time: {
								en: "5 Hours",
								fr: "5 Heures",
							},
							rate: {
								xaf: 950,
							},
							price_text: {
								xaf: {
									en: "(950 XAF / 1K Likes)",
									fr: "(950 XAF / 1K J'aime)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 950XAF / 1K Likes|Average Completion Time: 5 Hours|Guarantee: 2 Months",
									fr: "Prix: 950XAF / 1K J'aime|Temps moyen de réalisation: 5 Heures|Garantie: 2 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
					},
				},
				youtube_custom_comments: {
					category_name: "youtube",
					order_position: 4,
					service_id: "youtube_custom_comments",
					display_name: {
						en: "Custom Comments",
						fr: "Commentaires personnalisés",
					},
					enabled: true,
					subservices: {
						youtube_custom_comments_avg_quality: {
							youtube_tutorial: {
								en: "",
								fr: "",
							},
							description: {
								en: "If you have purchased comments before and want to purchase again for the same video, make sure your previous order was completed already !|Almost no drop in comments !|Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops",
								fr: "Si vous avez déjà acheté des commentaires et que vous souhaitez en acheter à nouveau pour la même vidéo, assurez vous que votre commande précédente est déjà terminée !|Presque aucune baisse des commentaires !|Une qualité moyenne signifie une durée de garantie plus courte, des comptes/engagements d'apparence semi-réelle et des chutes moyennes",
							},
							link_check: true,
							type: "custom_comments",
							enabled: true,
							min: 5,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your comments are on the way !",
								fr: "Vos commentaires sont en chemin !",
							},
							link_field_text: {
								en: "Youtube video link:",
								fr: "Lien de la vidéo Youtube:",
							},
							display_name: {
								en: "Average Quality Comments",
								fr: "Commentaires de qualité moyenne",
							},
							subservice_id: "youtube_custom_comments_avg_quality",
							comments_seperator_text: {
								en: "(Seperate each comment by moving to a new line)",
								fr: "(Séparez chaque commentaire en passant à une nouvelle ligne)",
							},
							order_position: 1,
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							max: 5000,
							rate: {
								xaf: 4000,
							},
							price_text: {
								xaf: {
									en: "(40XAF / 10 Comments)",
									fr: "(40XAF / 10 Commentaires)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 40XAF / 10 Comments|Average Completion Time: 1 Hour|Guarantee: 1 Month",
									fr: "Prix: 40XAF / 10 Commentaires|Temps moyen de réalisation: 1 Heure|Garantie: 1 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
						youtube_custom_comments_high_quality: {
							youtube_tutorial: {
								en: "",
								fr: "",
							},
							description: {
								en: "If you have purchased comments before and want to purchase again for the same video, make sure your previous order was completed already !|Almost no drop in comments !|High quality means a longer guarantee, realer-looking accounts/engagements, and fewer drops",
								fr: "Si vous avez déjà acheté des commentaires et que vous souhaitez en acheter à nouveau pour la même vidéo, assurez vous que votre commande précédente est déjà terminée !|Presque aucune baisse des commentaires !|Une qualité élevée signifie une garantie plus longue, des comptes/engagements d'apparence plus réelle et moins de chutes",
							},
							link_check: true,
							type: "custom_comments",
							enabled: true,
							min: 10,
							multiple_of_10_enforced: false,
							purchase_success_text: {
								en: "Your comments are on the way !",
								fr: "Vos commentaires sont en chemin !",
							},
							link_field_text: {
								en: "Youtube video link:",
								fr: "Lien de la vidéo Youtube:",
							},
							display_name: {
								en: "High Quality Comments",
								fr: "Commentaires de haute qualité",
							},
							subservice_id: "youtube_custom_comments_high_quality",
							comments_seperator_text: {
								en: "(Seperate each comment by moving to a new line)",
								fr: "(Séparez chaque commentaire en passant à une nouvelle ligne)",
							},
							order_position: 2,
							average_time: {
								en: "1 Hour",
								fr: "1 Heure",
							},
							max: 250,
							rate: {
								xaf: 40000,
							},
							price_text: {
								xaf: {
									en: "(400XAF / 10 Comments)",
									fr: "(400XAF / 10 Commentaires)",
								},
							},
							sub_display_name: {
								xaf: {
									en: "Price: 400XAF / 10 Comments|Average Completion Time: 1 Hour|Guarantee: 6 Months",
									fr: "Prix: 400XAF / 10 Commentaires|Temps moyen de réalisation: 1 Heure|Garantie: 6 Mois",
								},
							},
							validity_regex:
								"^(https?:\\/\\/)?(\\w+\\.)?(\\w+)\\.(\\w+)\\/[^\\s]+$",
							block_duplicate_orders: false,
						},
					},
				},
			},
		},
	});
	const [selected, setSelected] = useState({
		website: "",
		service: "",
		subService: "",
		link: "",
		quantity: "",
		price: "",
		time: "",
		sotes: "",
	});

	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleTabClick = (value) => {
		setSelected({ ...selected, website: value, service: "", subService: "" });
	};

	const handleServiceSelect = (value) => {
		setSelected({ ...selected, service: value, subService: "" });
	};

	const handleChange = (e) => {
		setSelected({ ...selected, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		console.log(data);
		// axios
		// 	.post(
		// 		`https://getcategoriesandservices-l2ugzeb65a-uc.a.run.app/`,
		// 		{
		// 			userId: user.uid,
		// 		},
		// 		{
		// 			headers: {
		// 				// "Content-Type": "application/json",
		// 				Authorization: `Bearer ${user.accessToken}`,
		// 			},
		// 		}
		// 	)
		// 	.then((response) => {
		// 		console.log(response.data.data);
		// 		setData(response.data.data);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	}, [axios]);

	return (
		<div>
			<Drawer
				open={isOpen}
				onClose={toggleDrawer}
				direction="left"
				style={{ paddingTop: isMobileOrTablet ? "64px" : "83px", width: 200 }}
			>
				<MDBListGroup light small className="mb-4">
					<MDBTabs>
						<MDBListGroupItem
							action
							active={location === "home"}
							noBorders
							className="px-3"
							tag={Link}
							to="/"
						>
							Home
						</MDBListGroupItem>
						<MDBListGroupItem
							action
							active={location === "profile"}
							noBorders
							className="px-3"
							tag={Link}
							to="/"
						>
							My Orders
						</MDBListGroupItem>
						<MDBListGroupItem
							action
							active={location === "messages"}
							noBorders
							className="px-3"
							tag={Link}
							to="/"
						>
							Wallet
						</MDBListGroupItem>
						<MDBListGroupItem
							action
							active={location === "settings"}
							noBorders
							className="px-3"
							tag={Link}
							to="/"
						>
							Profile
						</MDBListGroupItem>
						<MDBListGroupItem
							action
							active={location === "settings"}
							noBorders
							className="px-3"
							tag={Link}
							to="/"
						>
							Referral program
						</MDBListGroupItem>
					</MDBTabs>
				</MDBListGroup>
				<MDBContainer>
					<MDBBtn color="danger" block onClick={toggleDrawer}>
						Sign Out
					</MDBBtn>
				</MDBContainer>
			</Drawer>
			<div className="font-black text-center mt-4 mb-2">
				PICK YOUR TARGET SOCIAL MEDIA:
			</div>
			<MDBTabs className="mb-3- justify-content-center">
				{Object.entries(data).map(([website, service]) => (
					<MDBTabsItem key={website} className=" media-tab">
						<MDBTabsLink
							onClick={() => handleTabClick(website)}
							active={selected.website === website}
							className={`bg-transparent text-center border-bottom border-primary border-2 rounded-top-4${
								selected.website === website && " border"
							}`}
							// className=bg-transparent text-center radius-top border-bottom- ${"border-2 border-primary"}`}
						>
							{/* <img width={32} src={service.thumbnail_url} alt={website} /> */}
							<MDBIcon
								fab
								icon={website}
								color="primary"
								style={{ width: 32, fontSize: 28 }}
							/>
						</MDBTabsLink>
					</MDBTabsItem>
				))}
			</MDBTabs>
			<div className="border-2 border-top border-primary">
				<MDBContainer style={{ maxWidth: 400 }} className="mx-auto">
					{selected.website && (
						<>
							<label htmlFor="service" className="form-label mb-0 mt-2">
								Service:
							</label>
							<Input
								id="service"
								type="select"
								value={selected.service}
								name="service"
								onChange={(e) => handleServiceSelect(e.target.value)}
							>
								<option value="" disabled>
									Select a service.
								</option>
								{Object.entries(data[selected.website].services).map(
									([key, value]) => {
										return (
											<option key={key} value={key}>
												{value.display_name.en}
											</option>
										);
									}
								)}
							</Input>
						</>
					)}
					{selected.website && selected.service && (
						<>
							<label htmlFor="subService" className="form-label mb-0 mt-2">
								Type:
							</label>
							<Input
								id="subService"
								type="select"
								value={selected.subService}
								name="subService"
								onChange={handleChange}
							>
								<option value="" disabled>
									Select a type.
								</option>
								{Object.entries(
									data[selected.website].services[selected.service].subservices
								).map(([key, value]) => {
									return (
										<option key={key} value={key}>
											{value.display_name.en}
										</option>
									);
								})}
							</Input>
						</>
					)}
					{selected.website && selected.service && selected.subService && (
						<>
							<label htmlFor="link" className="form-label mb-0 mt-2">
								{
									data[selected.website].services[selected.service].subservices[
										selected.subService
									]?.link_field_text.en
								}
							</label>
							<Input
								id="link"
								type="text"
								value={selected.link}
								name="link"
								onChange={handleChange}
							/>
							{data[selected.website].services[selected.service].subservices[
								selected.subService
							]?.type == "default" && (
								<>
									<label htmlFor="quantity" className="form-label mb-0 mt-2">
										Quantity:
									</label>
									<MDBInput
										id="quantity"
										type="number"
										value={selected.quantity}
										name="quantity"
										className="bg-white"
										onChange={handleChange}
										min={data[selected.website].services[selected.service].subservices[
											selected.subService
										]?.min}
										max={data[selected.website].services[selected.service].subservices[
											selected.subService
										]?.max}
									/>
								</>
							)}
							{data[selected.website].services[selected.service].subservices[
								selected.subService
							]?.type == "custom_comments" && (
								<>
									<label htmlFor="comments" className="form-label mb-0 mt-2">
										Comments:
									</label>
									<MDBTextArea
									rows={4}
										id="comments"
										value={selected.comments}
										name="comments"
										className="bg-white"
										onChange={handleChange}
									/>
								</>
							)}
							<label htmlFor="price" className="form-label mb-0 mt-2">
								Price
							</label>
							<Input
								id="price"
								type="text"
								value={data[selected.website].services[selected.service].subservices[
									selected.subService
								]?.price_text.xaf.en}
								name="price"
								disabled
								onChange={handleChange}
							/>
							<label htmlFor="note" className="form-label mb-0 mt-2">
								Note
							</label>
							<MDBTextArea
								id="note"
								type="text"
								value={data[selected.website].services[selected.service].subservices[
									selected.subService
								]?.description.en.replace(/\|/g, '\n')}
								name="note"
								style={{ height: 96 }}
								disabled
								onChange={handleChange}
							/>
								<div className="text-center my-2">Don’t know how to use this service?<br/>Watch this video: <Link>Tutorial</Link></div>
								<div className="w-250 mx-auto">
									<MDBBtn color="success" block>Purchase</MDBBtn>
								</div>
						</>
					)}
				</MDBContainer>
			</div>
		</div>
	);
};

export default Home;
