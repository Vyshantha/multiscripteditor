import { Component, ComponentRef, OnInit, AfterViewInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as allLayoutPositions from './../../assets/keyboard-layouts/keysboards-layouts.json';
import * as layoutReligionAll from './../../assets/keyboard-layouts/layout-religion-all.json';
import * as layoutKannadaKn from './../../assets/keyboard-layouts/layout-kannada-kn.json';
import * as layoutKadambaKada from './../../assets/keyboard-layouts/layout-kadamba-kada.json';
import * as layoutTeluguTe from './../../assets/keyboard-layouts/layout-telugu-te.json';
import * as layoutTamilTa from './../../assets/keyboard-layouts/layout-tamil-ta.json';
import * as layoutBadagaBada from './../../assets/keyboard-layouts/layout-badaga-bada.json';
import * as layoutRomaniRom from './../../assets/keyboard-layouts/layout-romani-rom.json';
import * as layoutGrikoApu from './../../assets/keyboard-layouts/layout-griko-apu.json';
import * as layoutLFNlfn from './../../assets/keyboard-layouts/layout-LFN-lfn.json';
import * as layoutLekeLeke from './../../assets/keyboard-layouts/layout-leke-leke.json';
import * as layoutNeopolitanNap from './../../assets/keyboard-layouts/layout-neapolitan-nap.json';
import * as layoutGranthaGran from './../../assets/keyboard-layouts/layout-grantha-gran.json';
import * as layoutXhosaXh from './../../assets/keyboard-layouts/layout-xhosa-xh.json';
import * as layoutVilamovianWym from './../../assets/keyboard-layouts/layout-vilamovian-wym.json';
import * as layoutZuluZu from './../../assets/keyboard-layouts/layout-zulu-zu.json';
import * as layoutTaiViet from './../../assets/keyboard-layouts/layout-taiviet-tavt.json';
import * as layoutTaiNua from './../../assets/keyboard-layouts/layout-tainua-tdd.json';
import * as layoutKikuyuKi from './../../assets/keyboard-layouts/layout-kikuyu-ki.json';
import * as layoutNormanNrf from './../../assets/keyboard-layouts/layout-norman-nrf.json';
import * as layoutBhattiproluBhat from './../../assets/keyboard-layouts/layout-bhattiprolu-bhat.json';
import * as layoutPiedmontesePms from './../../assets/keyboard-layouts/layout-piedmontese-pms.json';
import * as layoutLombardLmo from './../../assets/keyboard-layouts/layout-lombard-lmo.json';
import * as layoutVendaVen from './../../assets/keyboard-layouts/layout-venda-ven.json';
import * as layoutPapiamentoPap from './../../assets/keyboard-layouts/layout-papiamento-pap.json';
import * as layoutTsongaTs from './../../assets/keyboard-layouts/layout-tsonga-ts.json';
import * as layoutLwoLwo from './../../assets/keyboard-layouts/layout-lwo-lwo.json';
import * as layoutAriyakaAri from './../../assets/keyboard-layouts/layout-ariyaka-ari.json';
import * as layoutNauruanNa from './../../assets/keyboard-layouts/layout-nauruan-na.json';
import * as layoutAkanAk from './../../assets/keyboard-layouts/layout-akan-ak.json';
import * as layoutMasurianMasu from './../../assets/keyboard-layouts/layout-masurian-masu.json';
import * as layoutZazakiZza from './../../assets/keyboard-layouts/layout-zazaki-zza.json';
import * as layoutMaranaoMrw from './../../assets/keyboard-layouts/layout-maranao-mrw.json';
import * as layoutWakhiWbl from './../../assets/keyboard-layouts/layout-wakhi-wbl.json';
import * as layoutMarshalleseMh from './../../assets/keyboard-layouts/layout-marshallese-mh.json';
import * as layoutWalonWa from './../../assets/keyboard-layouts/layout-walon-wa.json';
import * as layoutOromoOm from './../../assets/keyboard-layouts/layout-oromo-om.json';
import * as layoutKabiyeKbp from './../../assets/keyboard-layouts/layout-kabiye-kbp.json';
import * as layoutTaqbaylitKab from './../../assets/keyboard-layouts/layout-taqbaylit-kab.json';
import * as layoutNdebeleNde from './../../assets/keyboard-layouts/layout-ndebele-nde.json';
import * as layoutMalayalamMl from './../../assets/keyboard-layouts/layout-malayalam-ml.json';
import * as layoutTigalariTiga from './../../assets/keyboard-layouts/layout-tigalari-tiga.json';
import * as layoutSanskritSa from './../../assets/keyboard-layouts/layout-sanskrit-sa.json';
import * as layoutSanskritIAST from './../../assets/keyboard-layouts/layout-sanskrit-iast.json';
import * as layoutPaliPli from './../../assets/keyboard-layouts/layout-pali-pli.json';
import * as layoutDhimalDham from './../../assets/keyboard-layouts/layout-dhimal-dham.json';
import * as layoutGalikGalk from './../../assets/keyboard-layouts/layout-galik-galk.json';
import * as layoutPalenqueroPln from './../../assets/keyboard-layouts/layout-palenquero-pln.json';
import * as layoutRanjanaNew from './../../assets/keyboard-layouts/layout-ranjana-ranj.json';
import * as layoutLigureLij from './../../assets/keyboard-layouts/layout-ligure-lij.json';
import * as layoutSarduSc from './../../assets/keyboard-layouts/layout-sardu-sc.json';
import * as layoutCorsicanCo from './../../assets/keyboard-layouts/layout-corsican-co.json';
import * as layoutLugandaLg from './../../assets/keyboard-layouts/layout-luganda-lg.json';
import * as layoutUbykhUby from './../../assets/keyboard-layouts/layout-ubykh-uby.json';
import * as layoutKongoKg from './../../assets/keyboard-layouts/layout-kongo-kon.json';
import * as layoutNiasNia from './../../assets/keyboard-layouts/layout-nias-nia.json';
import * as layoutTetunTdt from './../../assets/keyboard-layouts/layout-tetun-tdt.json';
import * as layoutFrisianFy from './../../assets/keyboard-layouts/layout-frisian-fy.json';
import * as layoutGagauzGag from './../../assets/keyboard-layouts/layout-gagauz-gag.json';
import * as layoutQaraqalpaqKaa from './../../assets/keyboard-layouts/layout-qaraqalpaq-kaa.json';
import * as layoutTamuKyiTamu from './../../assets/keyboard-layouts/layout-tamukyi-tamu.json';
import * as layoutDagbanliDag from './../../assets/keyboard-layouts/layout-dagbanli-dag.json';
import * as layoutDagaareDgaBf from './../../assets/keyboard-layouts/layout-dagaare-dgabf.json';
import * as layoutMossiMos from './../../assets/keyboard-layouts/layout-mossi-mos.json';
import * as layoutDagaareDgaGh from './../../assets/keyboard-layouts/layout-dagaare-dgagh.json';
import * as layoutSamoanSm from './../../assets/keyboard-layouts/layout-samoan-sm.json';
import * as layoutChamorroCh from './../../assets/keyboard-layouts/layout-chamorro-ch.json';
import * as layoutLatgalianLtg from './../../assets/keyboard-layouts/layout-latgalian-ltg.json';
import * as layoutPracalitPrac from './../../assets/keyboard-layouts/layout-pracalit-newa.json';
import * as layoutGuptaGup from './../../assets/keyboard-layouts/layout-gupta-gup.json';
import * as layoutSiddhamSidd from './../../assets/keyboard-layouts/layout-siddham-sidd.json';
import * as layoutSharadaShrd from './../../assets/keyboard-layouts/layout-sharada-shrd.json';
import * as layoutSaramaccanSrm from './../../assets/keyboard-layouts/layout-saramaccan-srm.json';
import * as layoutKiribatiGil from './../../assets/keyboard-layouts/layout-kiribati-gil.json';
import * as layoutHindiHi from './../../assets/keyboard-layouts/layout-hindi-hi.json';
import * as layoutMaithiliMai from './../../assets/keyboard-layouts/layout-maithili-mai.json';
import * as layoutSindhiSnd from './../../assets/keyboard-layouts/layout-sindhi-snd.json';
import * as layoutMarathiMr from './../../assets/keyboard-layouts/layout-marathi-mr.json';
import * as layoutModiModi from './../../assets/keyboard-layouts/layout-modi-modi.json';
import * as layoutSamogitianSgs from './../../assets/keyboard-layouts/layout-samogitian-sgs.json';
import * as layoutBavarianBar from './../../assets/keyboard-layouts/layout-bavarian-bar.json';
import * as layoutNandinagariNand from './../../assets/keyboard-layouts/layout-nandinagari-nand.json';
import * as layoutPallavaPall from './../../assets/keyboard-layouts/layout-pallava-pall.json';
import * as layoutEvenkiEvnLa from './../../assets/keyboard-layouts/layout-evenki-evnla.json';
import * as layoutEvenkiEvnCy from './../../assets/keyboard-layouts/layout-evenki-evncy.json';
import * as layoutEvenkiEvn from './../../assets/keyboard-layouts/layout-evenki-evn.json';
import * as layoutOduduwaOdu from './../../assets/keyboard-layouts/layout-oduduwa-odu.json';
import * as layoutTocharianToch from './../../assets/keyboard-layouts/layout-tocharian-toch.json';
import * as layoutSaurashtraSaur from './../../assets/keyboard-layouts/layout-saurashtra-saur.json';
import * as layoutHmongHmn from './../../assets/keyboard-layouts/layout-hmong-hmn.json';
import * as layoutHmongHmnp from './../../assets/keyboard-layouts/layout-hmong-hmnp.json';
import * as layoutKaithiKthi from './../../assets/keyboard-layouts/layout-kaithi-kthi.json';
import * as layoutBrailleIUB from './../../assets/keyboard-layouts/layout-braille-iub.json';
import * as layoutMoonMoon from './../../assets/keyboard-layouts/layout-moon-moon.json';
import * as layoutInpiaqEsi from './../../assets/keyboard-layouts/layout-inpiaq-esi.json';
import * as layoutInupiatunEsk from './../../assets/keyboard-layouts/layout-inupiatun-esk.json';
import * as layoutUummarmiutunIpk from './../../assets/keyboard-layouts/layout-uummarmiutun-ipk.json';
import * as layoutBrahmiSa from './../../assets/keyboard-layouts/layout-brahmi-brah.json';
import * as layoutMagarMaga from './../../assets/keyboard-layouts/layout-magarakkha-maga.json';
import * as layoutWanchoWcho from './../../assets/keyboard-layouts/layout-wancho-wcho.json';
import * as layoutPunjabiPa from './../../assets/keyboard-layouts/layout-punjabi-pa.json';
import * as layoutPalauanPau from './../../assets/keyboard-layouts/layout-palauan-pau.json';
import * as layoutGujaratiGu from './../../assets/keyboard-layouts/layout-gujarati-gu.json';
import * as layoutOdiaOr from './../../assets/keyboard-layouts/layout-odia-or.json';
import * as layoutBengaliBn from './../../assets/keyboard-layouts/layout-bengali-bn.json';
import * as layoutAssameseAs from './../../assets/keyboard-layouts/layout-assamese-as.json';
import * as layoutHajongHaj from './../../assets/keyboard-layouts/layout-hajong-haj.json';
import * as layoutBodoBrx from './../../assets/keyboard-layouts/layout-bodo-brx.json';
import * as layoutBodoBrxLa from './../../assets/keyboard-layouts/layout-bodo-brxla.json';
import * as layoutKamarupiKama from './../../assets/keyboard-layouts/layout-kamarupi-kama.json';
import * as layoutKhimhunTang from './../../assets/keyboard-layouts/layout-khimhun-tang.json';
import * as layoutTirhutaTirh from './../../assets/keyboard-layouts/layout-tirhuta-tirh.json';
import * as layoutTakriTakr from './../../assets/keyboard-layouts/layout-takri-takr.json';
import * as layoutHmongHmng from './../../assets/keyboard-layouts/layout-hmong-hmng.json';
import * as layoutKhojkiKhoj from './../../assets/keyboard-layouts/layout-khojki-khoj.json';
import * as layoutKhudawadiKhud from './../../assets/keyboard-layouts/layout-khudawadi-khud.json';
import * as layoutSylotiSylo from './../../assets/keyboard-layouts/layout-sylheti-sylo.json';
import * as layoutManipuriMni from './../../assets/keyboard-layouts/layout-manipuri-mni.json';
import * as layoutTibetianTibt from './../../assets/keyboard-layouts/layout-tibetian-tibt.json';
import * as layoutLadakhiLbj from './../../assets/keyboard-layouts/layout-ladakhi-lbj.json';
import * as layoutMultaniMult from './../../assets/keyboard-layouts/layout-multani-mult.json';
import * as layoutMahajaniMaha from './../../assets/keyboard-layouts/layout-mahajani-maha.json';
import * as layoutThaanaThaa from './../../assets/keyboard-layouts/layout-thaana-thaa.json';
import * as layoutDhivehiDv from './../../assets/keyboard-layouts/layout-dhivehi-dv.json';
import * as layoutDivesAkuruDiak from './../../assets/keyboard-layouts/layout-divesakuru-diak.json';
import * as layoutGeezGeez from './../../assets/keyboard-layouts/layout-geez-geez.json';
import * as layoutLepchaLepc from './../../assets/keyboard-layouts/layout-lepcha-lepc.json';
import * as layoutKhmerKm from './../../assets/keyboard-layouts/layout-khmer-km.json';
import * as layoutSinhalaSi from './../../assets/keyboard-layouts/layout-sinhala-si.json';
import * as layoutThaiThai from './../../assets/keyboard-layouts/layout-thai-th.json';
import * as layoutLaoLao from './../../assets/keyboard-layouts/layout-lao-lo.json';
import * as layoutShanShan from './../../assets/keyboard-layouts/layout-shan-shan.json';
import * as layoutMyanmarMy from './../../assets/keyboard-layouts/layout-myanmar-my.json';
import * as layoutBalineseBali from './../../assets/keyboard-layouts/layout-balinese-bali.json';
import * as layoutJavaneseJv from './../../assets/keyboard-layouts/layout-javanese-jv.json';
import * as layoutBugineseBug from './../../assets/keyboard-layouts/layout-buginese-bug.json';
import * as layoutKulitanKuli from './../../assets/keyboard-layouts/layout-kulitan-kuli.json';
import * as layoutMakasarMaka from './../../assets/keyboard-layouts/layout-makasar-maka.json';
import * as layoutBatakBatk from './../../assets/keyboard-layouts/layout-batak-batk.json';
import * as layoutBaybayinTglg from './../../assets/keyboard-layouts/layout-baybayin-tglg.json';
import * as layoutHanunuoHano from './../../assets/keyboard-layouts/layout-hanunoo-hano.json';
import * as layoutTagbanwaTagb from './../../assets/keyboard-layouts/layout-tagbanwa-tagb.json';
import * as layoutChakmaCakm from './../../assets/keyboard-layouts/layout-chakma-cakm.json';
import * as layoutChamCham from './../../assets/keyboard-layouts/layout-cham-cham.json';
import * as layoutWolofalWoal from './../../assets/keyboard-layouts/layout-wolofal-woal.json';
import * as layoutFulaFf from './../../assets/keyboard-layouts/layout-fula-ff.json';
import * as layoutMongolianMnla from './../../assets/keyboard-layouts/layout-mongolian-mnla.json';
import * as layoutTokPonaTokp from './../../assets/keyboard-layouts/layout-tokpona-tokp.json';
import * as layoutBikolBcl from './../../assets/keyboard-layouts/layout-bikol-bcl.json';
import * as layoutBuhidBuhd from './../../assets/keyboard-layouts/layout-buhid-buhd.json';
import * as layoutTokPisinTpi from './../../assets/keyboard-layouts/layout-tokpisin-tpi.json';
import * as layoutKhasiKha from './../../assets/keyboard-layouts/layout-khasi-kha.json';
import * as layoutTanchangyaTach from './../../assets/keyboard-layouts/layout-tanchangya-tach.json';
import * as layoutBhaiksukiBhai from './../../assets/keyboard-layouts/layout-bhaiksuki-bhai.json';
import * as layoutTaiLeTale from './../../assets/keyboard-layouts/layout-taile-tale.json';
import * as layoutTaiLueTalu from './../../assets/keyboard-layouts/layout-tailue-talu.json';
import * as layoutTaithamLana from './../../assets/keyboard-layouts/layout-taitham-lana.json';
import * as layoutRejangRjng from './../../assets/keyboard-layouts/layout-rejang-rjng.json';
import * as layoutRencongRenc from './../../assets/keyboard-layouts/layout-rencong-renc.json';
import * as layoutAhomAhom from './../../assets/keyboard-layouts/layout-ahom-ahom.json';
import * as layoutZanabazarZanb from './../../assets/keyboard-layouts/layout-zanabazar-zanb.json';
import * as layoutSorasompengSora from './../../assets/keyboard-layouts/layout-sorasompeng-sora.json';
import * as layoutBassaVah from './../../assets/keyboard-layouts/layout-bassa-vah.json';
import * as layoutZaghawaZag from './../../assets/keyboard-layouts/layout-beria-zag.json';
import * as layoutBaburiKhat from './../../assets/keyboard-layouts/layout-baburi-khat.json';
import * as layoutMandombeMamb from './../../assets/keyboard-layouts/layout-mandombe-mamb.json';
import * as layoutSundaneseSund from './../../assets/keyboard-layouts/layout-sundanese-sund.json';
import * as layoutOrkhonOrkh from './../../assets/keyboard-layouts/layout-orkhon-orkh.json';
import * as layoutMwangwegoMwan from './../../assets/keyboard-layouts/layout-mwangwego-mwan.json';
import * as layoutIndonesianId from './../../assets/keyboard-layouts/layout-indonesia-id.json';
import * as layoutBamunBamu from './../../assets/keyboard-layouts/layout-bamun-bamu.json';
import * as layoutGalicianGl from './../../assets/keyboard-layouts/layout-galician-gl.json';
import * as layoutIlonggoHil from './../../assets/keyboard-layouts/layout-ilonggo-hil.json';
import * as layoutGreenlandicKl from './../../assets/keyboard-layouts/layout-greenlandic-kl.json';
import * as layoutIbanIba from './../../assets/keyboard-layouts/layout-iban-iba.json';
import * as layoutDitemaDite from './../../assets/keyboard-layouts/layout-ditema-dite.json';
import * as layoutWoleaiWole from './../../assets/keyboard-layouts/layout-woleai-wole.json';
import * as layoutCreeCree from './../../assets/keyboard-layouts/layout-cree-cree.json';
import * as layoutCrewCrew from './../../assets/keyboard-layouts/layout-crew-crew.json';
import * as layoutVaiVaii from './../../assets/keyboard-layouts/layout-vai-vaii.json';
import * as layoutInuktitutIku from './../../assets/keyboard-layouts/layout-inuktitut-iku.json';
import * as layoutCherokeeCher from './../../assets/keyboard-layouts/layout-cherokee-cher.json';
import * as layoutKayahLi from './../../assets/keyboard-layouts/layout-kayahli-kali.json';
import * as layoutLimbuLimb from './../../assets/keyboard-layouts/layout-limbu-limb.json';
import * as layoutKawiKawi from './../../assets/keyboard-layouts/layout-kawi-kawi.json';
import * as layoutAvestanAvst from './../../assets/keyboard-layouts/layout-avestan-avst.json';
import * as layoutWolofWolf from './../../assets/keyboard-layouts/layout-wolof-wolf.json';
import * as layoutKhorpaKhor from './../../assets/keyboard-layouts/layout-khorpa-khor.json';
import * as layoutMansiMns from './../../assets/keyboard-layouts/layout-mansi-mns.json';
import * as layoutKhantyKca from './../../assets/keyboard-layouts/layout-khanty-kca.json';
import * as layoutSaraikiSkr from './../../assets/keyboard-layouts/layout-saraiki-skr.json';
import * as layoutPaucinhauPauc from './../../assets/keyboard-layouts/layout-paucinhau-pauc.json';
import * as layoutKharosthiKhar from './../../assets/keyboard-layouts/layout-kharosthi-khar.json';
import * as layoutLandaLand from './../../assets/keyboard-layouts/layout-landa-land.json';
import * as layoutPhagsPa from './../../assets/keyboard-layouts/layout-phagspa-phag.json';
import * as layoutDogriDogr from './../../assets/keyboard-layouts/layout-dogri-dogr.json';
import * as layoutTikamuliTika from './../../assets/keyboard-layouts/layout-tikamuli-tika.json';
import * as layoutAbkhazAb from './../../assets/keyboard-layouts/layout-abkhaz-ab.json';
import * as layoutLatinLa from './../../assets/keyboard-layouts/layout-latin-la.json';
import * as layoutPolishPl from './../../assets/keyboard-layouts/layout-polish-pl.json';
import * as layoutKinyarwandaRw from './../../assets/keyboard-layouts/layout-kinyarwanda-rw.json';
import * as layoutShonaSn from './../../assets/keyboard-layouts/layout-shona-sn.json';
import * as layoutTurkishTr from './../../assets/keyboard-layouts/layout-turkish-tr.json';
import * as layoutLingalaLn from './../../assets/keyboard-layouts/layout-lingala-ln.json';
import * as layoutUyghurUyy from './../../assets/keyboard-layouts/layout-uyghur-uyy.json';
import * as layoutUyghurUg from './../../assets/keyboard-layouts/layout-uyghur-ug.json';
import * as layoutUyghurUsy from './../../assets/keyboard-layouts/layout-uyghur-usy.json';
import * as layoutCaucasianAlbanianUdi from './../../assets/keyboard-layouts/layout-udi-udi.json';
import * as layoutOsageOsge from './../../assets/keyboard-layouts/layout-osage-osge.json';
import * as layoutAfakaNjdu from './../../assets/keyboard-layouts/layout-afaka-ndju.json';
import * as layoutTurkmenTk from './../../assets/keyboard-layouts/layout-turkmen-tk.json';
import * as layoutTurkmenTuk from './../../assets/keyboard-layouts/layout-turkmen-tuk.json';
import * as layoutGreekEl from './../../assets/keyboard-layouts/layout-greek-el.json';
import * as layoutCopticCopt from './../../assets/keyboard-layouts/layout-coptic-copt.json';
import * as layoutTatarTt from './../../assets/keyboard-layouts/layout-tatar-tt.json';
import * as layoutBulgarianBg from './../../assets/keyboard-layouts/layout-bulgarian-bg.json';
import * as layoutBashkirBak from './../../assets/keyboard-layouts/layout-bashkir-bak.json';
import * as layoutCypriotCprt from './../../assets/keyboard-layouts/layout-cypriot-cprt.json';
import * as layoutLinearBLinb from './../../assets/keyboard-layouts/layout-linearb-linb.json';
import * as layoutBerberTfng from './../../assets/keyboard-layouts/layout-berber-tfng.json';
import * as layoutBerberBer from './../../assets/keyboard-layouts/layout-berber-ber.json';
import * as layoutOsmaniaOsma from './../../assets/keyboard-layouts/layout-osmania-osma.json';
import * as layoutAdlamAdlm from './../../assets/keyboard-layouts/layout-adlam-adlm.json';
import * as layoutOlChiki from './../../assets/keyboard-layouts/layout-olchiki-olck.json';
import * as layoutMruMroo from './../../assets/keyboard-layouts/layout-mru-mroo.json';
import * as layoutDhankariDhan from './../../assets/keyboard-layouts/layout-dhankari-dhan.json';
import * as layoutGeorgianKa from './../../assets/keyboard-layouts/layout-georgian-ka.json';
import * as layoutAsomtavruliAsom from './../../assets/keyboard-layouts/layout-asomtavruli-asom.json';
import * as layoutNushkuriNusk from './../../assets/keyboard-layouts/layout-nuskhuri-nusk.json';
import * as layoutArmenianHy from './../../assets/keyboard-layouts/layout-armenian-hy.json';
import * as layoutKazakhKaz from './../../assets/keyboard-layouts/layout-kazakh-kaz.json';
import * as layoutKazakhKk from './../../assets/keyboard-layouts/layout-kazakh-kk.json';
import * as layoutTajikTgk from './../../assets/keyboard-layouts/layout-tajik-tgk.json';
import * as layoutTajikTg from './../../assets/keyboard-layouts/layout-tajik-tg.json';
import * as layoutUzbekUz from './../../assets/keyboard-layouts/layout-uzbek-uz.json';
import * as layoutUzbekUzb from './../../assets/keyboard-layouts/layout-uzbek-uzb.json';
import * as layoutSerbianSr from './../../assets/keyboard-layouts/layout-serbian-sr.json';
import * as layoutFijianFj from './../../assets/keyboard-layouts/layout-fijian-fj.json';
import * as layoutAragoneseAn from './../../assets/keyboard-layouts/layout-aragonese-an.json';
import * as layoutFruilianFur from './../../assets/keyboard-layouts/layout-furlan-fur.json';
import * as layoutNavajoNv from './../../assets/keyboard-layouts/layout-navajo-nv.json';
import * as layoutkirundiRn from './../../assets/keyboard-layouts/layout-kirundi-rn.json';
import * as layoutKurdishCkb from './../../assets/keyboard-layouts/layout-kurdish-ckb.json';
import * as layoutKurdishKu from './../../assets/keyboard-layouts/layout-kurdish-ku.json';
import * as layoutAzerbaijaniAz from './../../assets/keyboard-layouts/layout-azerbaijani-az.json';
import * as layoutAzerbaijaniAze from './../../assets/keyboard-layouts/layout-azerbaijani-aze.json';
import * as layoutMacedonianMk from './../../assets/keyboard-layouts/layout-macedonian-mk.json';
import * as layoutKyrgyzKy from './../../assets/keyboard-layouts/layout-kyrgyz-ky.json';
import * as layoutMongolianMn from './../../assets/keyboard-layouts/layout-mongolian-mn.json';
import * as layoutMongolianMon from './../../assets/keyboard-layouts/layout-mongolian-mon.json';
import * as layoutJudeoEspanyolLad from './../../assets/keyboard-layouts/layout-judeoespanyol-lad.json';
import * as layoutJudeoEspanyolLadLa from './../../assets/keyboard-layouts/layout-judeoespanyol-ladla.json';
import * as layoutYakutSah from './../../assets/keyboard-layouts/layout-yakut-sah.json';
import * as layoutSwahiliSw from './../../assets/keyboard-layouts/layout-swahili-sw.json';
import * as layoutRussianRu from './../../assets/keyboard-layouts/layout-russian-ru.json';
import * as layoutSlovenianSl from './../../assets/keyboard-layouts/layout-slovenian-sl.json';
import * as layoutBelarussianBe from './../../assets/keyboard-layouts/layout-belarussian-be.json';
import * as layoutUkranianUk from './../../assets/keyboard-layouts/layout-ukrainian-uk.json';
import * as layoutCroatianHr from './../../assets/keyboard-layouts/layout-croatian-hr.json';
import * as layoutKashubianCsb from './../../assets/keyboard-layouts/layout-kashubian-csb.json';
import * as layoutSamiSe from './../../assets/keyboard-layouts/layout-sami-se.json';
import * as layoutGoykandiGoyk from './../../assets/keyboard-layouts/layout-goykandi-goyk.json';
import * as layoutEweEe from './../../assets/keyboard-layouts/layout-ewe-ee.json';
import * as layoutCeltiberianXce from './../../assets/keyboard-layouts/layout-celtiberian-xce.json';
import * as layoutIlocanoIlo from './../../assets/keyboard-layouts/layout-ilocano-ilo.json';
import * as layoutKomiKomi from './../../assets/keyboard-layouts/layout-komi-komi.json';
import * as layoutPashtoPs from './../../assets/keyboard-layouts/layout-pashto-ps.json';
import * as layoutDeutschDe from './../../assets/keyboard-layouts/layout-deutsch-de.json';
import * as layoutFrakturLatf from './../../assets/keyboard-layouts/layout-fraktur-latf.json';
import * as layoutEstonianEt from './../../assets/keyboard-layouts/layout-estonia-et.json';
import * as layoutSpanishEs from './../../assets/keyboard-layouts/layout-spanish-es.json';
import * as layoutSpanishEsMX from './../../assets/keyboard-layouts/layout-spanish-esmx.json';
import * as layoutIcelandicIs from './../../assets/keyboard-layouts/layout-icelandic-is.json';
import * as layoutEdoBin from './../../assets/keyboard-layouts/layout-edo-bin.json';
import * as layoutKrioKri from './../../assets/keyboard-layouts/layout-krio-kri.json';
import * as layoutPortuguesePt from './../../assets/keyboard-layouts/layout-portuguese-pt.json';
import * as layoutPortuguesePtBR from './../../assets/keyboard-layouts/layout-portuguese-ptbr.json';
import * as layoutSwedishSv from './../../assets/keyboard-layouts/layout-swedish-sv.json';
import * as layoutSesotholeboaSt from './../../assets/keyboard-layouts/layout-sesotholeboa-st.json';
import * as layoutSepediNso from './../../assets/keyboard-layouts/layout-sepedi-nso.json';
import * as layoutSetswanaTn from './../../assets/keyboard-layouts/layout-setswana-tn.json';
import * as layoutScotsGaelicGd from './../../assets/keyboard-layouts/layout-gaelic-gd.json';
import * as layoutGaelicGael from './../../assets/keyboard-layouts/layout-gaelic-gael.json';
import * as layoutGalloGall from './../../assets/keyboard-layouts/layout-gallo-gall.json';
import * as layoutSilicianScu from './../../assets/keyboard-layouts/layout-silician-scu.json';
import * as layoutAsturianAst from './../../assets/keyboard-layouts/layout-asturian-ast.json';
import * as layoutBosnianBsLa from './../../assets/keyboard-layouts/layout-bosnian-bsla.json';
import * as layoutMalagasyMg from './../../assets/keyboard-layouts/layout-malagasy-mg.json';
import * as layoutFongbeFon from './../../assets/keyboard-layouts/layout-fongbe-fon.json';
import * as layoutSwatiSs from './../../assets/keyboard-layouts/layout-siswati-ss.json';
import * as layoutEsperantoEo from './../../assets/keyboard-layouts/layout-esperanto-eo.json';
import * as layoutLivonianLiv from './../../assets/keyboard-layouts/layout-livonian-liv.json';
import * as layoutLimburgishLi from './../../assets/keyboard-layouts/layout-limburgish-li.json';
import * as layoutFaroeseFo from './../../assets/keyboard-layouts/layout-faroese-fo.json';
import * as layoutFinnishFi from './../../assets/keyboard-layouts/layout-finnish-fi.json';
import * as layoutFrenchFr from './../../assets/keyboard-layouts/layout-french-fr.json';
import * as layoutOccitanOc from './../../assets/keyboard-layouts/layout-occitan-oc.json';
import * as layoutAfrikaansAf from './../../assets/keyboard-layouts/layout-afrikaans-af.json';
import * as layoutCatalanCa from './../../assets/keyboard-layouts/layout-catalan-ca.json';
import * as layoutFrenchFrCa from './../../assets/keyboard-layouts/layout-french-frca.json';
import * as layoutBasqueEu from './../../assets/keyboard-layouts/layout-basque-eu.json';
import * as layoutSwissGermanGsw from './../../assets/keyboard-layouts/layout-swissgerman-gsw.json';
import * as layoutSorbianWen from './../../assets/keyboard-layouts/layout-sorbian-wen.json';
import * as layoutEnglishEnUS from './../../assets/keyboard-layouts/layout-english-enus.json';
import * as layoutEnglishEnUK from './../../assets/keyboard-layouts/layout-english-engb.json';
import * as layoutEnglishEnIN from './../../assets/keyboard-layouts/layout-english-enin.json';
import * as layoutEnglishEnIntl from './../../assets/keyboard-layouts/layout-english-enintl.json';
import * as layoutEurKeyEurKey from './../../assets/keyboard-layouts/layout-eurkey-eurkey.json';
import * as layoutAngliscAng from './../../assets/keyboard-layouts/layout-anglisc-ang.json';
import * as layoutDutchNl from './../../assets/keyboard-layouts/layout-dutch-nl.json';
import * as layoutItalianIt from './../../assets/keyboard-layouts/layout-italian-it.json';
import * as layoutCzechCs from './../../assets/keyboard-layouts/layout-czech-cs.json';
import * as layoutLithuanianLt from './../../assets/keyboard-layouts/layout-lithuanian-lt.json';
import * as layoutMalteseMt from './../../assets/keyboard-layouts/layout-maltese-mt.json';
import * as layoutGothicGoth from './../../assets/keyboard-layouts/layout-gothic-goth.json';
import * as layoutKashmiriKs from './../../assets/keyboard-layouts/layout-kashmiri-ks.json';
import * as layoutAlbanianSq from './../../assets/keyboard-layouts/layout-albanian-sq.json';
import * as layoutCarianCari from './../../assets/keyboard-layouts/layout-carian-cari.json';
import * as layoutLydianLydi from './../../assets/keyboard-layouts/layout-lydian-lydi.json';
import * as layoutLycianLyci from './../../assets/keyboard-layouts/layout-lycian-lyci.json';
import * as layoutLeponticLepo from './../../assets/keyboard-layouts/layout-lepontic-lepo.json';
import * as layoutPhrygianPhyg from './../../assets/keyboard-layouts/layout-phrygian-phyg.json';
import * as layoutSabellicSabe from './../../assets/keyboard-layouts/layout-sabellic-sabe.json';
import * as layoutElbasanElba from './../../assets/keyboard-layouts/layout-elbasan-elba.json';
import * as layoutVithkuqiVith from './../../assets/keyboard-layouts/layout-vithkuqi-vith.json';
import * as layoutRunicRunr from './../../assets/keyboard-layouts/layout-runic-runr.json';
import * as layoutDaleCarlianDale from './../../assets/keyboard-layouts/layout-dalecarlian-dale.json';
import * as layoutOiratOira from './../../assets/keyboard-layouts/layout-oirat-oira.json';
import * as layoutPunicXpu from './../../assets/keyboard-layouts/layout-punic-xpu.json';
import * as layoutPhonecianPhn from './../../assets/keyboard-layouts/layout-phonecian-phn.json';
import * as layoutEtruscanEtt from './../../assets/keyboard-layouts/layout-etruscan-ett.json';
import * as layoutPicenePice from './../../assets/keyboard-layouts/layout-picene-pice.json';
import * as layoutRovasirasHung from './../../assets/keyboard-layouts/layout-rovasiras-hung.json';
import * as layoutKanjiJa from './../../assets/keyboard-layouts/layout-kanji-ja.json';
import * as layoutAvoiuliAvo from './../../assets/keyboard-layouts/layout-avoiuli-avo.json';
import * as layoutGlagoliticGlag from './../../assets/keyboard-layouts/layout-glagolitic-glag.json';
import * as layoutTangutTxg from './../../assets/keyboard-layouts/layout-tangut-txg.json';
import * as layoutOracleBoneJiag from './../../assets/keyboard-layouts/layout-oraclebone-jiag.json';
import * as layoutItalicItal from './../../assets/keyboard-layouts/layout-italic-ital.json';
import * as layoutOghamOgam from './../../assets/keyboard-layouts/layout-ogham-ogam.json';
import * as layoutAdinkraAdin from './../../assets/keyboard-layouts/layout-adinkra-adin.json';
import * as layoutKhomKhom from './../../assets/keyboard-layouts/layout-khom-khom.json';
import * as layoutMikmaqMikq from './../../assets/keyboard-layouts/layout-mikmaq-mikq.json';
import * as layoutNorwegianNb from './../../assets/keyboard-layouts/layout-norwegian-no.json';
import * as layoutDanishDa from './../../assets/keyboard-layouts/layout-danish-da.json';
import * as layoutCanadianAboriginalCans from './../../assets/keyboard-layouts/layout-canadianaboriginal-cans.json';
import * as layoutLuoLuo from './../../assets/keyboard-layouts/layout-luo-luo.json';
import * as layoutCanaaniteCana from './../../assets/keyboard-layouts/layout-canaanite-cana.json';
import * as layoutSinaiticSina from './../../assets/keyboard-layouts/layout-sinaitic-sina.json';
import * as layoutAztecAztc from './../../assets/keyboard-layouts/layout-aztec-aztc.json';
import * as layoutTokbirimChik from './../../assets/keyboard-layouts/layout-tokbirim-chik.json';
import * as layoutKatakanaKata from './../../assets/keyboard-layouts/layout-katakana-kata.json';
import * as layoutHiraganaHira from './../../assets/keyboard-layouts/layout-hiragana-hira.json';
import * as layoutBopomofoBopo from './../../assets/keyboard-layouts/layout-bopomofo-bopo.json';
import * as layoutMossangMoss from './../../assets/keyboard-layouts/layout-mossang-moss.json';
import * as layoutKangxiKan from './../../assets/keyboard-layouts/layout-kangxi-kan.json';
import * as layoutMikmaqMic from './../../assets/keyboard-layouts/layout-mikmaq-mic.json';
import * as layoutTartessianTxr from './../../assets/keyboard-layouts/layout-tartessian-txr.json';
import * as layoutIberianIbe from './../../assets/keyboard-layouts/layout-iberian-ibe.json';
import * as layoutEgyptianKmt from './../../assets/keyboard-layouts/layout-egyptian-kmt.json';
import * as layoutZihuiZih from './../../assets/keyboard-layouts/layout-zihui-zih.json';
import * as layoutKoreanKo from './../../assets/keyboard-layouts/layout-hangul-ko.json';
import * as layoutMirandeseMwl from './../../assets/keyboard-layouts/layout-mirandese-mwl.json';
import * as layoutMadureseMad from './../../assets/keyboard-layouts/layout-madhura-mad.json';
import * as layoutHebrewHe from './../../assets/keyboard-layouts/layout-hebrew-he.json';
import * as layoutManchuMnc from './../../assets/keyboard-layouts/layout-manchu-mnc.json';
import * as layoutYiddishYi from './../../assets/keyboard-layouts/layout-yiddish-yi.json';
import * as layoutNyanjaNy from './../../assets/keyboard-layouts/layout-nyanja-ny.json';
import * as layoutMandikaMnk from './../../assets/keyboard-layouts/layout-mandinka-mnk.json';
import * as layoutMandikaMnkAr from './../../assets/keyboard-layouts/layout-mandinka-mnkar.json';
import * as layoutTotoToto from './../../assets/keyboard-layouts/layout-toto-toto.json';
import * as layoutSomaliSo from './../../assets/keyboard-layouts/layout-somali-so.json';
import * as layoutMalayMs from './../../assets/keyboard-layouts/layout-malay-ms.json';
import * as layoutJawiJawi from './../../assets/keyboard-layouts/layout-jawi-jawi.json';
import * as layoutWarayWar from './../../assets/keyboard-layouts/layout-waray-war.json';
import * as layoutCornishKw from './../../assets/keyboard-layouts/layout-cornish-kw.json';
import * as layoutBislamaBis from './../../assets/keyboard-layouts/layout-bislama-bis.json';
import * as layoutTongaTo from './../../assets/keyboard-layouts/layout-tonga-to.json';
import * as layoutPangasinanPag from './../../assets/keyboard-layouts/layout-pangasinan-pag.json';
import * as layoutBretonBr from './../../assets/keyboard-layouts/layout-breton-br.json';
import * as layoutAymaraAy from './../../assets/keyboard-layouts/layout-aymara-ay.json';
import * as layoutManxGv from './../../assets/keyboard-layouts/layout-manx-gv.json';
import * as layoutMendeMend from './../../assets/keyboard-layouts/layout-mende-mend.json';
import * as layoutAramaicArc from './../../assets/keyboard-layouts/layout-aramaic-arc.json';
import * as layoutArchaicGreekIon from './../../assets/keyboard-layouts/layout-archaicgreek-ion.json';
import * as layoutGebaGeba from './../../assets/keyboard-layouts/layout-geba-geba.json';
import * as layoutSogdianSog from './../../assets/keyboard-layouts/layout-sogdian-sog.json';
import * as layoutKultobeKult from './../../assets/keyboard-layouts/layout-kultobe-kult.json';
import * as layoutSamaritanSamr from './../../assets/keyboard-layouts/layout-samaritan-samr.json';
import * as layoutKaidaKaid from './../../assets/keyboard-layouts/layout-kaida-kaid.json';
import * as layoutQafarafAa from './../../assets/keyboard-layouts/layout-qafaraf-aa.json';
import * as layoutSafaiticSafa from './../../assets/keyboard-layouts/layout-safaitic-safa.json';
import * as layoutFarsiFa from './../../assets/keyboard-layouts/layout-farsi-fa.json';
import * as layoutArabicAr from './../../assets/keyboard-layouts/layout-arabic-ar.json';
import * as layoutArabicArOld from './../../assets/keyboard-layouts/layout-oldarabic-arold.json';
import * as layoutMarchenMarc from './../../assets/keyboard-layouts/layout-marchen-marc.json';
import * as layoutAjamiAjam from './../../assets/keyboard-layouts/layout-ajami-ajam.json';
import * as layoutRapaNuiRap from './../../assets/keyboard-layouts/layout-rapanui-rap.json';
import * as layoutBurushaskiBsk from './../../assets/keyboard-layouts/layout-burushaski-bsk.json';
import * as layoutNagameseNag from './../../assets/keyboard-layouts/layout-nagamese-nag.json';
import * as layoutSaxonyNds from './../../assets/keyboard-layouts/layout-saxony-nds.json';
import * as layoutWelshCy from './../../assets/keyboard-layouts/layout-welsh-cy.json';
import * as layoutSlavonicCyrs from './../../assets/keyboard-layouts/layout-slavonic-cyrs.json';
import * as layoutPahlaviPal from './../../assets/keyboard-layouts/layout-pahlavi-pal.json';
import * as layoutParthianXpr from './../../assets/keyboard-layouts/layout-parthian-xpr.json';
import * as layoutMandaicMand from './../../assets/keyboard-layouts/layout-mandaic-mand.json';
import * as layoutChorasmianChor from './../../assets/keyboard-layouts/layout-chorasmian-chrs.json';
import * as layoutSabaeanXsa from './../../assets/keyboard-layouts/layout-sabaean-xsa.json';
import * as layoutMaoriMi from './../../assets/keyboard-layouts/layout-maori-mi.json';
import * as layoutQuechuaQu from './../../assets/keyboard-layouts/layout-quechua-qu.json';
import * as layoutCaddoCdd from './../../assets/keyboard-layouts/layout-caddoan-cdd.json';
import * as layoutRohingyaRhg from './../../assets/keyboard-layouts/layout-rohingya-rhg.json';
import * as layoutTahitianTy from './../../assets/keyboard-layouts/layout-tahitian-ty.json';
import * as layoutLativaLv from './../../assets/keyboard-layouts/layout-latvia-lv.json';
import * as layoutLisuLis from './../../assets/keyboard-layouts/layout-lisu-lis.json';
import * as layoutIrishGa from './../../assets/keyboard-layouts/layout-irish-ga.json';
import * as layoutLadinLld from './../../assets/keyboard-layouts/layout-ladin-lld.json';
import * as layoutIgboIg from './../../assets/keyboard-layouts/layout-igbo-ig.json';
import * as layoutSindhiSd from './../../assets/keyboard-layouts/layout-sindhi-sd.json';
import * as layoutBalochiBal from './../../assets/keyboard-layouts/layout-balochi-bal.json';
import * as layoutHausaHa from './../../assets/keyboard-layouts/layout-hausa-ha.json';
import * as layoutGuaraniGn from './../../assets/keyboard-layouts/layout-guarani-gn.json';
import * as layoutIPAIpa from './../../assets/keyboard-layouts/layout-ipa-ipa.json';
import * as layoutInuktitutIu from './../../assets/keyboard-layouts/layout-inuktitut-iu.json';
import * as layoutHungarianHu from './../../assets/keyboard-layouts/layout-hungarian-hu.json';
import * as layoutHawaiiHaw from './../../assets/keyboard-layouts/layout-hawaiian-haw.json';
import * as layoutSyriacSyrc from './../../assets/keyboard-layouts/layout-syriac-syrc.json';
import * as layoutSuriyaniGars from './../../assets/keyboard-layouts/layout-suriyani-gars.json';
import * as layoutPalmyrenePalm from './../../assets/keyboard-layouts/layout-palmyrene-palm.json';
import * as layoutElymaicElym from './../../assets/keyboard-layouts/layout-elymaic-elym.json';
import * as layoutLuwianLuw from './../../assets/keyboard-layouts/layout-luwian-luw.json';
import * as layoutHatranHatr from './../../assets/keyboard-layouts/layout-hatran-hatr.json';
import * as layoutRohingyaRohg from './../../assets/keyboard-layouts/layout-hanifi-rohg.json';
import * as layoutSlovakSk from './../../assets/keyboard-layouts/layout-slovak-sk.json';
import * as layoutBelgianBe from './../../assets/keyboard-layouts/layout-belgique-befr.json';
import * as layoutRomanianRo from './../../assets/keyboard-layouts/layout-romanian-ro.json';
import * as layoutDzongkhaDz from './../../assets/keyboard-layouts/layout-dzongkha-dz.json';
import * as layoutBosnianBs from './../../assets/keyboard-layouts/layout-bosnian-bs.json';
import * as layoutRallyRally from './../../assets/keyboard-layouts/layout-rally-rally.json';
import * as layoutBamanankanBm from './../../assets/keyboard-layouts/layout-bamanankan-bm.json';
import * as layoutLuxembourgishLb from './../../assets/keyboard-layouts/layout-luxembourgish-lb.json';
import * as layoutUrduUr from './../../assets/keyboard-layouts/layout-urdu-ur.json';
import * as layoutChisoiChis from './../../assets/keyboard-layouts/layout-chisoi-chis.json';
import * as layoutNagMundariNagm from './../../assets/keyboard-layouts/layout-nagmundari-nagm.json';
import * as layoutVietnameseVi from './../../assets/keyboard-layouts/layout-vietnamese-vi.json';
import * as layoutYorubaBjYo from './../../assets/keyboard-layouts/layout-yoruba-bjyo.json';
import * as layoutYorubaNgYo from './../../assets/keyboard-layouts/layout-yoruba-ngyo.json';
import * as layoutWolofWo from './../../assets/keyboard-layouts/layout-wolof-wo.json';
import * as layoutVenetianVec from './../../assets/keyboard-layouts/layout-venetian-vec.json';
import * as layoutManichaeanMani from './../../assets/keyboard-layouts/layout-manichaean-mani.json';
import * as layoutNabataeanNbat from './../../assets/keyboard-layouts/layout-nabataean-nbat.json';
import * as layoutPsalterPsal from './../../assets/keyboard-layouts/layout-psalter-psal.json';
import * as layoutZoulaiZou from './../../assets/keyboard-layouts/layout-zoulai-zou.json';
import * as layoutEskayanEsy from './../../assets/keyboard-layouts/layout-eskayan-esy.json';
import * as layoutNushuNshu from './../../assets/keyboard-layouts/layout-nushu-nshu.json';
import * as layoutUgariticUgar from './../../assets/keyboard-layouts/layout-ugaritic-ugar.json';
import * as layoutTainoTnq from './../../assets/keyboard-layouts/layout-taino-tnq.json';
import * as layoutMayanMaya from './../../assets/keyboard-layouts/layout-mayan-maya.json';
import * as layoutNosuYiii from './../../assets/keyboard-layouts/layout-nosu-yiii.json';
import * as layoutKochiKoch from './../../assets/keyboard-layouts/layout-kochi-koch.json';
import * as layoutChokweCjk from './../../assets/keyboard-layouts/layout-chokwe-cjk.json';
import * as layoutMaltoMalt from './../../assets/keyboard-layouts/layout-malto-malt.json';
import * as layoutKurukhKru from './../../assets/keyboard-layouts/layout-kurukh-kru.json';
import * as layoutShompenSii from './../../assets/keyboard-layouts/layout-shompen-sii.json';
import * as layoutMeroiticGlyph from './../../assets/keyboard-layouts/layout-meroiticglyph-mer.json';
import * as layoutMeroiticMero from './../../assets/keyboard-layouts/layout-meriotic-mero.json';
import * as layoutSumerianSux from './../../assets/keyboard-layouts/layout-cuneiform-sux.json';
import * as layoutBlackfootBla from './../../assets/keyboard-layouts/layout-blackfoot-bla.json';
import * as layoutElamiteElam from './../../assets/keyboard-layouts/layout-elamite-elx.json';
import * as layoutHittiteHit from './../../assets/keyboard-layouts/layout-hittite-hit.json';
import * as layoutVatteluttuVatt from './../../assets/keyboard-layouts/layout-vatteluttu-vatt.json';
import * as layoutHaitianCreoleHt from './../../assets/keyboard-layouts/layout-haitian-ht.json';
import * as layoutPersianXpeo from './../../assets/keyboard-layouts/layout-persian-xpeo.json';
import * as layoutDemoticEgyd from './../../assets/keyboard-layouts/layout-demotic-egyd.json';
import * as layoutNKoNKoo from './../../assets/keyboard-layouts/layout-nko-nkoo.json';
import * as layoutUmweroUmw from './../../assets/keyboard-layouts/layout-umwero-umw.json';
import * as layoutSundaneseSun from './../../assets/keyboard-layouts/layout-sundanese-su.json';
import * as layoutCebuanoCeb from './../../assets/keyboard-layouts/layout-cebuano-ceb.json';
import * as layoutAfricaIai from './../../assets/keyboard-layouts/layout-africa-iai.json';
import * as layoutPinyinPin from './../../assets/keyboard-layouts/layout-pinyin-pin.json';
import * as layoutLomaLoma from './../../assets/keyboard-layouts/layout-loma-loma.json';
import * as layoutNihongoJpn from './../../assets/keyboard-layouts/layout-nihongo-jpn.json';
import * as layoutAoNjo from './../../assets/keyboard-layouts/layout-ao-njo.json';
import * as layoutOldUyghurOugr from './../../assets/keyboard-layouts/layout-olduyghur-ougr.json';
import * as layoutNishiNjz from './../../assets/keyboard-layouts/layout-nishi-njz.json';
import * as layoutDinkaDin from './../../assets/keyboard-layouts/layout-dinka-din.json';
import * as layoutBugisBugla from './../../assets/keyboard-layouts/layout-bugis-bugla.json';
import * as layoutBaliBan from './../../assets/keyboard-layouts/layout-bali-ban.json';
import * as layoutMizoLus from './../../assets/keyboard-layouts/layout-mizo-lus.json';
import * as layoutMinangkabauMin from './../../assets/keyboard-layouts/layout-minangkabau-min.json';
import * as layoutGorontaloGor from './../../assets/keyboard-layouts/layout-gorontalo-gor.json';
import * as layoutYezidiYezi from './../../assets/keyboard-layouts/layout-yezidi-yezi.json';
import * as layoutChineseSimplified from './../../assets/keyboard-layouts/layout-chinese-zhcn.json';
import * as layoutChineseTraditional from './../../assets/keyboard-layouts/layout-chinese-zhtw.json';
import * as layoutTagalogTl from './../../assets/keyboard-layouts/layout-tagalog-tl.json';
import * as layoutAlchemyAlch from './../../assets/keyboard-layouts/layout-alchemy-alch.json';
import * as layoutJamaicanJam from './../../assets/keyboard-layouts/layout-jamaican-jam.json';
import * as layoutSeychelleseCrs from './../../assets/keyboard-layouts/layout-seychellese-crs.json';
import * as layoutBanjareseBjn from './../../assets/keyboard-layouts/layout-bahasabanjar-bjn.json';
import * as layoutAcehneseAce from './../../assets/keyboard-layouts/layout-acehnese-ace.json';
import * as layoutSoyomboSoyo from './../../assets/keyboard-layouts/layout-soyombo-soyo.json';
import * as layoutMauritianMfe from './../../assets/keyboard-layouts/layout-mauritian-mfe.json';
import * as layoutMasaramGondiGonm from './../../assets/keyboard-layouts/layout-gondi-gonm.json';
import * as layoutGunjalaGondiGong from './../../assets/keyboard-layouts/layout-gondi-gong.json';
import * as layoutKapampanganPam from './../../assets/keyboard-layouts/layout-kapampangan-pam.json';
import * as layoutPollardMiao from './../../assets/keyboard-layouts/layout-miao-plrd.json';
import * as layoutTaniTani from './../../assets/keyboard-layouts/layout-tani-tani.json';
import * as layoutKhitanKits from './../../assets/keyboard-layouts/layout-khitans-kits.json';
import * as layoutKhitanKitl from './../../assets/keyboard-layouts/layout-khitanl-kitl.json';
import * as layoutNubianOnw from './../../assets/keyboard-layouts/layout-nubian-onw.json';
import * as layoutAimaAima from './../../assets/keyboard-layouts/layout-aima-aima.json';
import * as layoutLinearALinea from './../../assets/keyboard-layouts/layout-lineara-linea.json';
import * as layoutKpelleKpe from './../../assets/keyboard-layouts/layout-kpelle-kpe.json';
import * as layoutTigrinyaTi from './../../assets/keyboard-layouts/layout-tigrinya-ti.json';
import * as layoutTigreTig from './../../assets/keyboard-layouts/layout-tigre-tig.json';
import * as layoutAmharicAm from './../../assets/keyboard-layouts/layout-amharic-am.json';
import * as layoutSyriacClassicalEstr from './../../assets/keyboard-layouts/layout-syriacclassical-estr.json';
import * as layoutSyriacWesternSert from './../../assets/keyboard-layouts/layout-syriacwestern-sert.json';
import * as layoutSyriacEasternMadn from './../../assets/keyboard-layouts/layout-syriaceastern-madn.json';
import * as layoutKhazarianKhaz from './../../assets/keyboard-layouts/layout-khazarian-khaz.json';
import * as layoutIndusIndus from './../../assets/keyboard-layouts/layout-indusscript-indus.json';
import * as layoutSunuwarSuz from './../../assets/keyboard-layouts/layout-jenticha-suz.json';
import * as layoutSignUS from './../../assets/keyboard-layouts/layout-fingers-ussign.json';
import * as layoutBANZSL from './../../assets/keyboard-layouts/layout-fingers-banzsl.json';
import * as layoutNaskapiNask from './../../assets/keyboard-layouts/layout-naskapi-nask.json';
import * as layoutCarrierCarr from './../../assets/keyboard-layouts/layout-carrier-carr.json';
import * as layoutOjibweOji from './../../assets/keyboard-layouts/layout-ojibwe-oji.json';
import * as layoutBearyBya from './../../assets/keyboard-layouts/layout-beary-bya.json';
import * as layoutDesiSign from './../../assets/keyboard-layouts/layout-fingers-desisign.json';
import * as layoutNsibidiNsi from './../../assets/keyboard-layouts/layout-nsibidi-nsi.json';
import * as layoutSignWritingSgnw from './../../assets/keyboard-layouts/layout-signwriting-sgnw.json';
import * as layoutBharatiBrailleBharati from './../../assets/keyboard-layouts/layout-bharatibraille-bharati.json';
import * as layoutFlagsICS from './../../assets/keyboard-layouts/layout-flags-ics.json';
import * as layoutSemaphoreFlag from './../../assets/keyboard-layouts/layout-semaphore-flag.json';
import * as layoutMorseCode from './../../assets/keyboard-layouts/layout-code-morse.json';

import { ThemeService } from '../core/services/theme.service';
import { TranslateService } from '../core/services/translate.service';
import { SessionManagerService } from '../core/services/session-manager.service';

export interface AvailableKeyboards {
  scriptType: string;
  scriptName: string[];
}

export interface TypeOfLayout {
  show: 'custom' | 'float' | 'calculate';
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.split(' ')[0].toLowerCase().indexOf(filterValue) === 0 || item.split(' ')[2].toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-customise-keyboards',
  templateUrl: './customise-keyboards.component.html',
  styleUrls: ['./customise-keyboards.component.scss']
})
export class CustomiseKeyboardsComponent implements OnInit {

  @ViewChild('searchAllScripts') searchInputAllScripts: ElementRef;
  @ViewChild('countOfSuggestionPerDevice') suggestionsForDevice : ElementRef;

  @ViewChild('equationField') equationField: ElementRef;
  @ViewChild('resultField') resultField: ElementRef;

  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;

  keyboardLayouts: any = (allLayoutPositions as any).default;
  layoutCurrentKeys: any = [];
  localisedKeyboardLayouts: any = (allLayoutPositions as any).default;

  layoutReligionKeys: any = (layoutReligionAll as any).default;
  layoutKannadaKeys: any = (layoutKannadaKn as any).default;
  layoutKadambaKeys: any = (layoutKadambaKada as any).default;
  layoutTeluguKeys: any = (layoutTeluguTe as any).default;
  layoutTamilKeys: any = (layoutTamilTa as any).default;
  layoutBadagaKeys: any = (layoutBadagaBada as any).default;
  layoutRomaniKeys: any = (layoutRomaniRom as any).default;
  layoutGrikoKeys: any = (layoutGrikoApu as any).default;
  layoutLFNKeys: any = (layoutLFNlfn as any).default;
  layoutLekeKeys: any = (layoutLekeLeke as any).default;
  layoutNeapolitanKeys: any = (layoutNeopolitanNap as any).default;
  layoutGranthaKeys: any = (layoutGranthaGran as any).default;
  layoutXhosaKeys: any = (layoutXhosaXh as any).default;
  layoutVilamovianKeys: any = (layoutVilamovianWym as any).default;
  layoutZuluKeys: any = (layoutZuluZu as any).default;
  layoutTaiVietKeys: any = (layoutTaiViet as any).default;
  layoutTaiNuaKeys: any = (layoutTaiNua as any).default;
  layoutKikuyuKeys: any = (layoutKikuyuKi as any).default;
  layoutNormanKeys: any = (layoutNormanNrf as any).default;
  layoutBhattiproluKeys: any = (layoutBhattiproluBhat as any).default;
  layoutPiedmonteseKeys: any = (layoutPiedmontesePms as any).default;
  layoutLombardKeys: any = (layoutLombardLmo as any).default;
  layoutVendaKeys: any = (layoutVendaVen as any).default;
  layoutPapiamentoKeys: any = (layoutPapiamentoPap as any).default;
  layoutTsongaKeys: any = (layoutTsongaTs as any).default;
  layoutLwoKeys: any = (layoutLwoLwo as any).default;
  layoutAriyakaKeys: any = (layoutAriyakaAri as any).default;
  layoutNauruanKeys: any = (layoutNauruanNa as any).default;
  layoutAkanKeys: any = (layoutAkanAk as any).default;
  layoutMasurianKeys: any = (layoutMasurianMasu as any).default;
  layoutZazakiKeys: any = (layoutZazakiZza as any).default;
  layoutMaranaoKeys: any = (layoutMaranaoMrw as any).default;
  layoutWakhiKeys: any = (layoutWakhiWbl as any).default;
  layoutMarshalleseKeys: any = (layoutMarshalleseMh as any).default;
  layoutWalonKeys: any = (layoutWalonWa as any).default;
  layoutOromoKeys: any = (layoutOromoOm as any).default;
  layoutKabiyeKeys: any = (layoutKabiyeKbp as any).default;
  layoutTaqbaylitKeys: any = (layoutTaqbaylitKab as any).default;
  layoutNdebeleKeys: any = (layoutNdebeleNde as any).default;
  layoutMalayalamKeys: any = (layoutMalayalamMl as any).default;
  layoutTigalariKeys: any = (layoutTigalariTiga as any).default;
  layoutSanskritKeys: any = (layoutSanskritSa as any).default;
  layoutSanskritLaKeys: any = (layoutSanskritIAST as any).default;
  layoutPaliLaKeys: any = (layoutPaliPli as any).default;
  layoutDhamKeys: any = (layoutDhimalDham as any).default;
  layoutGalikKeys: any = (layoutGalikGalk as any).default;
  layoutPalenqueroKeys: any = (layoutPalenqueroPln as any).default;
  layoutRanjanaKeys: any = (layoutRanjanaNew as any).default;
  layoutLigureKeys: any = (layoutLigureLij as any).default;
  layoutSarduKeys: any = (layoutSarduSc as any).default;
  layoutCorsicanKeys: any = (layoutCorsicanCo as any).default;
  layoutLugandaKeys: any = (layoutLugandaLg as any).default;
  layoutUbykKeys: any = (layoutUbykhUby as any).default;
  layoutKongoKeys: any = (layoutKongoKg as any).default;
  layoutNiasKeys: any = (layoutNiasNia as any).default;
  layoutTetunKeys: any = (layoutTetunTdt as any).default;
  layoutFrisianKeys: any = (layoutFrisianFy as any).default;
  layoutGagauzKeys: any = (layoutGagauzGag as any).default;
  layoutQaraqalpaqKeys: any = (layoutQaraqalpaqKaa as any).default;
  layoutTamuKyiKeys: any = (layoutTamuKyiTamu as any).default;
  layoutDagbanliKeys: any = (layoutDagbanliDag as any).default;
  layoutDagaareBfKeys: any = (layoutDagaareDgaBf as any).default;
  layoutMossiKeys: any = (layoutMossiMos as any).default;
  layoutDagaareGhKeys: any = (layoutDagaareDgaGh as any).default;
  layoutSamoanKeys: any = (layoutSamoanSm as any).default;
  layoutChamorroKeys: any = (layoutChamorroCh as any).default;
  layoutLatgalianKeys: any = (layoutLatgalianLtg as any).default;
  layoutPracalitKeys: any = (layoutPracalitPrac as any).default;
  layoutGuptaKeys: any = (layoutGuptaGup as any).default;
  layoutSiddhamKeys: any = (layoutSiddhamSidd as any).default;
  layoutSharadaKeys: any = (layoutSharadaShrd as any).default;
  layoutSaramaccanKeys: any = (layoutSaramaccanSrm as any).default;
  layoutKiribatiKeys: any = (layoutKiribatiGil as any).default;
  layoutHindiKeys: any = (layoutHindiHi as any).default;
  layoutMaithiliKeys: any = (layoutMaithiliMai as any).default;
  layoutSindhiSndKeys: any = (layoutSindhiSnd as any).default;
  layoutMarathiKeys: any = (layoutMarathiMr as any).default;
  layoutModiKeys: any = (layoutModiModi as any).default;
  layoutSamogitianKeys: any = (layoutSamogitianSgs as any).default;
  layoutBavarianKeys: any = (layoutBavarianBar as any).default;
  layoutNandinagariKeys: any = (layoutNandinagariNand as any).default;
  layoutPallavaKeys: any = (layoutPallavaPall as any).default;
  layoutEvenkiLaKeys: any = (layoutEvenkiEvnLa as any).default;
  layoutEvenkiCyKeys: any = (layoutEvenkiEvnCy as any).default;
  layoutEvenkiKeys: any = (layoutEvenkiEvn as any).default;
  layoutOduduwaKeys: any = (layoutOduduwaOdu as any).default;
  layoutTocharianKeys: any = (layoutTocharianToch as any).default;
  layoutSaurashtraKeys: any = (layoutSaurashtraSaur as any).default;
  layoutHmongKeys: any = (layoutHmongHmn as any).default;
  layoutHmongNypKeys: any = (layoutHmongHmnp as any).default;
  layoutKaithiKeys: any = (layoutKaithiKthi as any).default;
  layoutInupiatunKeys: any = (layoutInupiatunEsk as any).default;
  layoutInpiaqKeys: any = (layoutInpiaqEsi as any).default;
  layoutUummarmiutunKeys: any = (layoutUummarmiutunIpk as any).default;
  layoutBrahmiKeys: any = (layoutBrahmiSa as any).default;
  layoutMagarKeys: any = (layoutMagarMaga as any).default;
  layoutWanchoKeys: any = (layoutWanchoWcho as any).default;
  layoutPunjabiKeys: any = (layoutPunjabiPa as any).default;
  layoutPalauanKeys: any = (layoutPalauanPau as any).default;
  layoutGujaratiKeys: any = (layoutGujaratiGu as any).default;
  layoutOdiaKeys: any = (layoutOdiaOr as any).default;
  layoutBengaliKeys: any = (layoutBengaliBn as any).default;
  layoutAssameseKeys: any = (layoutAssameseAs as any).default;
  layoutHajongKeys: any = (layoutHajongHaj as any).default;
  layoutBodoKeys: any = (layoutBodoBrx as any).default;
  layoutBodoLaKeys: any = (layoutBodoBrxLa as any).default;
  layoutKamarupiKeys: any = (layoutKamarupiKama as any).default;
  layoutKhimhunKeys: any = (layoutKhimhunTang as any).default;
  layoutTirhutaKeys: any = (layoutTirhutaTirh as any).default;
  layoutTakriKeys: any = (layoutTakriTakr as any).default;
  layoutHmongPKeys: any = (layoutHmongHmng as any).default;
  layoutKhojkiKeys: any = (layoutKhojkiKhoj as any).default;
  layoutKhudawadiKeys: any = (layoutKhudawadiKhud as any).default;
  layoutSylhetiKeys: any = (layoutSylotiSylo as any).default;
  layoutManipuriKeys: any = (layoutManipuriMni as any).default;
  layoutTibetianKeys: any = (layoutTibetianTibt as any).default;
  layoutLadakhiKeys: any = (layoutLadakhiLbj as any).default;
  layoutMultaniKeys: any = (layoutMultaniMult as any).default;
  layoutMahajaniKeys: any = (layoutMahajaniMaha as any).default;
  layoutThaanaKeys: any = (layoutThaanaThaa as any).default;
  layoutDhivehiKeys: any = (layoutDhivehiDv as any).default;
  layoutDivesAkuruKeys: any = (layoutDivesAkuruDiak as any).default;
  layoutGeezKeys: any = (layoutGeezGeez as any).default;
  layoutLepchaKeys: any = (layoutLepchaLepc as any).default;
  layoutKhmerKeys: any = (layoutKhmerKm as any).default;
  layoutSinhalaKeys: any = (layoutSinhalaSi as any).default;
  layoutThaiKeys: any = (layoutThaiThai as any).default;
  layoutShanKeys: any = (layoutShanShan as any).default;
  layoutLaoKeys: any = (layoutLaoLao as any).default;
  layoutMyanmarKeys: any = (layoutMyanmarMy as any).default;
  layoutBalineseKeys: any = (layoutBalineseBali as any).default;
  layoutJavaneseKeys: any = (layoutJavaneseJv as any).default;
  layoutBugineseKeys: any = (layoutBugineseBug as any).default;
  layoutKulitanKeys: any = (layoutKulitanKuli as any).default;
  layoutMakasarKeys: any = (layoutMakasarMaka as any).default;
  layoutBatakKeys: any = (layoutBatakBatk as any).default;
  layoutBaybayinKeys: any = (layoutBaybayinTglg as any).default;
  layoutHanunuoKeys: any = (layoutHanunuoHano as any).default;
  layoutTagbanwaKeys: any = (layoutTagbanwaTagb as any).default;
  layoutChakmaKeys: any = (layoutChakmaCakm as any).default;
  layoutChamKeys: any = (layoutChamCham as any).default;
  layoutWolofalKeys: any = (layoutWolofalWoal as any).default;
  layoutFulaKeys: any = (layoutFulaFf as any).default;
  layoutMongolKeys: any = (layoutMongolianMnla as any).default;
  layoutTokPonaKeys: any = (layoutTokPonaTokp as any).default;
  layoutBikolKeys: any = (layoutBikolBcl as any).default;
  layoutBuhidKeys: any = (layoutBuhidBuhd as any).default;
  layoutTokPisinKeys: any = (layoutTokPisinTpi as any).default;
  layoutKhasiKeys: any = (layoutKhasiKha as any).default;
  layoutTanchangyaKeys: any = (layoutTanchangyaTach as any).default;
  layoutBhaiksukiKeys: any = (layoutBhaiksukiBhai as any).default;
  layoutTaleKeys: any = (layoutTaiLeTale as any).default;
  layoutTaluKeys: any = (layoutTaiLueTalu as any).default;
  layoutLanaKeys: any = (layoutTaithamLana as any).default;
  layoutRejangKeys: any = (layoutRejangRjng as any).default;
  layoutRencongKeys: any = (layoutRencongRenc as any).default;
  layoutAhomKeys: any = (layoutAhomAhom as any).default;
  layoutZanabazarKeys: any = (layoutZanabazarZanb as any).default;
  layoutSoraSompengKeys: any = (layoutSorasompengSora as any).default;
  layoutBassaVahKeys: any = (layoutBassaVah as any).default;
  layoutZaghawaKeys: any = (layoutZaghawaZag as any).default;
  layoutBaburiKeys: any = (layoutBaburiKhat as any).default;
  layoutMandombeKeys: any = (layoutMandombeMamb as any).default;
  layoutSundaneseKeys: any = (layoutSundaneseSund as any).default;
  layoutOrkhonKeys: any = (layoutOrkhonOrkh as any).default;
  layoutMwangwegoKeys: any = (layoutMwangwegoMwan as any).default;
  layoutIndonesiaKeys: any = (layoutIndonesianId as any).default;
  layoutBamunKeys: any = (layoutBamunBamu as any).default;
  layoutGalicianKeys: any = (layoutGalicianGl as any).default;
  layoutIlonggoKeys: any = (layoutIlonggoHil as any).default;
  layoutGreenlandicKeys: any = (layoutGreenlandicKl as any).default;
  layoutIbanKeys: any = (layoutIbanIba as any).default;
  layoutDitemaKeys: any = (layoutDitemaDite as any).default;
  layoutWoleaiKeys: any = (layoutWoleaiWole as any).default;
  layoutCreeKeys: any = (layoutCreeCree as any).default;
  layoutCrewKeys: any = (layoutCrewCrew as any).default;
  layoutVaiKeys: any = (layoutVaiVaii as any).default;
  layoutInuktitutIkuKeys: any = (layoutInuktitutIku as any).default;
  layoutCherokeeKeys: any = (layoutCherokeeCher as any).default;
  layoutKayahLiKeys: any = (layoutKayahLi as any).default;
  layoutLimbuKeys: any = (layoutLimbuLimb as any).default;
  layoutKawiKeys: any = (layoutKawiKawi as any).default;
  layoutAvestanKeys: any = (layoutAvestanAvst as any).default;
  layoutWolofKeys: any = (layoutWolofWolf as any).default;
  layoutVenetianKeys: any = (layoutVenetianVec as any).default;
  layoutKharosthiKeys: any = (layoutKharosthiKhar as any).default;
  layoutLandaKeys: any = (layoutLandaLand as any).default;
  layoutPhagsPaKeys: any = (layoutPhagsPa as any).default;
  layoutDogriKeys: any = (layoutDogriDogr as any).default;
  layoutTikamuliKeys: any = (layoutTikamuliTika as any).default;
  layoutAbkhazKeys: any = (layoutAbkhazAb as any).default;
  layoutBrailleKeys: any = (layoutBrailleIUB as any).default;
  layoutMoonKeys: any = (layoutMoonMoon as any).default;
  layoutLatinKeys: any = (layoutLatinLa as any).default;
  layoutPolishKeys: any = (layoutPolishPl as any).default;
  layoutKinyarwandaKeys: any = (layoutKinyarwandaRw as any).default;
  layoutLingalaKeys: any = (layoutLingalaLn as any).default;
  layoutShonaKeys: any = (layoutShonaSn as any).default;
  layoutTurkishKeys: any = (layoutTurkishTr as any).default;
  layoutUyghurKeys: any = (layoutUyghurUyy as any).default;
  layoutUyghurArKeys: any = (layoutUyghurUg as any).default;
  layoutUyghurCyKeys: any = (layoutUyghurUsy as any).default;
  layoutCaucasianAlbanianKeys: any = (layoutCaucasianAlbanianUdi as any).default;
  layoutOsageKeys: any = (layoutOsageOsge as any).default;
  layoutAfakaKeys: any = (layoutAfakaNjdu as any).default;
  layoutTurkmenLaKeys: any = (layoutTurkmenTk as any).default;
  layoutTurkmenCyKeys: any = (layoutTurkmenTuk as any).default;
  layoutGreekKeys: any = (layoutGreekEl as any).default;
  layoutCopticKeys: any = (layoutCopticCopt as any).default;
  layoutTatarKeys: any = (layoutTatarTt as any).default;
  layoutBulgarianKeys: any = (layoutBulgarianBg as any).default;
  layoutBashkirKeys: any = (layoutBashkirBak as any).default;
  layoutCypriotKeys: any = (layoutCypriotCprt as any).default;
  layoutLinearBKeys: any = (layoutLinearBLinb as any).default;
  layoutBerberKeys: any = (layoutBerberTfng as any).default;
  layoutTamazightKeys: any = (layoutBerberBer as any).default;
  layoutOsmaniaKeys: any = (layoutOsmaniaOsma as any).default;
  layoutAdlamKeys: any = (layoutAdlamAdlm as any).default;
  layoutOlChikiKeys: any = (layoutOlChiki as any).default;
  layoutMruKeys: any = (layoutMruMroo as any).default;
  layoutDhankariKeys: any = (layoutDhankariDhan as any).default;
  layoutGeorgiaKeys: any = (layoutGeorgianKa as any).default;
  layoutAsomtavruliKeys: any = (layoutAsomtavruliAsom as any).default;
  layoutNushkuriKeys: any = (layoutNushkuriNusk as any).default;
  layoutArmenianKeys: any = (layoutArmenianHy as any).default;
  layoutKazakhCyKeys: any = (layoutKazakhKk as any).default;
  layoutKazakhLaKeys: any = (layoutKazakhKaz as any).default;
  layoutTajikLaKeys: any = (layoutTajikTgk as any).default;
  layoutTajikCyKeys: any = (layoutTajikTg as any).default;
  layoutUzbekLaKeys: any = (layoutUzbekUz as any).default;
  layoutUzbekCyKeys: any = (layoutUzbekUzb as any).default;
  layoutSerbianKeys: any = (layoutSerbianSr as any).default;
  layoutFijianKeys: any = (layoutFijianFj as any).default;
  layoutAragoneseKeys: any = (layoutAragoneseAn as any).default;
  layoutFruilianKeys: any = (layoutFruilianFur as any).default;
  layoutNavajoKeys: any = (layoutNavajoNv as any).default;
  layoutKirundiKeys: any = (layoutkirundiRn as any).default;
  layoutKurdishKeys: any = (layoutKurdishCkb as any).default;
  layoutKurmanjiKeys: any = (layoutKurdishKu as any).default;
  layoutAzerbaijaniLaKeys: any = (layoutAzerbaijaniAz as any).default;
  layoutAzerbaijaniCyKeys: any = (layoutAzerbaijaniAze as any).default;
  layoutMacedonianKeys: any = (layoutMacedonianMk as any).default;
  layoutKyrgyzCyKeys: any = (layoutKyrgyzKy as any).default;
  layoutMongolianCyKeys: any = (layoutMongolianMn as any).default;
  layoutMongolianKeys: any = (layoutMongolianMon as any).default;
  layoutLadinoKeys: any = (layoutJudeoEspanyolLad as any).default;
  layoutLadinoLaKeys: any = (layoutJudeoEspanyolLadLa as any).default;
  layoutYakutKeys: any = (layoutYakutSah as any).default;
  layoutSwahiliKeys: any = (layoutSwahiliSw as any).default;
  layoutRussianKeys: any = (layoutRussianRu as any).default;
  layoutSlovenianKeys: any = (layoutSlovenianSl as any).default;
  layoutBelarussianKeys: any = (layoutBelarussianBe as any).default;
  layoutUkrainianKeys: any = (layoutUkranianUk as any).default;
  layoutCroatianKeys: any = (layoutCroatianHr as any).default;
  layoutKashubianKeys: any = (layoutKashubianCsb as any).default;
  layoutSamiKeys: any = (layoutSamiSe as any).default;
  layoutGoykandiKeys: any = (layoutGoykandiGoyk as any).default;
  layoutEweKeys: any = (layoutEweEe as any).default;
  layoutCeltiberianKeys: any = (layoutCeltiberianXce as any).default;
  layoutIlocanoKeys: any = (layoutIlocanoIlo as any).default;
  layoutKomiKeys: any = (layoutKomiKomi as any).default;
  layoutPashtoKeys: any = (layoutPashtoPs as any).default;
  layoutDeutschKeys: any = (layoutDeutschDe as any).default;
  layoutFrakturKeys: any = (layoutFrakturLatf as any).default;
  layoutEstonianKeys: any = (layoutEstonianEt as any).default;
  layoutSpanishKeys: any = (layoutSpanishEs as any).default;
  layoutSpanishMXKeys: any = (layoutSpanishEsMX as any).default;
  layoutIcelandicKeys: any = (layoutIcelandicIs as any).default;
  layoutEdoKeys: any = (layoutEdoBin as any).default;
  layoutKrioKeys: any = (layoutKrioKri as any).default;
  layoutPortugueseKeys: any = (layoutPortuguesePt as any).default;
  layoutPortugueseBRKeys: any = (layoutPortuguesePtBR as any).default;
  layoutSwedishKeys: any = (layoutSwedishSv as any).default;
  layoutSesotholeboaKeys: any = (layoutSesotholeboaSt as any).default;
  layoutSepediKeys: any = (layoutSepediNso as any).default;
  layoutSetswanaKeys: any = (layoutSetswanaTn as any).default;
  layoutScotsGaelicKeys: any = (layoutScotsGaelicGd as any).default;
  layoutGaelicKeys: any = (layoutGaelicGael as any).default;
  layoutGalloKeys: any = (layoutGalloGall as any).default;
  layoutSicilianKeys: any = (layoutSilicianScu as any).default;
  layoutAsturianKeys: any = (layoutAsturianAst as any).default;
  layoutBosnianLaKeys: any = (layoutBosnianBsLa as any).default;
  layoutLimburgishKeys: any = (layoutLimburgishLi as any).default;
  layoutFaroeseKeys: any = (layoutFaroeseFo as any).default;
  layoutFinnishKeys: any = (layoutFinnishFi as any).default;
  layoutFrenchKeys: any = (layoutFrenchFr as any).default;
  layoutOccitanKeys: any = (layoutOccitanOc as any).default;
  layoutAfrikaansKeys: any = (layoutAfrikaansAf as any).default;
  layoutCatalanKeys: any = (layoutCatalanCa as any).default;
  layoutFrenchCAKeys: any = (layoutFrenchFrCa as any).default;
  layoutBasqueKeys: any = (layoutBasqueEu as any).default;
  layoutSwissGermanKeys: any = (layoutSwissGermanGsw as any).default;
  layoutSorbianKeys: any = (layoutSorbianWen as any).default;
  layoutEnglishUSKeys: any = (layoutEnglishEnUS as any).default;
  layoutEnglishUKKeys: any = (layoutEnglishEnUK as any).default;
  layoutEnglishINKeys: any = (layoutEnglishEnIN as any).default;
  layoutEnglishIntlKeys: any = (layoutEnglishEnIntl as any).default;
  layoutEurKeyKeys: any = (layoutEurKeyEurKey as any).default;
  layoutAngliscKeys: any = (layoutAngliscAng as any).default;
  layoutDutchKeys: any = (layoutDutchNl as any).default;
  layoutItalianKeys: any = (layoutItalianIt as any).default;
  layoutCzechKeys: any = (layoutCzechCs as any).default;
  layoutLithuanianKeys: any = (layoutLithuanianLt as any).default;
  layoutMalteseKeys: any = (layoutMalteseMt as any).default;
  layoutGothicKeys: any = (layoutGothicGoth as any).default;
  layoutKashmiriKeys: any = (layoutKashmiriKs as any).default;
  layoutAlbanianKeys: any = (layoutAlbanianSq as any).default;
  layoutCarianKeys: any = (layoutCarianCari as any).default;
  layoutLydianKeys: any = (layoutLydianLydi as any).default;
  layoutLycianKeys: any = (layoutLycianLyci as any).default;
  layoutLeponticKeys: any = (layoutLeponticLepo as any).default;
  layoutPhrygianKeys: any = (layoutPhrygianPhyg as any).default;
  layoutSabellicKeys: any = (layoutSabellicSabe as any).default;
  layoutElbasanKeys: any = (layoutElbasanElba as any).default;
  layoutVithkuqiKeys: any = (layoutVithkuqiVith as any).default;
  layoutRunicKeys: any = (layoutRunicRunr as any).default;
  layoutDalecarlianKeys: any = (layoutDaleCarlianDale as any).default;
  layoutOiratKeys: any = (layoutOiratOira as any).default;
  layoutPunicKeys: any = (layoutPunicXpu as any).default;
  layoutPhonecianKeys: any = (layoutPhonecianPhn as any).default;
  layoutEtruscanKeys: any = (layoutEtruscanEtt as any).default;
  layoutPiceneKeys: any = (layoutPicenePice as any).default;
  layoutRovasirasKeys: any = (layoutRovasirasHung as any).default;
  layoutJapaneseKeys: any = (layoutKanjiJa as any).default;
  layoutAvoiuliKeys: any = (layoutAvoiuliAvo as any).default;
  layoutGlagoliticKeys: any = (layoutGlagoliticGlag as any).default;
  layoutTangutKeys: any = (layoutTangutTxg as any).default;
  layoutOracleBoneKeys: any = (layoutOracleBoneJiag as any).default;
  layoutItalicKeys: any = (layoutItalicItal as any ).default;
  layoutOghamKeys: any = (layoutOghamOgam as any).default;
  layoutAdinkraKeys: any = (layoutAdinkraAdin as any).default;
  layoutKhomKeys: any = (layoutKhomKhom as any).default;
  layoutMikmaqKeys: any = (layoutMikmaqMikq as any).default;
  layoutNorwegianKeys: any = (layoutNorwegianNb as any).default;
  layoutDanishKeys: any = (layoutDanishDa as any).default;
  layoutCanadianAboriginalKeys: any = (layoutCanadianAboriginalCans as any).default;
  layoutLuoKeys: any = (layoutLuoLuo as any).default;
  layoutCanaaniteKeys: any = (layoutCanaaniteCana as any).default;
  layoutSinaiticKeys: any = (layoutSinaiticSina as any).default;
  layoutAztecGlyphKeys: any = (layoutAztecAztc as any).default;
  layoutTokbirimKeys: any = (layoutTokbirimChik as any).default;
  layoutKatakanaKeys: any = (layoutKatakanaKata as any).default;
  layoutHiraganaKeys: any = (layoutHiraganaHira as any).default;
  layoutBopomofoKeys: any = (layoutBopomofoBopo as any).default;
  layoutMossangKeys: any = (layoutMossangMoss as any).default;
  layoutKangxiKeys: any = (layoutKangxiKan as any).default;
  layoutMikmaqMicKeys: any = (layoutMikmaqMic as any).default;
  layoutTartessianKeys: any = (layoutTartessianTxr as any).default;
  layoutIberianKeys: any = (layoutIberianIbe as any).default;
  layoutEgyptianKeys: any = (layoutEgyptianKmt as any).default;
  layoutZihuiKeys: any = (layoutZihuiZih as any).default;
  layoutKoreanKeys: any = (layoutKoreanKo as any).default;
  layoutMirandeseKeys: any = (layoutMirandeseMwl as any).default;
  layoutMadhuraKeys: any = (layoutMadureseMad as any).default;
  layoutHebrewKeys: any = (layoutHebrewHe as any).default;
  layoutManchuKeys: any = (layoutManchuMnc as any).default;
  layoutYiddishKeys: any = (layoutYiddishYi as any).default;
  layoutNyanjaKeys: any = (layoutNyanjaNy as any).default;
  layoutMandinkaKeys: any = (layoutMandikaMnk as any).default;
  layoutMandinkaArKeys: any = (layoutMandikaMnkAr as any).default;
  layoutTotoKeys: any = (layoutTotoToto as any).default;
  layoutSomaliKeys: any = (layoutSomaliSo as any).default;
  layoutMalayKeys: any = (layoutMalayMs as any).default;
  layoutJawiKeys: any = (layoutJawiJawi as any).default;
  layoutWarayKeys: any = (layoutWarayWar as any).default;
  layoutCornishKeys: any = (layoutCornishKw as any).default;
  layoutBislamaKeys: any = (layoutBislamaBis as any).default;
  layoutTongaKeys: any = (layoutTongaTo as any).default;
  layoutPangasinanKeys: any = (layoutPangasinanPag as any).default;
  layoutBretonKeys: any = (layoutBretonBr as any).default;
  layoutAymaraKeys: any = (layoutAymaraAy as any).default;
  layoutManxKeys: any = (layoutManxGv as any).default;
  layoutMendeKeys: any = (layoutMendeMend as any).default;
  layoutAramaicKeys: any = (layoutAramaicArc as any).default;
  layoutArchaicGreekKeys: any = (layoutArchaicGreekIon as any).default;
  layoutGebaKeys: any = (layoutGebaGeba as any).default;
  layoutSogdianKeys: any = (layoutSogdianSog as any).default;
  layoutKultobeKeys: any = (layoutKultobeKult as any).default;
  layoutSamaritanKeys: any = (layoutSamaritanSamr as any).default;
  layoutKaidaKeys: any = (layoutKaidaKaid as any).default;
  layoutQafarafKeys: any = (layoutQafarafAa as any).default;
  layoutSafaiticKeys: any = (layoutSafaiticSafa as any).default;
  layoutFarsiKeys: any = (layoutFarsiFa as any).default;
  layoutArabicKeys: any = (layoutArabicAr as any).default;
  layoutOldArabicKeys: any = (layoutArabicArOld as any).default;
  layoutMarchenKeys: any = (layoutMarchenMarc as any).default;
  layoutAjamiKeys: any = (layoutAjamiAjam as any).default;
  layoutRapaNuiKeys: any = (layoutRapaNuiRap as any).default;
  layoutBurushaskiKeys: any = (layoutBurushaskiBsk as any).default;
  layoutNagameseKeys: any = (layoutNagameseNag as any).default;
  layoutSaxonyKeys: any = (layoutSaxonyNds as any).default;
  layoutWelshKeys: any = (layoutWelshCy as any).default;
  layoutSlavonicKeys: any = (layoutSlavonicCyrs as any).default;
  layoutPahlaviKeys: any = (layoutPahlaviPal as any).default;
  layoutParthianKeys: any = (layoutParthianXpr as any).default;
  layoutMandaicKeys: any = (layoutMandaicMand as any).default;
  layoutChorasmianKeys: any = (layoutChorasmianChor as any).default;
  layoutSabaeanKeys: any = (layoutSabaeanXsa as any).default;
  layoutMaoriKeys: any = (layoutMaoriMi as any).default;
  layoutQuechuaKeys: any = (layoutQuechuaQu as any).default;
  layoutCaddoanKeys: any = (layoutCaddoCdd as any).default;
  layoutRohingyaKeys: any = (layoutRohingyaRhg as any).default;
  layoutTahitianKeys: any = (layoutTahitianTy as any).default;
  layoutLatviaKeys: any = (layoutLativaLv as any).default;
  layoutLisuKeys: any = (layoutLisuLis as any).default;
  layoutIrishKeys: any = (layoutIrishGa as any).default;
  layoutLadinKeys: any = (layoutLadinLld as any).default;
  layoutIgboKeys: any = (layoutIgboIg as any).default;
  layoutSindhiSdKeys: any = (layoutSindhiSd as any).default;
  layoutBalochiKeys: any = (layoutBalochiBal as any).default;
  layoutHausaKeys: any = (layoutHausaHa as any).default;
  layoutGuaraniKeys: any = (layoutGuaraniGn as any).default;
  layoutIPAKeys: any = (layoutIPAIpa as any).default;
  layoutInuktitutKeys: any = (layoutInuktitutIu as any).default;
  layoutHungarianKeys: any = (layoutHungarianHu as any).default;
  layoutHawaiianKeys: any = (layoutHawaiiHaw as any).default;
  layoutSyriacKeys: any = (layoutSyriacSyrc as any).default;
  layoutSuriyaniKeys: any = (layoutSuriyaniGars as any).default;
  layoutPalmyreneKeys: any = (layoutPalmyrenePalm as any).default;
  layoutElymaicKeys: any = (layoutElymaicElym as any).default;
  layoutAnatolianGlyphKeys: any = (layoutLuwianLuw as any).default;
  layoutHatranKeys: any = (layoutHatranHatr as any).default;
  layoutHanifiKeys: any = (layoutRohingyaRohg as any).default;
  layoutSlovakKeys: any = (layoutSlovakSk as any).default;
  layoutBelgiqueKeys: any = (layoutBelgianBe as any).default;
  layoutRomanianKeys: any = (layoutRomanianRo as any).default;
  layoutDzongkhaKeys: any = (layoutDzongkhaDz as any).default;
  layoutBosnianKeys: any = (layoutBosnianBs as any).default;
  layoutMalagasyKeys: any = (layoutMalagasyMg as any).default;
  layoutFongbeKeys: any = (layoutFongbeFon as any).default;
  layoutSiSwatiKeys: any = (layoutSwatiSs as any).default;
  layoutEsperantoKeys: any = (layoutEsperantoEo as any).default;
  layoutLivonianKeys: any = (layoutLivonianLiv as any).default;
  layoutRallyKeys: any = (layoutRallyRally as any).default;
  layoutBamanankanKeys: any = (layoutBamanankanBm as any).default;
  layoutLuxembourgishKeys: any = (layoutLuxembourgishLb as any).default;
  layoutUrduKeys: any = (layoutUrduUr as any).default;
  layoutChisoiKeys: any = (layoutChisoiChis as any).default;
  layoutNagMundariKeys: any = (layoutNagMundariNagm as any).default;
  layoutVietnameseKeys: any = (layoutVietnameseVi as any).default;
  layoutYorubaBjKeys: any = (layoutYorubaBjYo as any).default;
  layoutYorubaNgKeys: any = (layoutYorubaNgYo as any).default;
  layoutWolofLaKeys: any = (layoutWolofWo as any).default;
  layoutKhorpaKeys: any = (layoutKhorpaKhor as any).default;
  layoutMansiKeys: any = (layoutMansiMns as any).default;
  layoutKhantyKeys: any = (layoutKhantyKca as any).default;
  layoutSaraikiKeys: any = (layoutSaraikiSkr as any).default;
  layoutPauCinHauKeys: any = (layoutPaucinhauPauc as any).default;
  layoutManichaeanKeys: any = (layoutManichaeanMani as any).default;
  layoutNabataeanKeys: any = (layoutNabataeanNbat as any).default;
  layoutPsalterKeys: any = (layoutPsalterPsal as any).default;
  layoutZoulaiKeys: any = (layoutZoulaiZou as any).default;
  layoutEskayanKeys: any = (layoutEskayanEsy as any).default;
  layoutNushuKeys: any = (layoutNushuNshu as any).default;
  layoutUgariticKeys: any = (layoutUgariticUgar as any).default;
  layoutTainoKeys: any = (layoutTainoTnq as any).default;
  layoutMayaGlyphKeys: any = (layoutMayanMaya as any).default;
  layoutYiKeys: any = (layoutNosuYiii as any).default;
  layoutKochiKeys: any = (layoutKochiKoch as any).default;
  layoutChokweKeys: any = (layoutChokweCjk as any).default;
  layoutMaltoKeys: any = (layoutMaltoMalt as any).default;
  layoutKurukhKeys: any = (layoutKurukhKru as any).default;
  layoutShompenKeys: any = (layoutShompenSii as any).default;
  layoutMeroiticGlyphKeys: any = (layoutMeroiticGlyph as any).default;
  layoutMeroiticKeys: any = (layoutMeroiticMero as any).default;
  layoutCuneiformKeys: any = (layoutSumerianSux as any).default;
  layoutBlackfootKeys: any = (layoutBlackfootBla as any).default;
  layoutElamiteKeys: any = (layoutElamiteElam as any).default;
  layoutHittiteKeys: any = (layoutHittiteHit as any).default;
  layoutVatteluttuKeys: any = (layoutVatteluttuVatt as any).default;
  layoutHaitianKeys: any = (layoutHaitianCreoleHt as any).default;
  layoutPersianKeys: any = (layoutPersianXpeo as any).default;
  layoutDemoticKeys: any = (layoutDemoticEgyd as any).default;
  layoutNKoKeys: any = (layoutNKoNKoo as any).default;
  layoutUmweroKeys: any = (layoutUmweroUmw as any).default;
  layoutSundaKeys: any = (layoutSundaneseSun as any).default;
  layoutCebuanoKeys: any = (layoutCebuanoCeb as any).default;
  layoutAfricaKeys: any = (layoutAfricaIai as any).default;
  layoutPinyinKeys: any = (layoutPinyinPin as any).default;
  layoutLomaKeys: any = (layoutLomaLoma as any).default;
  layoutNihongoKeys: any = (layoutNihongoJpn as any).default;
  layoutAoKeys: any = (layoutAoNjo as any).default;
  layoutOldUyghurKeys: any = (layoutOldUyghurOugr as any).default;
  layoutNishiKeys: any = (layoutNishiNjz as any).default;
  layoutDinkaKeys: any = (layoutDinkaDin as any).default;
  layoutBugisKeys: any = (layoutBugisBugla as any).default;
  layoutBaliKeys: any = (layoutBaliBan as any).default;
  layoutMizoKeys: any = (layoutMizoLus as any).default;
  layoutMinangkabauKeys: any = (layoutMinangkabauMin as any).default;
  layoutGorontaloKeys: any = (layoutGorontaloGor as any).default;
  layoutYezidiKeys: any = (layoutYezidiYezi as any).default;
  layoutSimplifiedChineseKeys: any = (layoutChineseSimplified as any).default;
  layoutTraditionalChineseKeys: any = (layoutChineseTraditional as any).default;
  layoutTagalogKeys: any = (layoutTagalogTl as any).default;
  layoutAlchemyKeys: any = (layoutAlchemyAlch as any).default;
  layoutJamaicanKeys: any = (layoutJamaicanJam as any).default;
  layoutSeychelleseKeys: any = (layoutSeychelleseCrs as any).default;
  layoutBanjareseKeys: any = (layoutBanjareseBjn as any).default;
  layoutAcehneseKeys: any = (layoutAcehneseAce as any).default;
  layoutSoyomboKeys: any = (layoutSoyomboSoyo as any).default;
  layoutMauritianKeys: any = (layoutMauritianMfe as any).default;
  layoutMasaramGondiKeys: any = (layoutMasaramGondiGonm as any).default;
  layoutGunjalaGondiKeys: any = (layoutGunjalaGondiGong as any).default;
  layoutKapampanganKeys: any = (layoutKapampanganPam as any).default;
  layoutMiaoKeys: any = (layoutPollardMiao as any).default;
  layoutTaniKeys: any = (layoutTaniTani as any).default;
  layoutKhitanSKeys: any = (layoutKhitanKits as any).default;
  layoutKhitanLKeys: any = (layoutKhitanKitl as any).default;
  layoutNubianKeys: any = (layoutNubianOnw as any).default;
  layoutAimaKeys: any = (layoutAimaAima as any).default;
  layoutLinearAKeys: any = (layoutLinearALinea as any).default;
  layoutKpelleKeys: any = (layoutKpelleKpe as any).default;
  layoutTigrinyaKeys: any = (layoutTigrinyaTi as any).default;
  layoutTigreKeys: any = (layoutTigreTig as any).default;
  layoutAmharicKeys: any = (layoutAmharicAm as any).default;
  layoutSyriacClassicalKeys: any = (layoutSyriacClassicalEstr as any).default;
  layoutSyriacWesternKeys: any = (layoutSyriacWesternSert as any).default;
  layoutSyriacEasternKeys: any = (layoutSyriacEasternMadn as any).default;
  layoutKhazarianKeys: any = (layoutKhazarianKhaz as any).default;
  layoutSignUSKeys: any = (layoutSignUS as any).default;
  layoutIndusScriptKeys: any = (layoutIndusIndus as any).default;
  layoutJentichaKeys: any = (layoutSunuwarSuz as any).default;
  layoutBANZSLKeys: any = (layoutBANZSL as any).default;
  layoutNaskapiKeys: any = (layoutNaskapiNask as any).default;
  layoutCarrierKeys: any = (layoutCarrierCarr as any).default;
  layoutOjibweKeys: any = (layoutOjibweOji as any).default;
  layoutBearyKeys: any = (layoutBearyBya as any).default;
  layoutDesiSignKeys: any = (layoutDesiSign as any).default;
  layoutNsibidiKeys: any = (layoutNsibidiNsi as any).default;
  layoutSignWritingKeys: any = (layoutSignWritingSgnw as any).default;
  layoutBharatiBrailleKeys: any = (layoutBharatiBrailleBharati as any).default;
  layoutFlagsKeys: any = (layoutFlagsICS as any).default;
  layoutSemaphoreKeys: any = (layoutSemaphoreFlag as any).default;
  layoutMorseKeys: any = (layoutMorseCode as any).default;

  supportedLanguageColumn1 : any = [];
  supportedLanguageColumn2 : any = [];
  supportedLanguageColumn3 : any = [];
  supportedLanguageColumn4 : any = [];
  allSupportedLanguages : any = [];

  currencySymbol: string = "₹";
  periodSeparator: string = ".";
  commaSeparator: string = ",";

  calculatorLayout: any = [
    {"row":[
      {"value":"x₂","action":"char","type":"base2","visible":"show"},{"value":"x₈","action":"char","type":"base8","visible":"show"},{"value":"x₁₀","action":"char","type":"base10","visible":"show"},{"value":"x₁₂","action":"char","type":"base12","visible":"show"},{"value":"x₁₆","action":"char","type":"base16","visible":"show"},{"value":"x₂₀","action":"char","type":"base20","visible":"show"},{"value":"x₆₀","action":"char","type":"base60","visible":"show"},{"value":"(","action":"char"},{"value":")","action":"char"},{"value":"‰","action":"char","type":"partsPerMillion"},{"value":"%","action":"char","type":"modulusOp"},{"value":"🧠","action":"char","type":"useMemory"},{"value":"⎌","action":"char","type":"undoAction"},{"value":"⭕","action":"char","type":"restart"}
    ]},
    {"row": [
      {"value":"°","action":"char","type":"degrees","visible":"show"},{"value":"rad","action":"char","type":"radians","visible":"show"},{"value":"′","action":"char","type":"arcminute"},{"value":"″","action":"char","type":"arcsecond"},{"value":"𝑓₁","action":"char","type":"formula1"},{"value":"𝑓₂","action":"char","type":"formula2"},{"value":"𝑓₃","action":"char","type":"formula3"},{"value":"𝑓₄","action":"char","type":"formula4"},{"value":"A","action":"char","type":"hexadecimal","visible":"hide"},{"value":"B","action":"char","type":"hexadecimal","visible":"hide"},{"value":"C","action":"char","type":"hexadecimal","visible":"hide"},{"value":"D","action":"char","type":"hexadecimal","visible":"hide"},{"value":"E","action":"char","type":"hexadecimal","visible":"hide"},{"value":"F","action":"char","type":"hexadecimal","visible":"hide"}
    ]},
    {"row":[
      {"value":"π","action":"char"},{"value":"sin","action":"char","type":"sineFunc"},{"value":"sin⁻ⁱ","action":"char","type":"sineInverseFunc","visible":"show"},{"value":"ln","action":"char","type":"naturalLogarithm"},{"value":"eˣ","action":"char","type":"naturalExponent"},{"value":"≤","action":"char","type":"lessThanEquals","visible":"hide"},{"value":"<","action":"char","type":"lessThanSymbol","visible":"hide"},{"value":"&","action":"char","type":"logicalAnd","visible":"hide"},{"value":"1","type":"num1","action":"char"},{"value":"2","type":"num2","action":"char"},{"value":"3","type":"num3","action":"char"},{"value":"True","type":"booleanTrue","visible":"hide"},{"value":"/","action":"char","type":"divisionOp"},{"value":"÷","action":"char","type":"divisionOp"}
    ]},
    {"row":[
      {"value":"e","action":"char","type":"exponentNatural"},{"value":"cos","action":"char","type":"cosineFunc"},{"value":"cos⁻ⁱ","action":"char","type":"cosineInverseFunc","visible":"show"},{"value":"log","action":"char","type":"logarithm"},{"value":"10ˣ","action":"char","type":"powerOf10"},{"value":"≥","action":"char","type":"greaterThanEquals","visible":"hide"},{"value":">","action":"char","type":"greaterThanSymbol","visible":"hide"},{"value":"|","action":"char","type":"logicalOr","visible":"hide"},{"value":"4","type":"num4","action":"char"},{"value":"5","type":"num5","action":"char"},{"value":"6","type":"num6","action":"char"},{"value":"*","action":"char","type":"multiplicationOp"},{"value":"·","action":"char","type":"multiplicationOp"},{"value":"×","action":"char","type":"multiplicationOp"}
    ]},
    {"row":[
      {"value":"∞","action":"char","type":"infinity"},{"value":"tan","action":"char","type":"tangentFunc"},{"value":"tan⁻ⁱ","action":"char","type":"tangentInverseFunc","visible":"show"},{"value":"logₓ","type":"logarithmToBase"},{"value":"∛","action":"char","type":"cubeRoot"},{"value":"√","action":"char","type":"squareRoot"},{"value":"!","action":"char","type":"logicalNot","visible":"hide"},{"value":"⊻","action":"char","type":"logicalXor","visible":"hide"},{"value":"7","type":"num7","action":"char"},{"value":"8","type":"num8","action":"char"},{"value":"9","type":"num9","action":"char"},{"value":"False","type":"booleanFalse","visible":"hide"},{"value":"±","action":"char","type":"signChange"},{"value":"-","action":"char","type":"subtractionOp"}
    ]},
    {"row":[
      {"value":this.currencySymbol,"action":"char","type":"currencySymbol"},{"value":"★","action":"char","type":"bookmarkEquation"},{"value":"E","action":"char","type":"exponent10"},{"value":"xʸ","action":"char","type":"powerRaise"},{"value":"ʸ√x","action":"char","type":"nthRoot"},{"value":"x!","action":"char","type":"factorial"},{"value":'٬',"action":"char","type":"arabicDecimalSeparator","visible":"hide"},{"value":'٫',"action":"char","type":"arabicNumberSeparator","visible":"hide"},{"value":this.commaSeparator,"action":"char","type":"numberOrDecimal"},{"value":"0","type":"num0","action":"char"},{"value":this.periodSeparator,"action":"char","type":"decimalOrNumber"},{"value":"=","action":"char","type":"equalsSign"},{"value":"﬩","action":"char","type":"additionOpHebrew","visible":"hide"},{"value":"+","action":"char","type":"additionOp"}
    ]}
  ];

  simpleCalculatorLayout: any = [
    {"row":[
      {"value":"(","action":"char"},{"value":")","action":"char"},{"value":"%","action":"char","type":"modulusOp"},{"value":"🧠","action":"char","type":"useMemory"},{"value":"⎌","action":"char","type":"undoAction"},{"value":"⭕","action":"char","type":"restart"}
    ]},
    {"row":[
      {"value":"1","type":"num1","action":"char"},{"value":"2","type":"num2","action":"char"},{"value":"3","type":"num3","action":"char"},{"value":" ","visible":"hide"},{"value":"/","action":"char","type":"divisionOp"},{"value":"÷","action":"char","type":"divisionOp"}
    ]},
    {"row":[
      {"value":"4","type":"num4","action":"char"},{"value":"5","type":"num5","action":"char"},{"value":"6","type":"num6","action":"char"},{"value":"*","action":"char","type":"multiplicationOp"},{"value":"·","action":"char","type":"multiplicationOp"},{"value":"×","action":"char","type":"multiplicationOp"}
    ]},
    {"row":[
      {"value":"7","type":"num7","action":"char"},{"value":"8","type":"num8","action":"char"},{"value":"9","type":"num9","action":"char"},{"value":" ","visible":"hide"},{"value":"±","action":"char","type":"signChange"},{"value":"-","action":"char","type":"subtractionOp"}
    ]},
    {"row":[
      {"value":this.commaSeparator,"action":"char","type":"numberOrDecimal"},{"value":"0","type":"num0","action":"char"},{"value":this.periodSeparator,"action":"char","type":"decimalOrNumber"},{"value":"=","action":"char","type":"equalsSign"},{"value":" ","action":"char","visible":"hide"},{"value":"+","action":"char","type":"additionOp"}
    ]}
  ];

  anyCalculatorLayout : any = [];

  separatorsForDecimalAndNumeral: any = [' ', "'", ',', '.', '·', '\u2009', '\u202F', '˙', '⠨', '٫' , '٬' , '⎖'];
  alphabetSystem: any = ['la', 'he', 'ion', 'hy', 'mand', 'geez', 'am', 'syrc', 'glag', 'copt', 'goth', 'ka', 'morse'];

  //https://en.wikipedia.org/wiki/Decimal_separator#Usage_worldwide
  commaDecimalSeparatorLocales: any = ['frca', 'lb', 'es', 'sq', 'hy', 'az', 'aze', 'befr', 'fr', 'bsla', 'bs', 'hv', 'pt', 'ptbr', 'cs', 'da', 'et', 'fo', 'fi', 'de', 'ka', 'el', 'kl', 'hu', 'is', 'id', 'it', 'kk', 'kaz', 'ky', 'kir', 'lv', 'lt', 'mn', 'mon', 'mnla', 'nl', 'no', 'gn', 'pl', 'ro', 'ru', 'be', 'sr', 'sk', 'sl', 'sv', 'tr', 'tk', 'tuk', 'uk', 'uz', 'uzb', 'vi', 'af', 'st', 'ss', 'ts', 'tn', 'ven', 'xh', 'nso', 'zu'];
  periodDecimalSeparatorLocales: any = ['en','enus','engb','enintl', 'ne', 'bn', 'km', 'zhcn', 'zhtw', 'am', 'ga', 'he', 'ja', 'ko', 'lb', 'ms', 'thaa', 'dv', 'esmx', 'yo', 'ngyo', 'bjyo', 'si', 'gsw', 'th'];
  arabicDecimalSeparatorLocales: any = ['ar','fa','ur','ps','ks','sd', 'bal', 'ckb', 'rhg', 'bsk'];

  desiCommaPosition: any = ['enin', 'ne', 'bn', 'km', 'zhcn', 'zhtw', 'am', 'ga', 'he', 'ja', 'ko', 'lb', 'ms', 'thaa', 'dv', 'esmx', 'yo', 'ngyo', 'bjyo', 'si', 'gsw', 'th', 'enus', 'engb', 'enintl'];
  desiSpacePosition: any = ['enin', 'ne'];
  thousandsPositionApostropheAndPeriodDecimal : any = [];
  thousandsPositionApostropheAndCommaDecimal : any = [];
  thousandsPositionPeriodAndApostropheDecimal : any = [];
  thousandsPositionPeriodAndCommaDecimal : any = [];
  thousandsPositionCommaAndPeriodDecimal : any = [];
  thousandsPositionSpaceAndPeriodDecimal : any = [];
  thousandsPositionSpaceAndCommaDecimal : any = [];
  thousandsPositionCommaAndMiddleDotDecimal : any = [];
  tenThousandsCommaAndPeriod: any = [];
  tenThousandsSpaceAndPeriod: any = [];
  commaAndPeriodAlternating: any = ['hv'];

  currencySignLocales: any = ["₠","₡","₢","₣","₤","₥","₦","₧","₨","₩","₪","₫","$","£","€","₹","₺","₽","₾","₻","₼","؋","₭","₮","₯","₰","₱","₲","₳","₴","₵","₶","₷","₸","₿","⃀"];

  dirSet: string = "rtl";
  isRTL: Boolean = false;

  rtlLocales : string[] = ['ar', 'he', 'ur', 'fa', 'syrc', 'rhg', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ckb', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'skr', 'pal', 'xpr', 'xsa', 'mnkar', 'jawi', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf', 'woal', 'chrs', 'elym', 'palm', 'hatr', 'ber', 'mani', 'mer', 'psal', 'kult', 'egyd', 'safa', 'nshu', 'txr', 'rohg', 'estr', 'sert', 'madn', 'lad', 'nbat', 'pice', 'gars', 'cprt', 'lepo', 'sabe', 'phyg', 'khaz', 'mero', 'cana', 'sina', 'yezi', 'ug', 'mend', 'linb', 'idu', 'chun', 'kuli', 'txg', 'indus', 'hung', 'dv', 'odu', 'ougr'];
  rtlLocalesLtRNumerals : string [] = ['ar','fa','ur','ps','ks','sd', 'bal', 'ckb', 'rhg', 'bsk'];
  rtlNumerals : string [] = ['odu','adlm','nkoo','naba','avst','khar','xpr','mend','phn','ett'];

  boustrophedonScripts: string[] = ['ett', 'sabe', 'maya', 'txr', 'wole', 'phyg', 'pice', 'asom', 'luw', 'moon', 'sina', 'kmt', 'hung', 'safa', 'xsa', 'egyd', 'avo', 'lepo'];
  topToBottomLR: string[] = ['sog', 'oira', 'mon', 'zhcn', 'zhtw', 'ja', 'ko', 'phag', 'mnc', 'galk', 'shui', 'soyo'];
  topToBottomRL: string[] = ['yii', 'zhcn', 'zhtw', 'ja', 'ko', 'nshu', 'idu', 'mero', 'chun', 'kuli', 'txg', 'ougr'];
  bottomToTopLR: string[] = ['ogam', 'btk', 'hano', 'tagb'];
  bottomToTopRL: string[] = ['ber'];

  layoutRotatedScript: string[] = ['ogam', 'hira', 'kata', 'vaii', 'phag', 'oira', 'mnc', 'mon', 'geez', 'dite', 'iba', 'evn', 'ndju', 'cree', 'inuk', 'galk', 'bla', 'aztc', 'maya'];
  keyDoNotRotate: string[] = ['vaii', 'geez', 'am', 'dite', 'iba', 'ndju'];

  swaraAbugidaType : string [] = ['ahom', 'aima', 'ari', 'bada', 'bali', 'batk', 'bhai', 'bhat', 'bhp', 'bla', 'bn', 'brah', 'bug', 'buhd', 'bya', 'cakm', 'cree', 'dham', 'diak', 'dite', 'dogr', 'dv', 'gong', 'gonm', 'gran', 'gu', 'gup', 'hano', 'hi', 'jv', 'kali', 'kawi', 'khar', 'khoj', 'khor', 'khud', 'km', 'kn', 'koch', 'kru', 'kthi', 'kuli', 'lana', 'leke', 'lepc', 'limb', 'lo', 'loma', 'maga', 'maha', 'mai', 'mani', 'mguj', 'ml', 'mni', 'modi', 'mr', 'mult', 'my', 'nand', 'newa', 'or', 'pa', 'phag', 'renc', 'rjng', 'sa', 'saur', 'scha', 'shan', 'shrd', 'si', 'sidd', 'sn', 'snd', 'sora', 'soyo', 'sund', 'sylo', 'ta', 'tach', 'tagb', 'takr', 'talu', 'tamu', 'tang', 'te', 'tglg', 'th', 'thaa', 'tibt', 'tiga', 'tika', 'tirh', 'toch', 'zanb'];

  fontsSources: string[] = ['dogr', 'zanb', 'sog', 'kult', 'hmnp', 'nshu', 'txg', 'elym', 'gonm', 'gong', 'soyo', 'yezi', 'ur'];

  imageAlternativeScript: string[] = ['adin', 'aima', 'ari', 'avo', 'aztc', 'bada', 'banzsl', 'ber', 'bhat', 'bhp', 'bya', 'cana', 'cans', 'chik', 'chis', 'chrs', 'coorg', 'dale', 'desisign', 'dham', 'dhan', 'diak', 'dite', 'egyd', 'esi', 'esk', 'estr', 'esy', 'flag', 'gael', 'gars', 'geba', 'goyk', 'gup', 'iba', 'ibe', 'ics', 'indus', 'ion', 'ipk', 'jiag', 'kada', 'kaid', 'kama', 'kawi', 'khat', 'khom', 'khor', 'kitl', 'kits', 'koch', 'kpe', 'kru', 'kuli', 'lad', 'land', 'leke', 'loma', 'luo', 'madn', 'maga', 'maha', 'maka', 'mamb', 'maya', 'mguj', 'mikq', 'moon', 'moss', 'mwan', 'nagm', 'nand', 'ndju', 'nsi', 'odu', 'ougr', 'pall', 'ranj', 'renc', 'sabe', 'safa', 'scha', 'sert', 'sina', 'suz', 'tach', 'tamu', 'tang', 'tani', 'tiga', 'tika', 'tnq', 'toch', 'toto', 'txr', 'umw', 'ussign', 'vatt', 'vith', 'wole', 'wolf', 'xce', 'zag', 'zou'];

  keysToRotate: Boolean = false;
  isQwerty: Boolean = false;
  isTransliterate : Boolean = false;
  isShiftKeyPress : Boolean = false;
  isAltGrKeyPress : Boolean = false;
  altGrCapsExists : Boolean = false;
  notToRotateKeys: Boolean = false;
  enableRotateKeyboard: Boolean = false;
  showImageGlyph: Boolean = true;
  bidiLetters: Boolean = false;
  switchScriptDirection: Boolean = false;
  unusedKeys: Boolean = false;
  unicode5AndHigher : Boolean = false;
  highlightKeys: Boolean = true;
  allowSuperScript : Boolean = false;
  floatNotMinimise: Boolean = true;
  mappingKeysToSoft: Boolean = true;

  floatKeyboard: Boolean = false;
  calculatorKeyboard: Boolean = false;
  currentCalculatorType: string = 'simple';
  customKeyboard: Boolean = false;

  whichMappedKey: string = "";
  fontClass: string = "";

  baseIndices: any = [2, 8, 10, 12, 16, 20, 60];
  operators: any = ['+', "-", "*" , "×", "·", "^", "÷" , "/", "&", "|", "⊻", "=", "≠", "≈", "≡", "∼", "∽", "≅", "⇔", "!", "<", ">", "≤", "≥"];
  varX: string = "";
  varY: string = "";
  operatorXY: string = "";
  operationResult: number = 0;
  keepInMemory: string = "";
  historyEquations: any = [];
  bookmarkedEquations: any = [];
  nonUnicodeNumberEquation: any = [];
  nonUnicodeNumberResult: any = [];

  numberMap: any = [];
  mapLocale: any = [];
  nonUnicodeMap: any = [];

  allowedTypingContent: any = ['A','B','C','D','E','F','a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9','(',')']

  defaultCellSize: Number = (this.isMobile && !this.isTablet) ? 18 : ((!this.isMobile && this.isTablet)? 38 : 48 );
  defaultFontSize: Number = (this.isMobile && !this.isTablet) ? 11 : ((!this.isMobile && this.isTablet)? 13 : 15 );

  translateForSnackBar: string[] = [];

  constructor(private dialogRef: MatDialogRef<CustomiseKeyboardsComponent>, private _formBuilder: FormBuilder, private http: HttpClient, private translate: TranslateService, private sessionManager: SessionManagerService, private themeService: ThemeService, searchInputAllScripts: ElementRef, suggestionsForDevice: ElementRef, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: TypeOfLayout, resultField: ElementRef, equationField: ElementRef) { 
    if (this.data.show == 'custom') {
      this.customKeyboard = true;
      this.floatKeyboard = false;
      this.calculatorKeyboard = false;
    } else if (this.data.show == 'float') {
      this.floatKeyboard = true;
      this.calculatorKeyboard = false;
      this.customKeyboard = false;
    } else if (this.data.show == 'calculate') {
      this.calculatorKeyboard = true;
      this.customKeyboard = false;
      this.floatKeyboard = false;
    }
    if (localStorage.getItem('qwertyStyle') != undefined) {
      if (this.sessionManager.getInSessionQwerty() === 'true')
        this.isQwerty = false;
      else if (this.sessionManager.getInSessionQwerty() === 'false')
        this.isQwerty = true;
    }
    if (localStorage.getItem('transliterate') != undefined) {
      if (this.sessionManager.getTransliterate() === 'true')
        this.isTransliterate = true;
      else if (this.sessionManager.getTransliterate() === 'false')
        this.isTransliterate = false;
    }
    this.searchInputAllScripts = searchInputAllScripts;
    this.suggestionsForDevice = suggestionsForDevice;
    if (this.imageAlternativeScript.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
    if (this.keyDoNotRotate.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
      this.notToRotateKeys = true;
    } else {
      this.notToRotateKeys = false;
    }
    this.translateSnackBars();
    this.resultField = resultField;
    this.equationField = equationField;
    this.currentCalculatorType = 'scientific';
    this.anyCalculatorLayout = this.calculatorLayout.slice();
  }

  ngOnInit(): void {
    this.sessionManager.itemQwertyType.subscribe((flagValue)=>{
      this.isQwerty = flagValue;
      // Constraint : Typewriter is false and Transliterate is set then it should be reset
      if (flagValue == false && this.isTransliterate == true && this.sessionManager.itemTransliterate.value == true) {
        this.sessionManager.setTransliterate(false);
        this.isTransliterate = false;
      }
    });
    this.sessionManager.itemTransliterate.subscribe((flagForTrans) => {
      this.isTransliterate = flagForTrans;
    });
    if (this.sessionManager.getUILocale()) {
      this.dirSet = (this.rtlLocales.indexOf(this.sessionManager.getUILocale()) !== -1)? "rtl" : "ltr";
      this.isRTL = (this.rtlLocales.indexOf(this.sessionManager.getUILocale()) !== -1)? true : false;
    }
    this.sessionManager.itemSessionURL.subscribe((keysType) => {
      if (keysType) {
        if (this.layoutRotatedScript.indexOf(keysType) != -1) {
          this.enableRotateKeyboard = true;
        } else {
          this.enableRotateKeyboard = false;
        }
        if (this.boustrophedonScripts.indexOf(keysType) != -1) {
          this.bidiLetters = true;
        } else {
          this.bidiLetters = false;
        }
        if (this.imageAlternativeScript.indexOf(keysType) != -1) {
          this.unicode5AndHigher = true;
          this.showImageGlyph = true;
        } else {
          this.unicode5AndHigher = false;
          this.showImageGlyph = false;
        }
        //this.keysResizePerDeviceWidth();
        //this.populateSuggestionsForLanguage(keysType);

        if (this.fontsSources.indexOf(keysType) > -1){
          this.fontClass = this.fontsSources[this.fontsSources.indexOf(keysType)];
        }
      }
    });
    this.sessionManager.itemShiftKeyPressed.subscribe((flagForShift) => {
      this.isShiftKeyPress = flagForShift;
    });
    this.sessionManager.itemAltGrKeyPressed.subscribe((flagForAltGr) => {
      this.isAltGrKeyPress = flagForAltGr;
    });
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    // Populate UI View based on script
    for(let i = 0; i < this.layoutCurrentKeys.length; i++) {
      if (this.layoutCurrentKeys[i].row) {
        for(let j = 0; j < this.layoutCurrentKeys[i].row.length; j++) {
          // num1
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num1" && this.calculatorLayout[2].row[8].type && this.calculatorLayout[2].row[8].type == "num1") {
            this.calculatorLayout[2].row[8].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[1].row[0].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "1";
            this.mapLocale["1"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[2].row[8]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[1].row[0]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["1"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
          // num2
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num2" && this.calculatorLayout[2].row[9].type && this.calculatorLayout[2].row[9].type == "num2") {
            this.calculatorLayout[2].row[9].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[1].row[1].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "2";
            this.mapLocale["2"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[2].row[9]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[1].row[1]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["2"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
          // num3
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num3" && this.calculatorLayout[2].row[10].type && this.calculatorLayout[2].row[10].type == "num3") {
            this.calculatorLayout[2].row[10].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[1].row[2].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "3";
            this.mapLocale["3"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[2].row[10]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[1].row[2]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["3"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
          // num4
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num4" && this.calculatorLayout[3].row[8].type && this.calculatorLayout[3].row[8].type == "num4") {
            this.calculatorLayout[3].row[8].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[2].row[0].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "4";
            this.mapLocale["4"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[3].row[8]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[2].row[0]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["4"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
          // num5
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num5" && this.calculatorLayout[3].row[9].type && this.calculatorLayout[3].row[9].type == "num5") {
            this.calculatorLayout[3].row[9].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[2].row[1].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "5";
            this.mapLocale["5"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[3].row[9]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[2].row[1]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["5"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
          // num6
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num6" && this.calculatorLayout[3].row[10].type && this.calculatorLayout[3].row[10].type == "num6") {
            this.calculatorLayout[3].row[10].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[2].row[2].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "6";
            this.mapLocale["6"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[3].row[10]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[2].row[2]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["6"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
          // num7
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num7" && this.calculatorLayout[4].row[8].type && this.calculatorLayout[4].row[8].type == "num7") {
            this.calculatorLayout[4].row[8].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[3].row[0].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "7";
            this.mapLocale["7"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[4].row[8]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[3].row[0]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["7"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
          // num8
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num8" && this.calculatorLayout[4].row[9].type && this.calculatorLayout[4].row[9].type == "num8") {
            this.calculatorLayout[4].row[9].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[3].row[1].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "8";
            this.mapLocale["8"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[4].row[9]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[3].row[1]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["8"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
          // num9
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num9" && this.calculatorLayout[4].row[10].type && this.calculatorLayout[4].row[10].type == "num9") {
            this.calculatorLayout[4].row[10].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[3].row[2].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "9";
            this.mapLocale["9"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[4].row[10]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[3].row[2]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["9"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
          // num0
          if (this.layoutCurrentKeys[i].row[j].type && this.layoutCurrentKeys[i].row[j].type == "num0" && this.calculatorLayout[5].row[9].type && this.calculatorLayout[5].row[9].type == "num0") {
            this.calculatorLayout[5].row[9].value = this.layoutCurrentKeys[i].row[j].value;
            this.simpleCalculatorLayout[4].row[1].value = this.layoutCurrentKeys[i].row[j].value;
            this.allowedTypingContent.push(this.layoutCurrentKeys[i].row[j].value);
            this.numberMap["" + this.layoutCurrentKeys[i].row[j].value + ""] = "0";
            this.mapLocale["0"] = this.layoutCurrentKeys[i].row[j].value; 
            if (this.unicode5AndHigher) {
              this.calculatorLayout[5].row[9]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.simpleCalculatorLayout[4].row[1]["src"] = this.layoutCurrentKeys[i].row[j].src;
              this.nonUnicodeMap["0"] = this.layoutCurrentKeys[i].row[j].src;
            }
          }
        }
      }
    }
    this.altGrCapsExists = (this.layoutCurrentKeys)? this.layoutCurrentKeys.some(x => x.hasOwnProperty('altGrCaps')) : false;
  }

  async ngAfterViewInit(): Promise<void> {
    this.sessionManager.isMobileDevice.subscribe((value) => {
      this.isMobile = value;
    });

    this.sessionManager.isTabletDevice.subscribe((value) => {
      this.isTablet = value;
    });

    this.localisedKeyboardLayouts = await this.localisedKeyboardLayoutDB(this.sessionManager.getUILocale());

    this.sessionManager.areKeysToBeHighlighted.subscribe((highlightOrNot)=> {
      this.highlightKeys = highlightOrNot;
    });
    this.sessionManager.currentPressedKey.subscribe((value) => {
      this.whichMappedKey = value;
    });
    this.sessionManager.unusedKeys.subscribe((value) => {
      this.unusedKeys = value;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  done() {
    this.dialogRef.close();
  }

  zenMode() {
    if (this.sessionManager.itemKeyboardOnly.value == false)
      this.sessionManager.setInSessionOnlyKeyboard(true);
    this.done();
  }

  selectKeyboard() {
    if (this.sessionManager.itemKeyboardOnly.value == true)
      this.sessionManager.setInSessionOnlyKeyboard(false);
    this.done();
  }

  switchType(index) {
    if (this.sessionManager.itemKeyboardOnly.value == true)
      this.sessionManager.setInSessionOnlyKeyboard(false);
    this.sessionManager.setScriptTypeTab(index);
    // Close the Helper pop-up after a short period
    setTimeout(() => {
      this.done();
    }, 500);
  }
  
  localisedKeyboardLayoutDB(ISO_Code) {
    if (ISO_Code && ISO_Code != "") {
      return new Promise<any>((resolve, reject)=> {
        this.http.get<{}>(`./../../assets/keyboard-layouts/keysboards-layouts_${ISO_Code}.json`).subscribe(
          layoutDB => {
            if (layoutDB)
              resolve(layoutDB);
            else
              reject({});
          }
        );
      });
    } else if (ISO_Code && ISO_Code == "") {
      return new Promise<any>((resolve, reject)=> {
        this.http.get<{}>(`./../../assets/keyboard-layouts/keysboards-layouts.json`).subscribe(
          layoutDB => {
            if (layoutDB)
              resolve(layoutDB);
            else
              reject({});
          }
        );
      });
    }
  }

  async translateSnackBars() {
    let translateSet = ["OK", "These characters < > ( ) { } $ % = ! ? & * are not allowed in this field"];
    this.translateForSnackBar = await this.loadFromFile(this.sessionManager.getUILocale(), translateSet);
  }

  loadFromFile(ISO_Code, translateSet) {
    return new Promise<any>((resolve, reject)=> {
      this.http.get<{}>(`assets/i18n/${ISO_Code}.json`).subscribe(
        translation => {
          if (translateSet && translation) {
            let translationsForSet = [];
            for (let i = 0; i < translateSet.length; i++) {
              translationsForSet[i] = translation[translateSet[i]];
            }
            resolve(translationsForSet);
          }
          else
            reject("");
        }
      );
    });
  }

  preventInputFieldForAttacks(eventInput) {
    if (eventInput.key.indexOf("*") > -1 || eventInput.key.indexOf("$") > -1 || eventInput.key.indexOf("%") > -1 || eventInput.key.indexOf("=") > -1 || eventInput.key.indexOf("!") > -1 || eventInput.key.indexOf("?") > -1 || eventInput.key.indexOf("&") > -1 || eventInput.key.indexOf("<") > -1 || eventInput.key.indexOf(">") > -1 || eventInput.key.indexOf("(") > -1 || eventInput.key.indexOf(")") > -1 || eventInput.key.indexOf("{") > -1 || eventInput.key.indexOf("}") > -1) {
      this._snackBar.open(this.translateForSnackBar[1], this.translateForSnackBar[0], {
        duration: 3000,
      });
      setTimeout(()=>{
        this.searchInputAllScripts.nativeElement.value = "";
      }, 200);
    }
  }

  restoreBackKeyboard() {
    this.dialogRef.close();
    if (this.data.show == 'float')
      this.sessionManager.softKeyboardState.next(false); 
  }
 
  keyPressed(element, value, action, type, src) {
    this.sessionManager.floatingKeysTyped.next(JSON.stringify(element) + "�" + value + "�" + action + "�" + type + "�" +  src);
    this.whichMappedKey = "";
  }
  
  whatToDoWithThisKeyPress(element, value, action, type, src, visible) {
    // Manual Key Press

    // Highlight the Operations clicked

    switch (visible) {
      case 'hide' :
        break;
      default :
        switch (type) {
          case 'equalsSign' : 
            if (this.operatorXY != "" && this.varX != "" && this.varY != "") {
              this.computeResults();
              this.varX = "";
              this.varY = "";
              this.operatorXY = "";
            }
            break;

          case 'base2' : // Binary
            //  this.calculatorLayout for Numbers 2 - 9 set visible = "hide"
            //  Operation Trigonometry, Logarithm, Roots, Powers - Hidden 
            break;

          case 'base8' : 
            //  this.calculatorLayout for Numbers 8 - 9 set visible = "hide"
            break;

          case 'base10' : // Desi
            //  this.calculatorLayout for Numbers A - F set visible = "hide"
            break;

          case 'base12' :
            //  this.calculatorLayout for Numbers C - F set visible = "hide"
            break;

          case 'base16' :
            //  this.calculatorLayout for Numbers 0-9 & A - F set visible = "show"
            break;

          case 'base20' : // Maya, Kaktovik
            //  this.calculatorLayout for Numbers 0-9 & A - F set visible = "show"
            break;

          case 'base60' : // Sumerian
            //  this.calculatorLayout for Numbers 0-9 & A - F set visible = "show"
            break;

          case 'useMemory' :
            this.resultField.nativeElement.value = this.keepInMemory;
            break;

          case '★' :
            this.bookmarkedEquations.push(this.resultField.nativeElement.value);
            break;

          case 'undoAction' :
            this.resultField.nativeElement.value = this.resultField.nativeElement.value.substr(0, this.resultField.nativeElement.value.length - 1);
            this.equationField.nativeElement.value = this.resultField.nativeElement.value;
            this.nonUnicodeNumberResult.splice(this.nonUnicodeNumberResult.length - 1);
            this.nonUnicodeNumberEquation.splice(this.nonUnicodeNumberEquation.length - 1);
            break;

          case 'restart' :
            this.resultField.nativeElement.value = '';
            this.varX = "";
            this.varY = "";
            this.operatorXY = "";
            this.nonUnicodeNumberResult = [];
            break;

          case 'formula1' :
            // Do calculation based off this.historyEquations[0] formula
            // Store in LocalStorage for session persistence
            break;
          
          case 'formula2' :
            // Do calculation based off this.historyEquations[1] formula
            // Store in LocalStorage for session persistence
            break;

          case 'formula3' :
            // Do calculation based off this.historyEquations[2] formula
            // Store in LocalStorage for session persistence
            break;
          
          case 'formula4' :
            // Do calculation based off this.historyEquations[3] formula
            // Store in LocalStorage for session persistence
            break;

          case 'currencySymbol' :
            this.equationField.nativeElement.value = (this.resultField.nativeElement.value.indexOf(value) > -1) ? this.resultField.nativeElement.value :  this.resultField.nativeElement.value + value;
            break;

          case 'factorial' :
            this.resultField.nativeElement.value = this.resultField.nativeElement.value + "!";
            this.equationField.nativeElement.value = this.resultField.nativeElement.value;
            break;

          case 'naturalLogarithm' :
            this.resultField.nativeElement.value = this.resultField.nativeElement.value + "ln";
            this.equationField.nativeElement.value = this.resultField.nativeElement.value;
            break;
          
          case 'logarithm' :
            this.resultField.nativeElement.value = this.resultField.nativeElement.value + "log";
            this.equationField.nativeElement.value = this.resultField.nativeElement.value;
            break;

          case 'signChange' :
            this.resultField.nativeElement.value = "-" + this.resultField.nativeElement.value;
            this.equationField.nativeElement.value = this.resultField.nativeElement.value;
            break;

          default : // Variable Building Phase - RTL & LTR validation
            if (this.operators.indexOf(value) == -1 && this.operatorXY == "" && this.varX == "" && this.varY == "") {
              this.resultField.nativeElement.value = this.resultField.nativeElement.value + value;
              this.equationField.nativeElement.value = this.resultField.nativeElement.value;
              if (this.unicode5AndHigher && this.rtlNumerals.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
                this.nonUnicodeNumberResult.push({"src":"","value":" "});
                this.nonUnicodeNumberResult.unshift({"src":src,"value":value});
              } else if (this.unicode5AndHigher) {
                this.nonUnicodeNumberResult.push({"src":src,"value":value});
              }
              this.nonUnicodeNumberEquation = this.nonUnicodeNumberResult.slice();
              if (this.nonUnicodeNumberResult.length == 2 && this.rtlNumerals.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
                this.nonUnicodeNumberResult = this.nonUnicodeNumberResult.slice().reverse();
                this.nonUnicodeNumberEquation = this.nonUnicodeNumberEquation.slice().reverse();
              }
            } else if (this.operators.indexOf(value) > -1 && this.operatorXY == "" && this.varX == "") {
              this.operatorXY = value;
              this.equationField.nativeElement.value = this.resultField.nativeElement.value + " " + value;
              this.varX = this.resultField.nativeElement.value;
              this.keepInMemory = this.resultField.nativeElement.value;
              if (this.rtlNumerals.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
                this.nonUnicodeNumberEquation.push({"src":"","value":" "});
                this.nonUnicodeNumberEquation.unshift({"src":"","value":" "});
                this.nonUnicodeNumberEquation.push({"src":"","value":" "});
                this.nonUnicodeNumberEquation.unshift({"src":"","value":this.operatorXY});
              } else {
                this.nonUnicodeNumberEquation.push({"src":"","value":" "});
                this.nonUnicodeNumberEquation.push({"src":"","value":this.operatorXY});
              }
            } else if (this.operators.indexOf(value) == -1 && this.operatorXY != "" && this.varY == "") {
              this.equationField.nativeElement.value = this.equationField.nativeElement.value + " " + value;
              this.resultField.nativeElement.value = value;
              this.varY = this.resultField.nativeElement.value;
              this.nonUnicodeNumberResult = [];
              if (this.unicode5AndHigher && this.rtlNumerals.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
                this.nonUnicodeNumberResult.push({"src":src,"value":value});
                this.nonUnicodeNumberEquation.push({"src":"","value":" "});
                this.nonUnicodeNumberEquation.unshift({"src":src,"value":value});
              } else if (this.unicode5AndHigher) {
                this.nonUnicodeNumberResult.push({"src":src,"value":value});
                this.nonUnicodeNumberEquation.push({"src":src,"value":value});
              }
            } else if (this.operators.indexOf(value) == -1 && this.operatorXY != "" && this.varY != ""){
              this.resultField.nativeElement.value = this.resultField.nativeElement.value + value;
              this.equationField.nativeElement.value = this.equationField.nativeElement.value + value;
              this.varY = this.resultField.nativeElement.value;
              if (this.unicode5AndHigher && this.rtlNumerals.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
                this.nonUnicodeNumberResult.push({"src":"","value":" "});
                this.nonUnicodeNumberResult.unshift({"src":src,"value":value});
              } else if (this.unicode5AndHigher) {
                this.nonUnicodeNumberResult.push({"src":src,"value":value});
              }
              if (this.nonUnicodeNumberResult.length == 2 && this.rtlNumerals.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
                this.nonUnicodeNumberResult = this.nonUnicodeNumberResult.slice().reverse();
              }
              if (this.unicode5AndHigher && this.rtlNumerals.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
                this.nonUnicodeNumberEquation.splice(this.nonUnicodeNumberEquation.length - 1)
                this.nonUnicodeNumberEquation.push({"src":"","value":" "});
                this.nonUnicodeNumberEquation.unshift({"src":src,"value":value});
              } else if (this.unicode5AndHigher) {
                this.nonUnicodeNumberEquation.push({"src":src,"value":value});
              }
            }
            break;
        }
    }
  }

  carveOperatorVariables(contentOfInput) {
    // Value is being Typed using Keyboard

    // Highlight the Operations clicked

    if (this.operators.indexOf(contentOfInput.substr(contentOfInput.length-1)) == -1 && this.operatorXY == "" && this.varX == "" && this.varY == "") {
      this.resultField.nativeElement.value = contentOfInput;
      this.equationField.nativeElement.value = this.resultField.nativeElement.value;
    } else if (this.operators.indexOf(contentOfInput.substr(contentOfInput.length-1)) > -1 && this.operatorXY == "" && this.varX == "") {
      this.operatorXY = contentOfInput.substr(contentOfInput.length-1);
      this.resultField.nativeElement.value = contentOfInput.substr(0, contentOfInput.indexOf(this.operatorXY));
      this.varX = this.resultField.nativeElement.value;
      this.equationField.nativeElement.value = this.varX + " " + this.operatorXY;
      this.keepInMemory = this.resultField.nativeElement.value;
    } else if (this.operators.indexOf(contentOfInput.substr(contentOfInput.length-1)) == -1 && this.operatorXY != "" && this.varY == "") {
      this.equationField.nativeElement.value = this.equationField.nativeElement.value + " " + contentOfInput.replace(this.varX, '');
      this.resultField.nativeElement.value = contentOfInput.replace(this.varX, '');
      this.varY = contentOfInput.replace(this.varX, '');
    } else if (this.operators.indexOf(contentOfInput.substr(contentOfInput.length-1)) == -1 && this.operatorXY != "" && this.varY != ""){
      this.resultField.nativeElement.value = contentOfInput;
      this.varY = this.resultField.nativeElement.value;
      this.equationField.nativeElement.value = this.varX + " " + this.operatorXY + " " + this.varY;
    } else if (this.allowedTypingContent.indexOf(contentOfInput.substr(contentOfInput.length-1)) == -1 || this.operators.indexOf(contentOfInput.substr(contentOfInput.length-1)) == -1) {
      // Allow 0-9 & A-F depending on Base with Operations
      this.resultField.nativeElement.value = '';
    }
    // Call only when "Enter" is pressed
    /*
    if (this.operatorXY != "" && this.varX != "" && this.varY != "") {
      this.computeResults();
      this.varX = "";
      this.varY = "";
      this.operatorXY = "";
    }
    */
  }

  stringManipulator(stringToReturn, hostString, mappedArray) {
    for (let str of hostString) {
      if (mappedArray[str])
        stringToReturn = stringToReturn + mappedArray[str];
      else
        stringToReturn = stringToReturn + str;
    }
    return stringToReturn;
  }

  computeResults() {
    // map this.varX and this.varY with corresponding num Type be mapped to 0 - 9 numbers
    var localeMappedX = this.stringManipulator("", this.varX, this.numberMap);
    var localeMappedY = this.stringManipulator("", this.varY, this.numberMap);

    switch(this.operatorXY) {
      case '%' :
        this.operationResult = parseInt(localeMappedX) % parseInt(localeMappedY);
        break;
      case '÷' :
        this.operationResult = parseInt(localeMappedX) / parseInt(localeMappedY);
        break;
      case '/' :
        this.operationResult = parseInt(localeMappedX) / parseInt(localeMappedY);
        break;
      case '*' :
        this.operationResult = parseInt(localeMappedX) * parseInt(localeMappedY);
        break;
      case '·' :
        this.operationResult = parseInt(localeMappedX) * parseInt(localeMappedY);
        break;
      case '×' :
        this.operationResult = parseInt(localeMappedX) * parseInt(localeMappedY);
        break;
      case '-' :
        this.operationResult = parseInt(localeMappedX) - parseInt(localeMappedY);
        break;
      case '+' :
        this.operationResult = parseInt(localeMappedX) + parseInt(localeMappedY);
        break;
    }
    if (this.rtlNumerals.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
      this.equationField.nativeElement.value = this.displayVariableInLocaleFormat(this.operationResult) + " = " + this.equationField.nativeElement.value;
      this.nonUnicodeNumberResult = [];
      if (this.unicode5AndHigher) {
        let includeEqualsOnce = true;
        for (let char of this.operationResult.toString()) {
          this.nonUnicodeNumberEquation.push({"src":"","value":" "});
          this.nonUnicodeNumberResult.unshift({"src":this.nonUnicodeMap[char],"value":char});
          if (includeEqualsOnce) {
            this.nonUnicodeNumberEquation.push({"src":"","value":" "});
            this.nonUnicodeNumberEquation.unshift({"src":"","value":"="});
            this.nonUnicodeNumberEquation.push({"src":"","value":" "});
            includeEqualsOnce = false;
          }
          this.nonUnicodeNumberEquation.push({"src":"","value":" "});
          this.nonUnicodeNumberEquation.unshift({"src":this.nonUnicodeMap[char],"value":char});
        }
      }
    } else {
      this.equationField.nativeElement.value = this.equationField.nativeElement.value + " = " + this.displayVariableInLocaleFormat(this.operationResult);
      this.nonUnicodeNumberResult = [];
      if (this.unicode5AndHigher) {
        let includeEqualsOnce = true;
        for (let char of this.operationResult.toString()) {
          this.nonUnicodeNumberResult.push({"src":this.nonUnicodeMap[char],"value":char});
          if (includeEqualsOnce) {
            this.nonUnicodeNumberEquation.push({"src":"","value":" "});
            this.nonUnicodeNumberEquation.push({"src":"","value":"="});
            this.nonUnicodeNumberEquation.push({"src":"","value":" "});
            includeEqualsOnce = false;
          }
          this.nonUnicodeNumberEquation.push({"src":this.nonUnicodeMap[char],"value":char});
        }
      }
    }
    this.resultField.nativeElement.value = this.displayVariableInLocaleFormat(this.operationResult);
  }

  displayVariableInLocaleFormat (result) {
    /* 
      this.resultField.nativeElement.value = formatted Value;

      Reference - https://en.wikipedia.org/wiki/Decimal_separator#Usage_worldwide for each of the following variables 

      commaDecimalSeparatorLocales
      periodDecimalSeparatorLocales
      arabicDecimalSeparatorLocales
      desiCommaPosition
      desiSpacePosition
      thousandsPositionApostropheAndPeriodDecimal
      thousandsPositionApostropheAndCommaDecimal
      thousandsPositionPeriodAndApostropheDecimal
      thousandsPositionPeriodAndCommaDecimal
      thousandsPositionCommaAndPeriodDecimal
      thousandsPositionSpaceAndPeriodDecimal
      thousandsPositionSpaceAndCommaDecimal
      thousandsPositionCommaAndMiddleDotDecimal
      tenThousandsCommaAndPeriod
      tenThousandsSpaceAndPeriod
      commaAndPeriodAlternating 
    */

    // Iterate through this.anyCalculatorLayout for Type num0 to num9 mapping for 0 to 9 in all scripts & languages
    return this.stringManipulator("", result.toString(), this.mapLocale);
  }

  copyContent(fieldName) {
    if (fieldName == 'resultField') {
      navigator.clipboard.writeText(this.resultField.nativeElement.value);
    } else if (fieldName == 'equationField') {
      navigator.clipboard.writeText(this.equationField.nativeElement.value);
    }
  }

  sendResultOnly() {
    this.keyPressed({"value":this.resultField.nativeElement.value,"action":"char","src":"","type":"number"}, this.resultField.nativeElement.value, "char", "number", "");
  }

  sendResultAndEquation() {
    this.keyPressed({"value":this.historyEquations[this.historyEquations.length -1],"action":"char","src":"","type":"number"}, this.historyEquations[this.historyEquations.length -1], "char", "number", "");
  }

  switchCalculators() {
    if (this.currentCalculatorType == 'simple') {
      this.anyCalculatorLayout = this.calculatorLayout.slice();
      this.currentCalculatorType = 'scientific';
    } else if (this.currentCalculatorType == 'scientific') {
      this.anyCalculatorLayout = this.simpleCalculatorLayout.slice();
      this.currentCalculatorType = 'simple';
    }
  }
}
