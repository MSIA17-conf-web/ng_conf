import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';

export default class DialogTemplate {

  public static modalTempates: any = {
    tokenSent: (options: UserInformations) => {
      return {
        title: 'Inscription finalisée',
        text: [
          options.fName + ', merci pour votre inscription.',
          'Nous vous avons envoyer un email à l\'adresse :' + options.email + ' permettant de finaliser votre inscription.'
        ],
        displayLink: {
          signup: false,
          contact: false
        }
      };
    },
    tokenNotMatch: () => {
      return {
        title: 'Erreur durant votre inscription',
        text: [
          'Erreur lors de la vérification de votre profil.',
        ],
        displayLink: {
          signup: true,
          contact: true
        }
      };
    },
    successful: (options: UserInformations) => {
      return {
        title: 'Félicitaions, votre inscription est terminée',
        text: [
          options.fName + ', merci pour votre inscription, ',
          'un email récapitulatif va vous être envoyé à : ' + options.email + '.'
        ],
        displayLink: {
          signup: false,
          contact: false
        }
      };
    },
    userAlreadyExist: (options: UserInformations) => {
      return {
        title: 'Erreur durant votre inscription',
        text: [
          'L\'adresse email ' + options.email + ' à déjà fait l\'objet d\'une inscription.',
          'Pour se désincrire référer vous au mail de confirmation recu lors de l\'inscription',
        ],
        displayLink: {
          signup: true,
          contact: false
        }
      };
    },
    userNotFound: (options: UserInformations) => {
      return {
        title: 'Erreur durant votre inscription',
        text: [
          'L\'email : ' + options.email + ' n\'existe pas.',
        ],
        displayLink: {
          signup: true,
          contact: true
        }
      };
    },
    updateError: () => {
      return {
        title: 'Erreur durant votre inscription',
        text: [
          'Une erreur innatendue est survenue.',
        ],
        displayLink: {
          signup: true,
          contact: true
        }
      };
    },
    contactResponseSuccess: () => {
      return {
        title: 'Demande envoyée',
        text: [
          'Merci pour votre demande, elle sera traité dans les plus bref délais.',
        ],
        displayLink: {
          signup: false,
          contact: false
        }
      };
    },
    contactResponseError: (options: any) => {
      return {
        title: 'Erreur lors de la prise de contact',
        text: [
          'Erreur durant l\'envoi de votre message, veuillez réesayer ultérieuement.',
          'Si le problème persiste veuillez directement nous contacter à l\'adresse <a href="mailto:msia17conferences@gmail.com?subject=' + options.lastName + ' ' + options.firstName + ' cherche à vous contacter'
          + '&body=' + options.messageEmail + '">msia17conferences@gmail.com</a>'
        ],
        displayLink: {
          signup: false,
          contact: false
        }
      };
    },
    internalServerError: () => {
      return {
        title: 'Erreur interne',
        text: [
          'Nous rencontrons actuellement quelques soucis. Nos équipes mettent tous en place pour résoudre ce problème.',
          'Veuillez nous excusez pour la gêne occasionnée.'
        ],
        displayLink: {
          signup: true,
          contact: true
        }
      };
    },
    // Renvoyer un mail avec le nouveau QRCode ?
    updateUserSuccess: (options: UserInformations) => {
      return {
        title: 'Mise à jour des données réussie',
        text: [
          options.fName + ', un email vient de vous être envoyé à l\'adresse ' + options.email + ' avec votre nouveau QRCode',
        ],
        displayLink: {
          signup: false,
          contact: false
        }
      };
    },
    updateUserError : (options: UserInformations) => {
      return {
        title: 'Erreur lors de la mise à jour de vos données',
        text: [
          options.fName + ', une erreur innatendue c\'est produite.',
          'Veuillez nous excusez pour la gêne occasionnée.'
        ],
        displayLink: {
          signup: true,
          contact: true
        }
      };
    },
    deleteUser: () => {
      return {
        title: 'Suppression de vos donn',
        text: [
          'Vos données ont correctement été supprimée de l\'intégralité de nos fichiers.',
        ],
        displayLink: {
          signup: false,
          contact: false
        }
      };
    },
    deleteUserSuccess: () => {
      return {
        title: 'Confirmation de suppression',
        text: [
          'Vos données ont correctement été supprimée de l\'intégralité de nos fichiers.',
        ],
        displayLink: {
          signup: false,
          contact: false
        }
      };
    },
    deleteUserError: (options: UserInformations) => {
      return {
        title: 'Erreur lors de la suppression de vos données',
        text: [
          options.fName + ', une erreur innatendue c\'est produite.',
          'Veuillez nous excusez pour la gêne occasionnée.'
        ],
        displayLink: {
          signup: true,
          contact: true
        }
      };
    }
  };
}
