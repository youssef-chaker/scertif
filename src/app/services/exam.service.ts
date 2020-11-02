import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exam} from '../models/exam.model';
import {map, shareReplay} from 'rxjs/operators';


@Injectable()
export class ExamService {
  constructor(private httpClient: HttpClient) {
  }

  getQuestions(exam): Observable<any> {
    return this.httpClient.get<any>('https://exams.free.beeceptor.com/api/exams/' + exam)
      .pipe(
        map(ex => {
          const questions = ex.questions;
          let id = 0;
          questions.forEach(q => {
            q.id = ++id;
            q.explanation = 'Explanation' + id;
          });
          return questions;
        }),
        shareReplay()
      );
  }

  getDumpQuestions(): any {
    return [
      {
        id: 1,
        question: "A company that has 50 employees plans to purchase a Microsoft 365 Business subscription. Which two payment methods are available? Each correct answer presents a complete solution. (Choose two.) NOTE: Each correct selection is worth one point. References:\nhttps://docs.microsoft.com/en-us/office365/admin/subscriptions-and-billing/pay-for-your-subscription?view=o365-worldwide",
        choices: [
          "A. PayPal",
          "B. automatic bank transfer",
          "C. Enterprise Agreement",
          "D. credit card or debit card"
        ],
        correctAnswers: [
          "B. automatic bank transfer",
          "D. credit card or debit card"
        ],
        explanation: "Explanation1"
      },
      {
        id: 2,
        question: "A company is a Microsoft 365 reseller. The company does not provide managed services or direct customer support. You need to provide licenses for customers and earn commissions for each license sold. What should you do?",
        choices: [
          "A. Buy licenses for customers by using the Microsoft admin portal.\nB. Sign up as a Cloud Solution Provider direct reseller.\nC. Sign up as a Cloud Solution Provider indirect reseller.",
          "D. Buy licenses for customers from a Microsoft Authorized distributor."
        ],
        correctAnswers: [
          "D. Buy licenses for customers from a Microsoft Authorized distributor."
        ],
        explanation: "Explanation2"
      },
      {
        id: 3,
        question: "You are the Microsoft 365 administrator for a company. Your company plans to open a new office in the United Kingdom. You need to provide penetration test and security assessment reports for the new office. Where can you locate the required reports?",
        choices: [
          "A. Data Governance page of the Security and Compliance portal\nB. Compliance Manager page of the Services Trust portal\nC. Data Loss Prevention page of the Security and Compliance portal",
          "D. Regional Compliance page of the Services Trust portal"
        ],
        correctAnswers: [
          "D. Regional Compliance page of the Services Trust portal"
        ],
        explanation: "Explanation3"
      },
      {
        id: 4,
        question: "A company plans to migrate to Microsoft 365. You need to advise the company about how Microsoft provides protection in a multitenancy environment. What are three ways that Microsoft provides protection? Each correct answer presents part of the solution. (Choose three.) NOTE: Each correct selection is worth one point. References:\nhttps://docs.microsoft.com/en-us/office365/securitycompliance/office-365-tenant-isolation-overview ",
        choices: [
          "A. Customer content at rest is encrypted on the server by using BitLocker.",
          "B. Microsoft Azure AD provides authorization and role-based access control at the tenant layer.",
          "C. Customer content at rest is encrypted on the server by using transport-layer security (TLS).",
          "D. Microsoft Azure AD provides authorization and role-based access control at the transport layer.\nE. Mailbox databases in Microsoft Exchange Online contain only mailboxes from a single tenant.\nF. Mailbox databases in Microsoft Exchange Online contain mailboxes from multiple tenants."
        ],
        correctAnswers: [
          "A. Customer content at rest is encrypted on the server by using BitLocker.",
          "B. Microsoft Azure AD provides authorization and role-based access control at the tenant layer.",
          "C. Customer content at rest is encrypted on the server by using transport-layer security (TLS)."
        ],
        explanation: "Explanation4"
      },
      {
        id: 5,
        question: "You use Microsoft 365 Usage Analytics. You need to know the number of users who are active today and were also active last month. Which metric should you use? References:\nhttps://docs.microsoft.com/en-us/office365/admin/usage-analytics/active-user-in-usage-reports?view=o365-worldwide",
        choices: [
          "A. MoMReturningUsers",
          "B. EnabledUsers\nC. ActiveUsers\nD. CumulativeActiveUsers"
        ],
        correctAnswers: [
          "A. MoMReturningUsers"
        ],
        explanation: "Explanation5"
      },
      {
        id: 6,
        question: "You are a Microsoft 365 administrator for a company. Microsoft plans to release a new feature for Microsoft Excel. You need to ensure that the feature becomes available for employees to install as soon as possible. To which release channel should you subscribe? References:\nhttps://docs.microsoft.com/en-us/office365/admin/manage/release-options-in-office-365?view=o365-worldwide",
        choices: [
          "A. Microsoft release\nB. Standard release\nC. Office 365 team release",
          "D. Targeted release"
        ],
        correctAnswers: [
          "D. Targeted release"
        ],
        explanation: "Explanation6"
      },
      {
        id: 7,
        question: "You are the Microsoft 365 administrator for a company. Users in the IT department must receive new Office 365 preview features before the features are deployed to other users in the company. You need to ensure only the users in the IT department receive preview features. Which two actions should you perform? Each correct answer represents part of the solution. (Choose two.) NOTE: Each correct selection is worth one point. References:\nhttps://insider.office.com/en-us/ https://docs.microsoft.com/en-us/office365/admin/manage/release-options-in-office-365?view=o365-worldwide",
        choices: [
          "A. Instruct users to navigate to http://insider.office.com and sign up for Office Insider.",
          "B. Instruct users to update Office ProPlus.",
          "C. In the organizational profile, set the update preference to Targeted release for selected users.",
          "D. Instruct users to uninstall Office ProPlus and then reinstall the software.\nE. In the organizational profile, set the update preference to Standard release."
        ],
        correctAnswers: [
          "A. Instruct users to navigate to http://insider.office.com and sign up for Office Insider.",
          "C. In the organizational profile, set the update preference to Targeted release for selected users."
        ],
        explanation: "Explanation7"
      }
    ];
  }

  getAllExams(): any[] {
    return [
      {
        "provider": "Briefing Magento Knowledge",
        "exams": [
          {
            "name": "M70-301",
            "count": 106
          },
          {
            "name": "M70-201",
            "count": 131
          },
          {
            "name": "M70-101",
            "count": 122
          }
        ]
      },
      {
        "provider": "Linux",
        "exams": [
          {
            "name": "LIN-301",
            "count": 16
          },
          {
            "name": "LIN-201",
            "count": 75
          },
          {
            "name": "LIN-101",
            "count": 120
          }
        ]
      },
      {
        "provider": "Microsoft",
        "exams": [
          {
            "name": "MIC-301",
            "count": 26
          },
          {
            "name": "MIC-201",
            "count": 54
          },
          {
            "name": "MIC-101",
            "count": 41
          }
        ]
      },
      {
        "provider": "Oracle",
        "exams": [
          {
            "name": "ORA-301",
            "count": 77
          },
          {
            "name": "ORA-201",
            "count": 35
          },
          {
            "name": "ORA-101",
            "count": 96
          }
        ]
      },
      {
        "provider": "English",
        "exams": [
          {
            "name": "EN-301",
            "count": 78
          },
          {
            "name": "EN-201",
            "count": 20
          },
          {
            "name": "EN-101",
            "count": 56
          }
        ]
      }
    ];
  }
}
