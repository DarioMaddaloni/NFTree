# NFTree
<p align = "center"> 
<img width="300" alt="logo" src="https://github.com/DarioMaddaloni/NFTree/assets/64229723/71bbb7a1-a99f-4313-aa28-74f9006ab6fc">

Real estate solution bridging classical real-estate operations (merging, splitting, etc) to the NFT world. The lifecycle of the protocol, i.e. the on-chain children-parent relation of ownership certificates, resembles a tree of NFTs.

## PROJECT OVERVIEW 
EU reports paint the real estate market as one of the most relevant to check for money laundering and fraud. They also state that checking them is hard (e.g. how to check every single sale action? they have too many forms). Our goal is exploiting properties of classical Non-Fungible Tokens to mimic operations of Fungible Tokens. This also aids authority control of malicious operations.

## NFTs
In our scenario, they point to real-estate contracts. Allowed operations between NFTs are those we expect from real-world real estate contracts.

The first batch of mints is done by the Government (real estate registry) or a similar party. Each operation could change the owner: transaction history reveals the chain of issuers, thus trust on NFT validity is given by issuer's identity.

Below, most common real estate transaction bridged on the XRP Ledger. They are without loss of generalities between two parties.

### Standard sale

| *Classical operation*  | *NFT operation*  | *input parties*  | *output parties*  |
| ------------- | ------------- |------------- |------------- |
| standard sale  | standard NFT sale  | one | one |

A standard NFT transaction: one NFT is exchanged between one seller and one buyer. 
<p align = "center"> 
<img alt="logo" src="https://github.com/DarioMaddaloni/NFTree/assets/64229723/37410d8c-c743-4a33-9730-74c51d2baf86">

### Restricted sale
| *Classical operation*  | *NFT operation*  | *input parties*  | *output parties*  |
| ------------- | ------------- |------------- |------------- |
| sale of share  | sale of NFT representing share  | many | many |

In a shared property (e.g. A has 30% ownership, B has 70%), one part sells their share. 
<p align = "center"> 
<img alt="logo" src="https://github.com/DarioMaddaloni/NFTree/assets/64229723/b739e1cb-dcb5-4f13-8dec-e296e8322f63">

### Merge
| *Classical operation*  | *NFT operation*  | *input parties*  | *output parties*  |
| ------------- | ------------- |------------- |------------- |
| merging properties | minting  | one | one |

One user has two NFTs and merges them into a new one. This is the action of merging different shares or different real estate properties.
<p align = "center"> 
<img alt="logo" src="https://github.com/DarioMaddaloni/NFTree/assets/64229723/35b9bd56-030a-45f8-bebd-b4d980952d99">


### Inheritance
| *Classical operation*  | *NFT operation*  | *input parties*  | *output parties*  |
| ------------- | ------------- |------------- |------------- |
| writing will  | minting, selling | one | many |

Owner sends an inheritance to two heirs via an NFT offer. If refused, it bounces back to the account (which is at this point controlled by either by the owner or by the will executioner). This is the action of writing a will -- where the heirs can reject the property.
<p align = "center"> 
<img alt="logo" src="https://github.com/DarioMaddaloni/NFTree/assets/64229723/822a8279-8cc0-4396-9b4b-f2010ca5b986">


### Split
| *Classical operation*  | *NFT operation*  | *input parties*  | *output parties*  |
| ------------- | ------------- |------------- |------------- |
| splitting property  | minting | one | one |

Owner of a property splits it in two, all still owned by them.
<p align = "center"> 
<img alt="logo" src="https://github.com/DarioMaddaloni/NFTree/assets/64229723/c225f860-f047-4101-9437-6b72edbf7643">



## POLICING THE BLOCKCHAIN 
One of our goals is to make real estate transactions easily checkable for maliciousness (e.g. money laundering). Ideally, we do not wish to have Verification Servers run background checks, which also depend on the real estate legislation of that country.

_Example: in France gifting your share of a shared property is allowed and cannot be stopped, in Italy, all sharers must instead agree._

An easy solution is to have an observer -- not necessarily a node -- scan the chain for illegal actions.

## THE PLATFORM
This is a protocol executable on the XRP Ledger. No middleman is needed. A platform can be used to ensure all operations result in something that is valid according to the above section "POLICING THE BLOCKCHAIN".

## FUTURE WORK


## DETAILS FOR THE PARIS HACKATHON

### Work completed prior to the hackathon
- automatic build of Refine App

### Non-team-created software or intellectual property (libraries, assets,...)
- Logo: Google images modified on GIMP
- Typescript: XRPL
- NodeJS: React, Vite, MUI
