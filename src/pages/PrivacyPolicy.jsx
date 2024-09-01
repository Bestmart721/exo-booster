import { MDBCard, MDBCardBody, MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import { useLanguage } from "../layouts/LanguageContext";

function PrivacyPolicy() {
	const { language } = useLanguage();

	return (
		<MDBContainer className="pt-3 pt-sm-4 pt-lg-5">
			<MDBCard>
				<MDBCardBody className="p-lg-5">
					{language === "fr" ? (
						<>
							<div>
								<div className="acc_head">
									<b>Général</b>
								</div>
								<div className="acc_content">
									<p>
										En passant une commande auprès d'Exo Booster, vous acceptez
										automatiquement toutes les conditions de service énumérées
										ci-dessous, que vous les ayez lues ou non.
									</p>
									<p>
										Nous nous réservons le droit de modifier ces conditions de
										service sans préavis. Vous êtes tenu de lire toutes les
										conditions de service avant de passer une commande afin de
										vous assurer que vous êtes au courant de toute modification
										ou de tout changement futur.
									</p>
									<p>
										Vous n'utiliserez l'application Exo Booster que dans le
										respect de tous les accords conclus avec
										Instagram/Facebook/Twitter/Youtube/autres sites de médias
										sociaux sur leur page individuelle de conditions
										d'utilisation. Les tarifs d'Exo Booster peuvent être
										modifiés à tout moment sans préavis. La politique de
										paiement/remboursement reste en vigueur en cas de
										modification des tarifs. Exo Booster ne garantit pas un
										délai de livraison ou un taux de chute pour les services.
										Nous offrons notre meilleure estimation de la date de
										livraison de la commande. Il ne s'agit que d'une estimation
										et Exo Booster ne remboursera pas les commandes en cours de
										traitement si vous estimez qu'elles prennent trop de temps.
										Toutes les commandes sans période de recharge ne sont pas
										rechargeables même si elles subissent une baisse de 100%,
										veuillez commander des services avec recharge. Exo Booster
										s'efforce de fournir exactement ce que nos revendeurs
										attendent de nous. Dans ce cas, nous nous réservons le droit
										de changer un type de service si nous le jugeons nécessaire
										pour compléter une commande.
									</p>
									<p>
										Toute action malveillante/abusive peut entraîner la
										suspension de votre compte. Avant la suspension, les
										utilisateurs auront le temps d'utiliser le solde restant.
										L'ouverture d'un nouveau compte après la suspension
										entraînera la résiliation de votre compte, même s'il
										contient un solde.
									</p>
									<p>Avertissement :</p>
									<p>
										Exo Booster ne sera pas responsable des dommages que vous ou
										votre entreprise pourriez subir.
									</p>
									<p>Passifs :</p>
									<p>
										Exo Booster n'est en aucun cas responsable de la suspension
										d'un compte ou de la suppression d'une photo par Instagram,
										Twitter, Facebook, YouTube ou d'autres médias sociaux.
									</p>
								</div>
							</div>
							<div>
								<div className="acc_head">
									<b>Politique de remboursement</b>
								</div>
								<div className="acc_content">
									<p>
										Aucun remboursement ne sera effectué sur votre mode de
										paiement. Une fois qu'un dépôt a été effectué, il n'est pas
										possible de l'annuler. Vous devez utiliser votre solde pour
										les commandes d'Exo Booster.
									</p>
									<p>
										Vous acceptez qu'une fois que vous avez effectué un
										paiement, vous ne déposerez pas de contestation ou de
										rétrofacturation à notre encontre pour quelque raison que ce
										soit.
									</p>
									<p>
										Si vous déposez un litige ou une réclamation contre nous
										après un dépôt, nous nous réservons le droit de mettre fin à
										toutes les commandes futures, de vous bannir de notre site.
										Nous nous réservons également le droit de retirer tous les
										followers ou likes que nous avons livrés à votre ou vos
										clients Instagram/Facebook/Twitter ou autre compte de médias
										sociaux.
									</p>
									<p>
										Les commandes passées dans Exo Booster ne peuvent pas être
										remboursées ou annulées après avoir été passées. Vous
										recevrez un crédit de remboursement sur votre compte Exo
										Booster si la commande n'est pas livrable.
									</p>
									<p>
										Les commandes égarées ou passées sur un compte privé ne
										donnent pas droit à un remboursement. Veillez à confirmer
										chaque commande avant de la passer.
									</p>
									<p>
										Toute activité frauduleuse, telle que l'utilisation de
										cartes de crédit non autorisées ou volées, entraînera la
										résiliation de votre compte. Il n'y a pas d'exception.
									</p>
									<p>
										Veuillez ne pas utiliser plus d'un serveur en même temps
										pour la même page. Dans ce cas, nous ne pourrons pas vous
										donner un nombre correct de followers/likes. Nous ne
										rembourserons pas ces commandes.
									</p>
								</div>
							</div>
							<div className="csa acc_section acc_active">
								<div className="acc_head">
									<b>Clause de non-responsabilité sur nos services</b>
								</div>
								<div className="acc_content">
									<p>
										Exo Booster ne sera utilisé que pour promouvoir votre compte
										Instagram/Twitter/Facebook ou social et aider à booster
										votre "Apparence" uniquement.
									</p>
									<p>
										Nous ne garantissons pas que vos nouveaux followers
										interagiront avec vous, nous garantissons simplement que
										vous obtiendrez les followers pour lesquels vous payez.
									</p>
									<p>
										Nous ne garantissons pas que 100 % de nos comptes auront une
										photo de profil, une biographie complète et des photos
										téléchargées, mais nous nous efforçons de faire en sorte que
										ce soit le cas pour tous les comptes.
									</p>
									<p>
										Vous ne téléchargerez rien sur l'application Exo Booster, y
										compris de la nudité ou tout matériel qui n'est pas accepté
										ou adapté à la communauté Instagram/Twitter/Facebook ou aux
										médias sociaux.
									</p>
									<p>
										Les comptes privés ne seront pas remboursés ! Veuillez vous
										assurer que votre compte est public avant de passer
										commande.
									</p>
								</div>
							</div>
						</>
					) : (
						<>
							<div>
								<div className="acc_head">
									<b>General</b>
								</div>
								<div className="acc_content">
									<p>
										By placing an order with Exo Booster , you automatically
										accept all the below listed terms of service whether you
										read them or not.
									</p>
									<p>
										We reserve the right to change these terms of service
										without notice. You are expected to read all terms of
										service before placing any order to insure you are up to
										date with any changes or any future changes.
									</p>
									<p>
										You will only use the Exo Booster app in a manner which
										follows all agreements made with
										Instagram/Facebook/Twitter/Youtube/Other social media site
										on their individual Terms of Service page. Exo Booster rates
										are subject to change at any time without notice. The
										payment/refund policy stays in effect in the case of rate
										changes. Exo Booster does not guarantee a delivery time or a
										drop rate for any services. We offer our best estimation for
										when the order will be delivered. This is only an estimation
										and Exo Booster will not refund orders that are processing
										if you feel they are taking too long. All orders without a
										refill period are not refillable even if they face a 100%
										drop, please order services with refill. Exo Booster tries
										hard to deliver exactly what is expected from us by our
										re-sellers. In this case, we reserve the right to change a
										service type if we deem it necessary to complete an order.
									</p>
									<p>
										Any malicious/abusive actions can cause your account with us
										to be suspended. Before suspension users will get time to
										use their remaining balance. Opening a new account after
										suspension will cause your account to be terminated even if
										it has balance in it.
									</p>
									<p>Disclaimer:</p>
									<p>
										Exo Booster will not be responsible for any damages you or
										your business may suffer.
									</p>
									<p>Liabilities:</p>
									<p>
										Exo Booster is in no way liable for any account suspension
										or picture deletion done by Instagram or Twitter or Facebook
										or YouTube or Other Social Media.
									</p>
								</div>
							</div>
							<div>
								<div className="acc_head">
									<b>Return Policy</b>
								</div>
								<div className="acc_content">
									<p>
										No refunds will be made to your payment method. After a
										deposit has been completed, there is no way to reverse it.
										You must use your balance on orders from Exo Booster.
									</p>
									<p>
										You agree that once you complete a payment, you will not
										file a dispute or a chargeback against us for any reason.
									</p>
									<p>
										If you file a dispute or charge-back against us after a
										deposit, we reserve the right to terminate all future
										orders, ban you from our site. We also reserve the right to
										take away any followers or likes we delivered to your or
										your clients Instagram/Facebook/Twitter or other social
										media account.
									</p>
									<p>
										Orders placed in Exo Booster will not be refunded or
										canceled after they are placed.You will receive a refund
										credit to your Exo Booster account if the order is non
										deliverable
									</p>
									<p>
										Misplaced or Private account orders will not qualify for a
										refund. Be sure to confirm each and every order before
										placing it.
									</p>
									<p>
										Fraudulent activity such as using unauthorized or stolen
										credit cards will lead to termination of your account. There
										are no exceptions.
									</p>
									<p>
										Please do not use more than one server at the same time for
										the same page. We cannot give you correct followers/likes
										number in that case. We will not refund for these orders.
									</p>
								</div>
							</div>
							<div>
								<div className="acc_head">
									<b>Services Disclaimer</b>
								</div>
								<div className="acc_content">
									<p>
										Exo Booster will only be used to promote your
										Instagram/Twitter/Facebook or Social account and help boost
										your "Appearance" only.
									</p>
									<p>
										We DO NOT guarantee your new followers will interact with
										you, we simply guarantee you to get the followers you pay
										for.
									</p>
									<p>
										We DO NOT guarantee 100% of our accounts will have a profile
										picture, full bio and uploaded pictures, although we strive
										to make this the reality for all accounts.
									</p>
									<p>
										You will not upload anything into the Exo Booster site
										including nudity or any material that is not accepted or
										suitable for the Instagram/Twitter/Facebook or Social Media
										community.
									</p>
									<p>
										Private accounts would not a get a refund! Please insure
										that your account is public before ordering.
									</p>
								</div>
							</div>
						</>
					)}
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	);
}

export default PrivacyPolicy;
