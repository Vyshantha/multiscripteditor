import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';

import { HelperComponent } from '../helper/helper.component';

import * as allLayoutPositions from './../../assets/keyboard-layouts/keysboards-layouts.json';

import * as layoutKannadaKn from './../../assets/keyboard-layouts/layout-kannada-kn.json';
import * as layoutKadambaKada from './../../assets/keyboard-layouts/layout-kadamba-kada.json';
import * as layoutTeluguTe from './../../assets/keyboard-layouts/layout-telugu-te.json';
import * as layoutTamilTa from './../../assets/keyboard-layouts/layout-tamil-ta.json';
import * as layoutBadagaBada from './../../assets/keyboard-layouts/layout-badaga-bada.json';
import * as layoutGranthaGran from './../../assets/keyboard-layouts/layout-grantha-gran.json';
import * as layoutMalayalamMl from './../../assets/keyboard-layouts/layout-malayalam-ml.json';
import * as layoutTigalariTiga from './../../assets/keyboard-layouts/layout-tigalari-tiga.json';
import * as layoutSanskritSa from './../../assets/keyboard-layouts/layout-sanskrit-sa.json';
import * as layoutDhimalDham from './../../assets/keyboard-layouts/layout-dhimal-dham.json';
import * as layoutGalikGalk from './../../assets/keyboard-layouts/layout-galik-galk.json';
import * as layoutRanjanaNew from './../../assets/keyboard-layouts/layout-ranjana-new.json';
import * as layoutTamuKyiTamu from './../../assets/keyboard-layouts/layout-tamukyi-tamu.json';
import * as layoutPracalitPrac from './../../assets/keyboard-layouts/layout-pracalit-prac.json';
import * as layoutGuptaGup from './../../assets/keyboard-layouts/layout-gupta-gup.json';
import * as layoutSiddhamSidd from './../../assets/keyboard-layouts/layout-siddham-sidd.json';
import * as layoutSharadaShrd from './../../assets/keyboard-layouts/layout-sharada-shrd.json';
import * as layoutHindiHi from './../../assets/keyboard-layouts/layout-hindi-hi.json';
import * as layoutSindhiSnd from './../../assets/keyboard-layouts/layout-sindhi-snd.json';
import * as layoutMarathiMr from './../../assets/keyboard-layouts/layout-marathi-mr.json';
import * as layoutModiModi from './../../assets/keyboard-layouts/layout-modi-modi.json';
import * as layoutNandinagariNand from './../../assets/keyboard-layouts/layout-nandinagari-nand.json';
import * as layoutPallavaPall from './../../assets/keyboard-layouts/layout-pallava-pall.json';
import * as layoutTocharianToch from './../../assets/keyboard-layouts/layout-tocharian-toch.json';
import * as layoutSaurashtraSaur from './../../assets/keyboard-layouts/layout-saurashtra-saur.json';
import * as layoutKaithiKthi from './../../assets/keyboard-layouts/layout-kaithi-kthi.json';
import * as layoutBrailleIUB from './../../assets/keyboard-layouts/layout-braille-iub.json';
import * as layoutMoonMoon from './../../assets/keyboard-layouts/layout-moon-moon.json';
import * as layoutBrahmiSa from './../../assets/keyboard-layouts/layout-brahmi-brah.json';
import * as layoutMagarMaga from './../../assets/keyboard-layouts/layout-magarakkha-maga.json';
import * as layoutWanchoWcho from './../../assets/keyboard-layouts/layout-wancho-wcho.json';
import * as layoutPunjabiPa from './../../assets/keyboard-layouts/layout-punjabi-pa.json';
import * as layoutGujaratiGu from './../../assets/keyboard-layouts/layout-gujarati-gu.json';
import * as layoutOdiaOr from './../../assets/keyboard-layouts/layout-odia-or.json';
import * as layoutBengaliBn from './../../assets/keyboard-layouts/layout-bengali-bn.json';
import * as layoutKhimhunTang from './../../assets/keyboard-layouts/layout-khimhun-tang.json';
import * as layoutTirhutaTirh from './../../assets/keyboard-layouts/layout-tirhuta-tirh.json';
import * as layoutTakriTakr from './../../assets/keyboard-layouts/layout-takri-takr.json';
import * as layoutKhojkiKhoj from './../../assets/keyboard-layouts/layout-khojki-khoj.json';
import * as layoutKhudawadiKhud from './../../assets/keyboard-layouts/layout-khudawadi-khud.json';
import * as layoutSylotiSylo from './../../assets/keyboard-layouts/layout-sylheti-sylo.json';
import * as layoutManipuriMni from './../../assets/keyboard-layouts/layout-manipuri-mni.json';
import * as layoutTibetianTibt from './../../assets/keyboard-layouts/layout-tibetian-tibt.json';
import * as layoutMultaniMult from './../../assets/keyboard-layouts/layout-multani-mult.json';
import * as layoutMahajaniMaha from './../../assets/keyboard-layouts/layout-mahajani-maha.json';
import * as layoutThaanaThaa from './../../assets/keyboard-layouts/layout-thaana-thaa.json';
import * as layoutDivesAkuruDiak from './../../assets/keyboard-layouts/layout-divesakuru-diak.json';
import * as layoutGeezGeez from './../../assets/keyboard-layouts/layout-geez-geez.json';
import * as layoutLepchaLepc from './../../assets/keyboard-layouts/layout-lepcha-lepc.json';
import * as layoutKhmerKhmr from './../../assets/keyboard-layouts/layout-khmer-khmr.json';
import * as layoutSinhalaSinh from './../../assets/keyboard-layouts/layout-sinhala-sinh.json';
import * as layoutThaiThai from './../../assets/keyboard-layouts/layout-thai-th.json';
import * as layoutLaoLao from './../../assets/keyboard-layouts/layout-lao-lo.json';
import * as layoutShanShan from './../../assets/keyboard-layouts/layout-shan-shan.json';
import * as layoutMyanmarMy from './../../assets/keyboard-layouts/layout-myanmar-my.json';
import * as layoutBalineseBali from './../../assets/keyboard-layouts/layout-balinese-bali.json';
import * as layoutJavaneseJava from './../../assets/keyboard-layouts/layout-javanese-java.json';
import * as layoutBugineseBug from './../../assets/keyboard-layouts/layout-buginese-bug.json';
import * as layoutKulitanKuli from './../../assets/keyboard-layouts/layout-kulitan-kuli.json';
import * as layoutMakasarMaka from './../../assets/keyboard-layouts/layout-makasar-maka.json';
import * as layoutBatakBatk from './../../assets/keyboard-layouts/layout-batak-batk.json';
import * as layoutBaybayinTglg from './../../assets/keyboard-layouts/layout-baybayin-tglg.json';
import * as layoutHanunuoHano from './../../assets/keyboard-layouts/layout-hanunoo-hano.json';
import * as layoutTagbanwaTagb from './../../assets/keyboard-layouts/layout-tagbanwa-tagb.json';
import * as layoutChakmaCakm from './../../assets/keyboard-layouts/layout-chakma-cakm.json';
import * as layoutChamCham from './../../assets/keyboard-layouts/layout-cham-cham.json';
import * as layoutBuhidBuhd from './../../assets/keyboard-layouts/layout-buhid-buhd.json';
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
import * as layoutBamunBamu from './../../assets/keyboard-layouts/layout-bamun-bamu.json';
import * as layoutIbanIba from './../../assets/keyboard-layouts/layout-iban-iba.json';
import * as layoutDitemaDite from './../../assets/keyboard-layouts/layout-ditema-dite.json';
import * as layoutWoleaiWole from './../../assets/keyboard-layouts/layout-woleai-wole.json';
import * as layoutCreeCree from './../../assets/keyboard-layouts/layout-cree-cree.json';
import * as layoutVaiVaii from './../../assets/keyboard-layouts/layout-vai-vaii.json';
import * as layoutCherokeeCher from './../../assets/keyboard-layouts/layout-cherokee-cher.json';
import * as layoutKayahLi from './../../assets/keyboard-layouts/layout-kayahli-kali.json';
import * as layoutLimbuLimb from './../../assets/keyboard-layouts/layout-limbu-limb.json';
import * as layoutKawiKawi from './../../assets/keyboard-layouts/layout-kawi-kawi.json';
import * as layoutAvestanAvst from './../../assets/keyboard-layouts/layout-avestan-avst.json';
import * as layoutWolofWolf from './../../assets/keyboard-layouts/layout-wolof-wolf.json';
import * as layoutKharosthiKhar from './../../assets/keyboard-layouts/layout-kharosthi-khar.json';
import * as layoutLandaLand from './../../assets/keyboard-layouts/layout-landa-land.json';
import * as layoutPhagsPa from './../../assets/keyboard-layouts/layout-phagspa-phag.json';
import * as layoutDogriDogr from './../../assets/keyboard-layouts/layout-dogri-dogr.json';
import * as layoutTikamuliTika from './../../assets/keyboard-layouts/layout-tikamuli-tika.json';
import * as layoutLatinLa from './../../assets/keyboard-layouts/layout-latin-la.json';
import * as layoutUyghurUyy from './../../assets/keyboard-layouts/layout-uyghur.uyy.json';
import * as layoutCaucasianAlbanianUdi from './../../assets/keyboard-layouts/layout-udi-udi.json';
import * as layoutOsageOsge from './../../assets/keyboard-layouts/layout-osage-osge.json';
import * as layoutAfakaNjdu from './../../assets/keyboard-layouts/layout-afaka-ndju.json';
import * as layoutGreekEl from './../../assets/keyboard-layouts/layout-greek-el.json';
import * as layoutCopticCopt from './../../assets/keyboard-layouts/layout-coptic-copt.json';
import * as layoutCypriotCprt from './../../assets/keyboard-layouts/layout-cypriot-cprt.json';
import * as layoutLinearBLinb from './../../assets/keyboard-layouts/layout-linearb-linb.json';
import * as layoutBerberTfng from './../../assets/keyboard-layouts/layout-berber-tfng.json';
import * as layoutBerberBer from './../../assets/keyboard-layouts/layout-berber-ber.json';
import * as layoutOsmaniaOsma from './../../assets/keyboard-layouts/layout-osmania-osma.json';
import * as layoutAdlamAdlm from './../../assets/keyboard-layouts/layout-adlam-adlm.json';
import * as layoutOlChiki from './../../assets/keyboard-layouts/layout-olchiki-olck.json';
import * as layoutMruMroo from './../../assets/keyboard-layouts/layout-mru-mroo.json';
import * as layoutGeorgianKa from './../../assets/keyboard-layouts/layout-georgian-ka.json';
import * as layoutAsomtavruliAsom from './../../assets/keyboard-layouts/layout-asomtavruli-asom.json';
import * as layoutNushkuriNusk from './../../assets/keyboard-layouts/layout-nuskhuri-nusk.json';
import * as layoutArmenianHy from './../../assets/keyboard-layouts/layout-armenian-hy.json';
import * as layoutKazakhKaz from './../../assets/keyboard-layouts/layout-kazakh-kaz.json';
import * as layoutKazakhKk from './../../assets/keyboard-layouts/layout-kazakh-kk.json';
import * as layoutTajikTg from './../../assets/keyboard-layouts/layout-tajik-tg.json';
import * as layoutTajikTgk from './../../assets/keyboard-layouts/layout-tajik-tgk.json';
import * as layoutUzbekUz from './../../assets/keyboard-layouts/layout-uzbek-uz.json';
import * as layoutUzbekUzb from './../../assets/keyboard-layouts/layout-uzbek-uzb.json';
import * as layoutSerbianSrb from './../../assets/keyboard-layouts/layout-serbian-srb.json';
import * as layoutAzerbaijaniAz from './../../assets/keyboard-layouts/layout-azerbaijani-az.json';
import * as layoutAzerbaijaniAze from './../../assets/keyboard-layouts/layout-azerbaijani-aze.json';
import * as layoutMacedonianMk from './../../assets/keyboard-layouts/layout-macedonian-mk.json';
import * as layoutKyrgyzKy from './../../assets/keyboard-layouts/layout-kyrgyz-ky.json';
import * as layoutMongolianMon from './../../assets/keyboard-layouts/layout-mongolian-mon.json';
import * as layoutYakutSah from './../../assets/keyboard-layouts/layout-yakut-sah.json';
import * as layoutRussianRu from './../../assets/keyboard-layouts/layout-russian-ru.json';
import * as layoutBelarussianBe from './../../assets/keyboard-layouts/layout-belarussian-be.json';
import * as layoutUkranianUk from './../../assets/keyboard-layouts/layout-ukranian-uk.json';
import * as layoutKomiKomi from './../../assets/keyboard-layouts/layout-komi-komi.json';
import * as layoutDeutschDe from './../../assets/keyboard-layouts/layout-deutsch-de.json';
import * as layoutEstonianEt from './../../assets/keyboard-layouts/layout-estonian-et.json';
import * as layoutSpanishEs from './../../assets/keyboard-layouts/layout-spanish-es.json';
import * as layoutSpanishEsMX from './../../assets/keyboard-layouts/layout-spanish-esmx.json';
import * as layoutIcelandicIs from './../../assets/keyboard-layouts/layout-icelandic-is.json';
import * as layoutPortuguesePt from './../../assets/keyboard-layouts/layout-portuguese-pt.json';
import * as layoutPortuguesePtBR from './../../assets/keyboard-layouts/layout-portuguese-ptbr.json';
import * as layoutSwedishSv from './../../assets/keyboard-layouts/layout-swedish-sv.json';
import * as layoutFrenchFr from './../../assets/keyboard-layouts/layout-french-fr.json';
import * as layoutBasqueEu from './../../assets/keyboard-layouts/layout-euskara-eu.json';
import * as layoutEnglishEnUS from './../../assets/keyboard-layouts/layout-english-enus.json';
import * as layoutEnglishEnUK from './../../assets/keyboard-layouts/layout-english-enuk.json';
import * as layoutEnglishEnIntl from './../../assets/keyboard-layouts/layout-english-enintl.json';
import * as layoutAngliscAng from './../../assets/keyboard-layouts/layout-anglisc-ang.json';
import * as layoutDutchNl from './../../assets/keyboard-layouts/layout-dutch-nl.json';
import * as layoutItalianIt from './../../assets/keyboard-layouts/layout-italian-it.json';
import * as layoutCzechCs from './../../assets/keyboard-layouts/layout-czech-cs.json';
import * as layoutLithuanianLt from './../../assets/keyboard-layouts/layout-lithuanian-lt.json';
import * as layoutMalteseMt from './../../assets/keyboard-layouts/layout-maltese-mt.json';
import * as layoutGothicGoth from './../../assets/keyboard-layouts/layout-gothic-goth.json';
import * as layoutAlbanianAlb from './../../assets/keyboard-layouts/layout-albanian-alb.json';
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
import * as layoutEgyptianKmt from './../../assets/keyboard-layouts/layout-egyptian-kmt.json';
import * as layoutZihuiZih from './../../assets/keyboard-layouts/layout-zihui-zih.json';
import * as layoutKoreanKo from './../../assets/keyboard-layouts/layout-hangul-ko.json';
import * as layoutHebrewHe from './../../assets/keyboard-layouts/layout-hebrew-he.json';
import * as layoutYiddishYid from './../../assets/keyboard-layouts/layout-yiddish-yid.json';
import * as layoutTotoToto from './../../assets/keyboard-layouts/layout-toto-toto.json';
import * as layoutMendeMend from './../../assets/keyboard-layouts/layout-mende-mend.json';
import * as layoutAramaicArc from './../../assets/keyboard-layouts/layout-aramaic-arc.json';
import * as layoutArchaicGreekIon from './../../assets/keyboard-layouts/layout-archaicgreek-ion.json';
import * as layoutGebaGeba from './../../assets/keyboard-layouts/layout-geba-geba.json';
import * as layoutSogdianSog from './../../assets/keyboard-layouts/layout-sogdian-sog.json';
import * as layoutKultobeKult from './../../assets/keyboard-layouts/layout-kultobe-kult.json';
import * as layoutSamaritanSamr from './../../assets/keyboard-layouts/layout-samaritan-samr.json';
import * as layoutKaidaKaid from './../../assets/keyboard-layouts/layout-kaida-kaid.json';
import * as layoutSafaiticSafa from './../../assets/keyboard-layouts/layout-safaitic-safa.json';
import * as layoutFarsiFa from './../../assets/keyboard-layouts/layout-farsi-fa.json';
import * as layoutArabicAr from './../../assets/keyboard-layouts/layout-arabic-ar.json';
import * as layoutAjamiAjam from './../../assets/keyboard-layouts/layout-ajami-ajam.json';
import * as layoutSlavonicCyrs from './../../assets/keyboard-layouts/layout-slavonic-cyrs.json';
import * as layoutPahlaviPal from './../../assets/keyboard-layouts/layout-pahlavi-pal.json';
import * as layoutParthianXpr from './../../assets/keyboard-layouts/layout-parthian-xpr.json';
import * as layoutMandaicMand from './../../assets/keyboard-layouts/layout-mandaic-mand.json';
import * as layoutChorasmianChor from './../../assets/keyboard-layouts/layout-chorasmian-chrs.json';
import * as layoutSabaeanXsa from './../../assets/keyboard-layouts/layout-sabaean-xsa.json';
import * as layoutSyriacSyrc from './../../assets/keyboard-layouts/layout-syriac-syrc.json';
import * as layoutSuriyaniGars from './../../assets/keyboard-layouts/layout-suriyani-gars.json';
import * as layoutPalmyrenePalm from './../../assets/keyboard-layouts/layout-palmyrene-palm.json';
import * as layoutElymaicElym from './../../assets/keyboard-layouts/layout-elymaic-elym.json';
import * as layoutLuwianLuw from './../../assets/keyboard-layouts/layout-luwian-luw.json';
import * as layoutHatranHatr from './../../assets/keyboard-layouts/layout-hatran-hatr.json';
import * as layoutRohingyaRohg from './../../assets/keyboard-layouts/layout-hanifi-rohg.json';
import * as layoutManichaeanMani from './../../assets/keyboard-layouts/layout-manichaean-mani.json';
import * as layoutNabataeanNbat from './../../assets/keyboard-layouts/layout-nabataean-nbat.json';
import * as layoutPsalterPsal from './../../assets/keyboard-layouts/layout-psalter-psal.json';
import * as layoutZoulaiZou from './../../assets/keyboard-layouts/layout-zoulai-zou.json';
import * as layoutNushuNshu from './../../assets/keyboard-layouts/layout-nushu-nshu.json';
import * as layoutUgariticUgar from './../../assets/keyboard-layouts/layout-ugaritic-ugar.json';
import * as layoutMayanMaya from './../../assets/keyboard-layouts/layout-mayan-maya.json';
import * as layoutNosuYiii from './../../assets/keyboard-layouts/layout-nosu-yiii.json';
import * as layoutMeroiticGlyph from './../../assets/keyboard-layouts/layout-meroiticglyph-mer.json';
import * as layoutMeroiticMero from './../../assets/keyboard-layouts/layout-meriotic-mero.json';
import * as layoutSumerianSux from './../../assets/keyboard-layouts/layout-cuneiform-sux.json';
import * as layoutBlackfootBla from './../../assets/keyboard-layouts/layout-blackfoot-bla.json';
import * as layoutElamiteElam from './../../assets/keyboard-layouts/layout-elamite-elam.json';
import * as layoutHittiteHit from './../../assets/keyboard-layouts/layout-hittite-hit.json';
import * as layoutPersianXpeo from './../../assets/keyboard-layouts/layout-persian-xpeo.json';
import * as layoutDemoticEgyd from './../../assets/keyboard-layouts/layout-demotic-egyd.json';
import * as layoutNKoNKoo from './../../assets/keyboard-layouts/layout-nko-nkoo.json';
import * as layoutLomaLoma from './../../assets/keyboard-layouts/layout-loma-loma.json';
import * as layoutYezidiYezi from './../../assets/keyboard-layouts/layout-yezidi-yezi.json';
import * as layoutSyriacClassicalEstr from './../../assets/keyboard-layouts/layout-syriacclassical-estr.json';
import * as layoutSyriacWesternSert from './../../assets/keyboard-layouts/layout-syriacwestern-sert.json';
import * as layoutSyriacEasternMadn from './../../assets/keyboard-layouts/layout-syriaceastern-madn.json';
import * as layoutKhazarianKhaz from './../../assets/keyboard-layouts/layout-khazarian-khaz.json';
import * as layoutSignUS from './../../assets/keyboard-layouts/layout-fingers-ussign.json';
import * as layoutBANZSL from './../../assets/keyboard-layouts/layout-fingers-banzsl.json';
import * as layoutFlagsICS from './../../assets/keyboard-layouts/layout-flags-ics.json';
import * as layoutSemaphoreFlag from './../../assets/keyboard-layouts/layout-semaphore-flag.json';
import * as layoutMorseCode from './../../assets/keyboard-layouts/layout-code-morse.json';

import { SessionManagerService } from '../core/services/session-manager.service';

@Component({
  selector: 'app-keyboard-layouts',
  templateUrl: './keyboard-layouts.component.html',
  styleUrls: ['./keyboard-layouts.component.scss']
})
export class KeyboardLayoutsComponent implements OnInit, AfterViewInit {

  @ViewChild('allScriptsTabs') allTabGroups : ElementRef;
  @ViewChild('onlyKeyboard') keysAbove : ElementRef;

  @ViewChild('scriptTypesTabAll') allScriptTypesTabGroup: MatTabGroup;
  @ViewChild('scriptAbjadType') tabGroupAbjad: MatTabGroup;
  @ViewChild('scriptAlphabetType') tabGroupAlphabet: MatTabGroup;
  @ViewChild('scriptAbugidaType') tabGroupAbugida: MatTabGroup;
  @ViewChild('scriptSyllaberyType') tabGroupSyllabery: MatTabGroup;
  @ViewChild('scriptGramsType') tabGroupGrams: MatTabGroup;

  HelperPopUp: any = HelperComponent;

  keyboardLayouts: any = (allLayoutPositions as any).default;

  layoutKannadaKeys: any = (layoutKannadaKn as any).default;
  layoutKadambaKeys: any = (layoutKadambaKada as any).default;
  layoutTeluguKeys: any = (layoutTeluguTe as any).default;
  layoutTamilKeys: any = (layoutTamilTa as any).default;
  layoutBadagaKeys: any = (layoutBadagaBada as any).default;
  layoutGranthaKeys: any = (layoutGranthaGran as any).default;
  layoutMalayalamKeys: any = (layoutMalayalamMl as any).default;
  layoutTigalariKeys: any = (layoutTigalariTiga as any).default;
  layoutSanskritKeys: any = (layoutSanskritSa as any).default;
  layoutDhamKeys: any = (layoutDhimalDham as any).default;
  layoutGalikKeys: any = (layoutGalikGalk as any).default;
  layoutRanjanaKeys: any = (layoutRanjanaNew as any).default;
  layoutTamuKyiKeys: any = (layoutTamuKyiTamu as any).default;
  layoutPracalitKeys: any = (layoutPracalitPrac as any).default;
  layoutGuptaKeys: any = (layoutGuptaGup as any).default;
  layoutSiddhamKeys: any = (layoutSiddhamSidd as any).default;
  layoutSharadaKeys: any = (layoutSharadaShrd as any).default;
  layoutHindiKeys: any = (layoutHindiHi as any).default;
  layoutSindhiSndKeys: any = (layoutSindhiSnd as any).default;
  layoutMarathiKeys: any = (layoutMarathiMr as any).default;
  layoutModiKeys: any = (layoutModiModi as any).default;
  layoutNandinagariKeys: any = (layoutNandinagariNand as any).default;
  layoutPallavaKeys: any = (layoutPallavaPall as any).default;
  layoutTocharianKeys: any = (layoutTocharianToch as any).default;
  layoutSaurashtraKeys: any = (layoutSaurashtraSaur as any).default;
  layoutKaithiKeys: any = (layoutKaithiKthi as any).default;
  layoutBrahmiKeys: any = (layoutBrahmiSa as any).default;
  layoutMagarKeys: any = (layoutMagarMaga as any).default;
  layoutWanchoKeys: any = (layoutWanchoWcho as any).default;
  layoutPunjabiKeys: any = (layoutPunjabiPa as any).default;
  layoutGujaratiKeys: any = (layoutGujaratiGu as any).default;
  layoutOdiaKeys: any = (layoutOdiaOr as any).default;
  layoutBengaliKeys: any = (layoutBengaliBn as any).default;
  layoutKhimhunKeys: any = (layoutKhimhunTang as any).default;
  layoutTirhutaKeys: any = (layoutTirhutaTirh as any).default;
  layoutTakriKeys: any = (layoutTakriTakr as any).default;
  layoutKhojkiKeys: any = (layoutKhojkiKhoj as any).default;
  layoutKhudawadiKeys: any = (layoutKhudawadiKhud as any).default;
  layoutSylhetiKeys: any = (layoutSylotiSylo as any).default;
  layoutManipuriKeys: any = (layoutManipuriMni as any).default;
  layoutTibetianKeys: any = (layoutTibetianTibt as any).default;
  layoutMultaniKeys: any = (layoutMultaniMult as any).default;
  layoutMahajaniKeys: any = (layoutMahajaniMaha as any).default;
  layoutThaanaKeys: any = (layoutThaanaThaa as any).default;
  layoutDivesAkuruKeys: any = (layoutDivesAkuruDiak as any).default;
  layoutGeezKeys: any = (layoutGeezGeez as any).default;
  layoutLepchaKeys: any = (layoutLepchaLepc as any).default;
  layoutKhmerKeys: any = (layoutKhmerKhmr as any).default;
  layoutSinhalaKeys: any = (layoutSinhalaSinh as any).default;
  layoutThaiKeys: any = (layoutThaiThai as any).default;
  layoutShanKeys: any = (layoutShanShan as any).default;
  layoutLaoKeys: any = (layoutLaoLao as any).default;
  layoutMyanmarKeys: any = (layoutMyanmarMy as any).default;
  layoutBalineseKeys: any = (layoutBalineseBali as any).default;
  layoutJavaneseKeys: any = (layoutJavaneseJava as any).default;
  layoutBugineseKeys: any = (layoutBugineseBug as any).default;
  layoutKulitanKeys: any = (layoutKulitanKuli as any).default;
  layoutMakasarKeys: any = (layoutMakasarMaka as any).default;
  layoutBatakKeys: any = (layoutBatakBatk as any).default;
  layoutBaybayinKeys: any = (layoutBaybayinTglg as any).default;
  layoutHanunuoKeys: any = (layoutHanunuoHano as any).default;
  layoutTagbanwaKeys: any = (layoutTagbanwaTagb as any).default;
  layoutChakmaKeys: any = (layoutChakmaCakm as any).default;
  layoutChamKeys: any = (layoutChamCham as any).default;
  layoutBuhidKeys: any = (layoutBuhidBuhd as any).default;
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
  layoutBamunKeys: any = (layoutBamunBamu as any).default;
  layoutIbanKeys: any = (layoutIbanIba as any).default;
  layoutDitemaKeys: any = (layoutDitemaDite as any).default;
  layoutWoleaiKeys: any = (layoutWoleaiWole as any).default;
  layoutCreeKeys: any = (layoutCreeCree as any).default;
  layoutVaiKeys: any = (layoutVaiVaii as any).default;
  layoutCherokeeKeys: any = (layoutCherokeeCher as any).default;
  layoutKayahLiKeys: any = (layoutKayahLi as any).default;
  layoutLimbuKeys: any = (layoutLimbuLimb as any).default;
  layoutKawiKeys: any = (layoutKawiKawi as any).default;
  layoutAvestanKeys: any = (layoutAvestanAvst as any).default;
  layoutWolofKeys: any = (layoutWolofWolf as any).default;
  layoutKharosthiKeys: any = (layoutKharosthiKhar as any).default;
  layoutLandaKeys: any = (layoutLandaLand as any).default;
  layoutPhagsPaKeys: any = (layoutPhagsPa as any).default;
  layoutDogriKeys: any = (layoutDogriDogr as any).default;
  layoutTikamuliKeys: any = (layoutTikamuliTika as any).default;
  layoutBrailleKeys: any = (layoutBrailleIUB as any).default;
  layoutMoonKeys: any = (layoutMoonMoon as any).default;
  layoutLatinKeys: any = (layoutLatinLa as any).default;
  layoutUyghurKeys: any = (layoutUyghurUyy as any).default;
  layoutCaucasianAlbanianKeys: any = (layoutCaucasianAlbanianUdi as any).default;
  layoutOsageKeys: any = (layoutOsageOsge as any).default;
  layoutAfakaKeys: any = (layoutAfakaNjdu as any).default;
  layoutGreekKeys: any = (layoutGreekEl as any).default;
  layoutCopticKeys: any = (layoutCopticCopt as any).default;
  layoutCypriotKeys: any = (layoutCypriotCprt as any).default;
  layoutLinearBKeys: any = (layoutLinearBLinb as any).default;
  layoutBerberKeys: any = (layoutBerberTfng as any).default;
  layoutTamazightKeys: any = (layoutBerberBer as any).default;
  layoutOsmaniaKeys: any = (layoutOsmaniaOsma as any).default;
  layoutAdlamKeys: any = (layoutAdlamAdlm as any).default;
  layoutOlChikiKeys: any = (layoutOlChiki as any).default;
  layoutMruKeys: any = (layoutMruMroo as any).default;
  layoutGeorgiaKeys: any = (layoutGeorgianKa as any).default;
  layoutAsomtavruliKeys: any = (layoutAsomtavruliAsom as any).default;
  layoutNushkuriKeys: any = (layoutNushkuriNusk as any).default;
  layoutArmenianKeys: any = (layoutArmenianHy as any).default;
  layoutKazakhCyKeys: any = (layoutKazakhKk as any).default;
  layoutKazakhLaKeys: any = (layoutKazakhKaz as any).default;
  layoutTajikLaKeys: any = (layoutTajikTg as any).default;
  layoutTajikCyKeys: any = (layoutTajikTgk as any).default;
  layoutUzbekLaKeys: any = (layoutUzbekUz as any).default;
  layoutUzbekCyKeys: any = (layoutUzbekUzb as any).default;
  layoutSerbianKeys: any = (layoutSerbianSrb as any).default;
  layoutAzerbaijaniLaKeys: any = (layoutAzerbaijaniAz as any).default;
  layoutAzerbaijaniCyKeys: any = (layoutAzerbaijaniAze as any).default;
  layoutMacedonianKeys: any = (layoutMacedonianMk as any).default;
  layoutKyrgyzCyKeys: any = (layoutKyrgyzKy as any).default;
  layoutMongolianCyKeys: any = (layoutMongolianMon as any).default;
  layoutYakutKeys: any = (layoutYakutSah as any).default;
  layoutRussianKeys: any = (layoutRussianRu as any).default;
  layoutBelarussianKeys: any = (layoutBelarussianBe as any).default;
  layoutUkrainianKeys: any = (layoutUkranianUk as any).default;
  layoutKomiKeys: any = (layoutKomiKomi as any).default;
  layoutDeutschKeys: any = (layoutDeutschDe as any).default;
  layoutEstonianKeys: any = (layoutEstonianEt as any).default;
  layoutSpanishKeys: any = (layoutSpanishEs as any).default;
  layoutSpanishMXKeys: any = (layoutSpanishEsMX as any).default;
  layoutIcelandicKeys: any = (layoutIcelandicIs as any).default;
  layoutPortugueseKeys: any = (layoutPortuguesePt as any).default;
  layoutPortugueseBRKeys: any = (layoutPortuguesePtBR as any).default;
  layoutSwedishKeys: any = (layoutSwedishSv as any).default;
  layoutFrenchKeys: any = (layoutFrenchFr as any).default;
  layoutBasqueKeys: any = (layoutBasqueEu as any).default;
  layoutEnglishUSKeys: any = (layoutEnglishEnUS as any).default;
  layoutEnglishUKKeys: any = (layoutEnglishEnUK as any).default;
  layoutEnglishIntlKeys: any = (layoutEnglishEnIntl as any).default;
  layoutAngliscKeys: any = (layoutAngliscAng as any).default;
  layoutDutchKeys: any = (layoutDutchNl as any).default;
  layoutItalianKeys: any = (layoutItalianIt as any).default;
  layoutCzechKeys: any = (layoutCzechCs as any).default;
  layoutLithuanianKeys: any = (layoutLithuanianLt as any).default;
  layoutMalteseKeys: any = (layoutMalteseMt as any).default;
  layoutGothicKeys: any = (layoutGothicGoth as any).default;
  layoutAlbanianKeys: any = (layoutAlbanianAlb as any).default;
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
  layoutEgyptianKeys: any = (layoutEgyptianKmt as any).default;
  layoutZihuiKeys: any = (layoutZihuiZih as any).default;
  layoutKoreanKeys: any = (layoutKoreanKo as any).default;
  layoutHebrewKeys: any = (layoutHebrewHe as any).default;
  layoutYiddishKeys: any = (layoutYiddishYid as any).default;
  layoutTotoKeys: any = (layoutTotoToto as any).default;
  layoutMendeKeys: any = (layoutMendeMend as any).default;
  layoutAramaicKeys: any = (layoutAramaicArc as any).default;
  layoutArchaicGreekKeys: any = (layoutArchaicGreekIon as any).default;
  layoutGebaKeys: any = (layoutGebaGeba as any).default;
  layoutSogdianKeys: any = (layoutSogdianSog as any).default;
  layoutKultobeKeys: any = (layoutKultobeKult as any).default;
  layoutSamaritanKeys: any = (layoutSamaritanSamr as any).default;
  layoutKaidaKeys: any = (layoutKaidaKaid as any).default;
  layoutSafaiticKeys: any = (layoutSafaiticSafa as any).default;
  layoutFarsiKeys: any = (layoutFarsiFa as any).default;
  layoutArabicKeys: any = (layoutArabicAr as any).default;
  layoutAjamiKeys: any = (layoutAjamiAjam as any).default;
  layoutSlavonicKeys: any = (layoutSlavonicCyrs as any).default;
  layoutPahlaviKeys: any = (layoutPahlaviPal as any).default;
  layoutParthianKeys: any = (layoutParthianXpr as any).default;
  layoutMandaicKeys: any = (layoutMandaicMand as any).default;
  layoutChorasmianKeys: any = (layoutChorasmianChor as any).default;
  layoutSabaeanKeys: any = (layoutSabaeanXsa as any).default;
  layoutSyriacKeys: any = (layoutSyriacSyrc as any).default;
  layoutSuriyaniKeys: any = (layoutSuriyaniGars as any).default;
  layoutPalmyreneKeys: any = (layoutPalmyrenePalm as any).default;
  layoutElymaicKeys: any = (layoutElymaicElym as any).default;
  layoutAnatolianGlyphKeys: any = (layoutLuwianLuw as any).default;
  layoutHatranKeys: any = (layoutHatranHatr as any).default;
  layoutHanifiKeys: any = (layoutRohingyaRohg as any).default;
  layoutManichaeanKeys: any = (layoutManichaeanMani as any).default;
  layoutNabataeanKeys: any = (layoutNabataeanNbat as any).default;
  layoutPsalterKeys: any = (layoutPsalterPsal as any).default;
  layoutZoulaiKeys: any = (layoutZoulaiZou as any).default;
  layoutNushuKeys: any = (layoutNushuNshu as any).default;
  layoutUgariticKeys: any = (layoutUgariticUgar as any).default;
  layoutMayaGlyphKeys: any = (layoutMayanMaya as any).default;
  layoutYiKeys: any = (layoutNosuYiii as any).default;
  layoutMeroiticGlyphKeys: any = (layoutMeroiticGlyph as any).default;
  layoutMeroiticKeys: any = (layoutMeroiticMero as any).default;
  layoutCuneiformKeys: any = (layoutSumerianSux as any).default;
  layoutBlackfootKeys: any = (layoutBlackfootBla as any).default;
  layoutElamiteKeys: any = (layoutElamiteElam as any).default;
  layoutHittiteKeys: any = (layoutHittiteHit as any).default;
  layoutPersianKeys: any = (layoutPersianXpeo as any).default;
  layoutDemoticKeys: any = (layoutDemoticEgyd as any).default;
  layoutNKoKeys: any = (layoutNKoNKoo as any).default;
  layoutLomaKeys: any = (layoutLomaLoma as any).default;
  layoutYezidiKeys: any = (layoutYezidiYezi as any).default;
  layoutSyriacClassicalKeys: any = (layoutSyriacClassicalEstr as any).default;
  layoutSyriacWesternKeys: any = (layoutSyriacWesternSert as any).default;
  layoutSyriacEasternKeys: any = (layoutSyriacEasternMadn as any).default;
  layoutKhazarianKeys: any = (layoutKhazarianKhaz as any).default;
  layoutSignUSKeys: any = (layoutSignUS as any).default;
  layoutBANZSLKeys: any = (layoutBANZSL as any).default;
  layoutFlagsKeys: any = (layoutFlagsICS as any).default;
  layoutSemaphoreKeys: any = (layoutSemaphoreFlag as any).default;
  layoutMorseKeys: any = (layoutMorseCode as any).default;

  layoutCurrentKeys: any = [];
  
  selectedAllScriptTab : number = 0;
  selectKeysTabs : number = 0;
  showAll : Boolean = true;
  isQwerty : Boolean = false;
  isShiftKeyPress : Boolean = false;
  isTransliterate : Boolean = false;

  panelAbjadState: Boolean = false;
  panelAlphabetState: Boolean = false;
  panelLatinState: Boolean = false;
  panelAbugidaState: Boolean = false;
  panelSyllaberyState: Boolean = false;
  panelGramsState: Boolean = false;

  keysToRotate: Boolean = false;
  enableRotateKeyboard: Boolean = false;
  showImageGlyph: Boolean = true;
  bidiLetters: Boolean = false;
  switchScriptDirection: Boolean = false;
  unicode5AndHigher : Boolean = false;

  prevSwaras : string[] = ['','', '', '', '', '', '', '','', '', '', '', '', '', '','', '', '', '', '', '', '','', '', '', '', '', ''];

  layoutRotatedScript : string[] = ['ogam', 'hira', 'kata', 'vaii', 'phag', 'oira', 'geez', 'dite', 'iba', 'ndju', 'cree', 'inuk', 'galk', 'bla', 'aztc', 'maya'];
  rtlLocales : string[] = ['ar', 'he', 'ur', 'fa', 'syrc', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ku', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'pal', 'xpr', 'xsa', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf', 'chrs', 'elym', 'palm', 'hatr', 'ber', 'mani', 'mer', 'psal', 'kult', 'egyd', 'safa', 'nshu', 'rohg', 'estr', 'sert', 'madn', 'nbat', 'pice', 'gars', 'cprt', 'lepo', 'sabe', 'phyg', 'khaz', 'mero', 'cana', 'sina', 'yezi'];
  boustrophedonScripts: string[] = ['ett', 'sabe', 'maya', 'wole', 'phyg', 'pice', 'asmo', 'sab', 'luw', 'moon', 'sina', 'kmt', 'hung', 'safa', 'xsa', 'egyd', 'avo', 'lepo'];
  imageAlternativeScript: string[] = ['mroo', 'safa', 'hung', 'avo', 'new', 'gup', 'sidd', 'shrd', 'tirh', 'modi', 'pall', 'toch', 'moon', 'tiga', 'elba', 'vith', 'nand', 'kada', 'sog', 'kult', 'estr', 'sert', 'madn', 'cyrs', 'gran', 'udi', 'diak', 'ber', 'mer', 'tach', 'mwan', 'mult', 'maha', 'wole', 'khud', 'moss', 'takr', 'iba', 'khoj', 'komi', 'dogr', 'maya', 'nshu', 'egyd', 'bug', 'renc', 'ahom', 'kuli', 'sina', 'zou', 'cana', 'kaid', 'dham', 'tamu', 'geba', 'prac', 'maka', 'psal', 'palm', 'ndju', 'aztc', 'elym', 'txg', 'mani', 'jiag', 'hatr', 'bada', 'mikq', 'gars', 'dale', 'wolf', 'zag', 'kawi', 'vah', 'loma', 'rohg', 'ion', 'tika', 'mamb', 'land', 'nbat', 'khat', 'sabe', 'dite', 'toto', 'chrs', 'bhai', 'tang', 'zanb', 'wcho', 'maga', 'luo', 'chik', 'adin', 'khom', 'pice', 'khaz', 'yezi', 'ics', 'flag', 'ussign', 'banzsl'];

  fontSize(value: number) {
    return value + ' size';
  }
  cellSize(value: number) {
    if (value >= 1) {
      return value + ' px';
    }
    return value;
  }
  chronoTimeline(value: number) {
    if (value >= -7500) {
      if (value < 0)
        return 'Year ' + Math.abs(value) + ' BC';
      else
        return 'Year ' + value + ' CE';
    }
    return value;
  }

  constructor(private router: Router, private sessionManager: SessionManagerService, private helperDialog: MatDialog) {
    if (localStorage.getItem('qwertyStyle') != undefined) {
      if (localStorage.getItem('qwertyStyle') === 'true')
        this.isQwerty = false;
      else if (localStorage.getItem('qwertyStyle') === 'false')
        this.isQwerty = true;
    }
    if (localStorage.getItem('transliterate') != undefined) {
      if (localStorage.getItem('transliterate') === 'true')
        this.isTransliterate = true;
      else if (localStorage.getItem('transliterate') === 'true')
        this.isTransliterate = false;
    }
    if (window.location.href) {
      this.sessionManager.setInSessionURL(window.location.href.split('/')[3]);
      if (this.layoutRotatedScript.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
        this.enableRotateKeyboard = true;
      } else {
        this.enableRotateKeyboard = false;
      }
      if (this.boustrophedonScripts.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
        this.bidiLetters = true;
        if (this.sessionManager.getFromSessionURL() == 'ett')
          this.renderBiDi(true);
      } else {
        this.bidiLetters = false;
      }
      if (this.imageAlternativeScript.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
        this.unicode5AndHigher = true;
        this.showImageGlyph = true;
      } else {
        this.unicode5AndHigher = false;
        this.showImageGlyph = false;
      }
    }
    /*if (this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]].indexOf("qwerty") == -1) {
      this.sessionManager.setInSessionQwerty(false);
    }*/
  }

  ngOnInit(): void {
    this.sessionManager.itemKeyboardOnly.subscribe((flagValue)=> {
      if (flagValue == true) {
        this.showAll = true;
      } else if(flagValue == false) {
        this.showAll = false;
      }
    });
    this.sessionManager.itemSessionURL.subscribe((keysType) => {
      if (this.layoutRotatedScript.indexOf(keysType) != -1) {
        this.enableRotateKeyboard = true;
      } else {
        this.enableRotateKeyboard = false;
      }
      if (this.boustrophedonScripts.indexOf(keysType) != -1) {
        this.bidiLetters = true;
        if (this.sessionManager.getFromSessionURL() == 'ett')
          this.renderBiDi(true);
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
    });
    // At Initial Load URL Requirement for Keyboard is there and not empty URL
    if (this.sessionManager.getFromSessionURL() != undefined && this.sessionManager.getFromSessionURL() != "") {
      this.selectedAllScriptTab = this.keyboardLayouts[this.sessionManager.getFromSessionURL()][0];
      this.selectKeysTabs = this.keyboardLayouts[this.sessionManager.getFromSessionURL()][1];
      this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
      this.sessionManager.setInSessionOnlyKeyboard(true);
      this.initSwara();
    }

    this.sessionManager.itemQwertyType.subscribe((flagValue)=>{
      this.isQwerty = flagValue;
    });
    this.sessionManager.itemTransliterate.subscribe((flagForTrans) => {
      this.isTransliterate = flagForTrans;
    });
    this.sessionManager.itemShiftKeyPressed.subscribe((flagForShift) => {
      this.isShiftKeyPress = flagForShift;
    });
  }

  ngAfterViewInit(): void {
    this.sessionManager.itemKeyboardOnly.subscribe((flagValue)=> {
      if (flagValue == true) {
        this.allTabGroups.nativeElement.style.display = 'none';
        this.keysAbove.nativeElement.style.display = 'block';
      } else if (flagValue == false) {
        this.keysAbove.nativeElement.style.display = 'none';
        this.allTabGroups.nativeElement.style.display = 'block';
      }
    });
    
    this.sessionManager.itemUILocale.subscribe((locale) => {
      // URL does not have any Keyboard requirement, Default Browser Locale to be used
      if (locale != "" && (this.sessionManager.getFromSessionURL() == undefined || this.sessionManager.getFromSessionURL() == "")) {
        this.selectedAllScriptTab = this.keyboardLayouts[locale][0];
        this.allScriptTypesTabGroup.selectedIndex = Number(this.selectedAllScriptTab);
        this.selectKeysTabs = this.keyboardLayouts[locale][1];
        this.tabGroupAbugida.selectedIndex = Number(this.selectKeysTabs);
        this.layoutCurrentKeys = this[this.keyboardLayouts[locale][3]];
        this.sessionManager.setInSessionURL(this.sessionManager.itemUILocale.value);
      }
      // URL has Keyboard requirement and associate Keyboard & UI Locale
      else if (locale != "" && this.sessionManager.getFromSessionURL() != undefined && this.sessionManager.getFromSessionURL() != "" && locale === this.keyboardLayouts[this.sessionManager.getFromSessionURL()][2] !== undefined && this.sessionManager.itemKeyboardDisassociateLocale.value == true) {
        this.selectedAllScriptTab = this.keyboardLayouts[this.sessionManager.getFromSessionURL()][0];
        this.allScriptTypesTabGroup.selectedIndex = Number(this.selectedAllScriptTab);
        this.selectKeysTabs = this.keyboardLayouts[this.sessionManager.getFromSessionURL()][1];
        this.tabGroupAbugida.selectedIndex = Number(this.selectKeysTabs);
        this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
      }
      // URL session does not have UI Locale and UI & Keyboard change requirement
      else if (locale != "" && this.sessionManager.getFromSessionURL() != "" && this.sessionManager.itemKeyboardDisassociateLocale.value == false) {
        this.selectedAllScriptTab = this.keyboardLayouts[this.sessionManager.itemUILocale.value][0];
        this.allScriptTypesTabGroup.selectedIndex = Number(this.selectedAllScriptTab);
        this.selectKeysTabs = this.keyboardLayouts[this.sessionManager.itemUILocale.value][1];
        this.tabGroupAlphabet.selectedIndex = Number(this.selectKeysTabs);
        this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.itemUILocale.value][3]];
        this.sessionManager.setInSessionURL(this.sessionManager.itemUILocale.value);
      }
      this.initSwara();
    });
  }

  allScriptTypesTabs(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    this.renderBiDi(false);
    this.showImageGlyph = false;
    if (tabChangeEvent.index == 0) {
      this.sessionManager.setInSessionURL('ar');
    } else if (tabChangeEvent.index == 1) {
      this.sessionManager.setInSessionURL('la');
    } else if (tabChangeEvent.index == 2) {
      this.sessionManager.setInSessionURL('brah');
    } else if (tabChangeEvent.index == 3) {
      this.sessionManager.setInSessionURL('ik');
    } else if (tabChangeEvent.index == 4) {
      this.sessionManager.setInSessionURL('zhcn');
    } else if (tabChangeEvent.index == 5) {
      this.sessionManager.setInSessionURL('braille');
    } else if (tabChangeEvent.index == 6) {
      this.sessionManager.setInSessionURL('sign');
    } else if (tabChangeEvent.index == 7) {
      this.sessionManager.setInSessionURL('emo');
    } else if (tabChangeEvent.index == 8) {
      this.sessionManager.setInSessionURL('unclass');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.initSwara();
    this.selectKeysTabs = 0;
  }

  abjadType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    this.showImageGlyph = false;
    if (tabChangeEvent.index == 0 && tabChangeEvent.tab.textLabel == "الكتابة") {
      this.sessionManager.setInSessionURL('ar');
    } else if (tabChangeEvent.index == 1 && tabChangeEvent.tab.textLabel == "אָלֶף־בֵּית") {
      this.sessionManager.setInSessionURL('he');
    } else if (tabChangeEvent.index == 2 && tabChangeEvent.tab.textLabel == "ܐܠܦ ܒܝܬ ܣܘܪܝܝܐ") {
      this.sessionManager.setInSessionURL('syrc');
    } else if (tabChangeEvent.index == 3 && tabChangeEvent.tab.textLabel == "𐡀𐡓𐡌𐡉𐡀") {
      this.sessionManager.setInSessionURL('arc');
    } else if (tabChangeEvent.index == 4 && tabChangeEvent.tab.textLabel == "𐭯𐭠𐭫𐭮𐭩𐭪") {
      this.sessionManager.setInSessionURL('pal');
    } else if (tabChangeEvent.index == 5 && tabChangeEvent.tab.textLabel == "suγδīk") {
      this.sessionManager.setInSessionURL('sog');
    } else if (tabChangeEvent.index == 6 && tabChangeEvent.tab.textLabel == "ࡓࡀࡈࡍࡀ") {
      this.sessionManager.setInSessionURL('mand');
    } else if (tabChangeEvent.index == 7 && tabChangeEvent.tab.textLabel == "Safaitic") {
      this.sessionManager.setInSessionURL('safa');
    } else if (tabChangeEvent.index == 8 && tabChangeEvent.tab.textLabel == "𐩪𐩨𐩱") {
      this.sessionManager.setInSessionURL('xsa');
    } else if (tabChangeEvent.index == 9 && tabChangeEvent.tab.textLabel == "Old Berber") {
      this.sessionManager.setInSessionURL('ber');
    } else if (tabChangeEvent.index == 10 && tabChangeEvent.tab.textLabel == "Khwarezmian") {
      this.sessionManager.setInSessionURL('chrs');
    } else if (tabChangeEvent.index == 11 && tabChangeEvent.tab.textLabel == "Hanifi") {
      this.sessionManager.setInSessionURL('rohg');
    } else if (tabChangeEvent.index == 12 && tabChangeEvent.tab.textLabel == "Old Sinaitic") {
      this.sessionManager.setInSessionURL('sina');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.verifyThisKeyboardHasQwerty();
  }

  allAbjadTypeClicked(scriptCode) {
    this.keysToRotate = false;
    if (this.imageAlternativeScript.indexOf(scriptCode) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
    this.selectedAllScriptTab = this.keyboardLayouts[scriptCode][0];
    this.allScriptTypesTabGroup.selectedIndex = this.selectedAllScriptTab;
    this.selectKeysTabs = this.keyboardLayouts[scriptCode][1];
    this.tabGroupAbjad.selectedIndex = this.selectKeysTabs;
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.sessionManager.setInSessionURL(scriptCode);
    this.panelAbjadState = !this.panelAbjadState;
  }

  alphabetType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    this.showImageGlyph = false;
    if (tabChangeEvent.index == 0 && tabChangeEvent.tab.textLabel == "Latin") {
      this.sessionManager.setInSessionURL('la');
    } else if (tabChangeEvent.index == 1 && tabChangeEvent.tab.textLabel == "Кири́ллица") {
      this.sessionManager.setInSessionURL('ru');
    } else if (tabChangeEvent.index == 2 && tabChangeEvent.tab.textLabel == "Ελληνικά") {
      this.sessionManager.setInSessionURL('el');
    } else if (tabChangeEvent.index == 3 && tabChangeEvent.tab.textLabel == "Հայոց գրեր") {
      this.sessionManager.setInSessionURL('hy');
    } else if (tabChangeEvent.index == 4 && tabChangeEvent.tab.textLabel == "მხედრული") {
      this.sessionManager.setInSessionURL('ka');
    } else if (tabChangeEvent.index == 5 && tabChangeEvent.tab.textLabel == "ⵜⴰⵎⴰⵣⵉⵖⵜ") {
      this.sessionManager.setInSessionURL('tfng');
    } else if (tabChangeEvent.index == 6 && tabChangeEvent.tab.textLabel == "ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ") {
      this.sessionManager.setInSessionURL('mn');
    } else if (tabChangeEvent.index == 7 && tabChangeEvent.tab.textLabel == "한글") {
      this.sessionManager.setInSessionURL('ko');
    } else if (tabChangeEvent.index == 8 && tabChangeEvent.tab.textLabel == "𐎜𐎗𐎟𐎝") {
      this.sessionManager.setInSessionURL('ugar');
    } else if (tabChangeEvent.index == 9 && tabChangeEvent.tab.textLabel == "𐤐𐤕") {
      this.sessionManager.setInSessionURL('phn');
    } else if (tabChangeEvent.index == 10 && tabChangeEvent.tab.textLabel == "ߒߞߏ‎") {
      this.sessionManager.setInSessionURL('nkoo');
    } else if (tabChangeEvent.index == 11 && tabChangeEvent.tab.textLabel == "𐎭𐎠𐎼𐎹𐎺𐎢𐏁") {
      this.sessionManager.setInSessionURL('xpeo');
    } else if (tabChangeEvent.index == 12 && tabChangeEvent.tab.textLabel == "ⲘⲉⲧⲢⲉⲙ̀ⲛⲭⲏⲙⲓ‎") {
      this.sessionManager.setInSessionURL('copt');
    } else if (tabChangeEvent.index == 13 && tabChangeEvent.tab.textLabel == "Ⰳⰾⰰⰳⱁⰾⰹⱌⰰ") {
      this.sessionManager.setInSessionURL('glag');
    } else if (tabChangeEvent.index == 14 && tabChangeEvent.tab.textLabel == "Mru") {
      this.sessionManager.setInSessionURL('mroo');
    } else if (tabChangeEvent.index == 15 && tabChangeEvent.tab.textLabel == "𐤮𐤱𐤠𐤭𐤣𐤶𐤯𐤦𐤳") {
      this.sessionManager.setInSessionURL('lydi');
    } else if (tabChangeEvent.index == 16 && tabChangeEvent.tab.textLabel == "Rovásírás") {
      this.sessionManager.setInSessionURL('hung');
    } else if (tabChangeEvent.index == 17 && tabChangeEvent.tab.textLabel == "𐌉𐌕𐌀𐌋𐌉𐌂") {
      this.sessionManager.setInSessionURL('ital');
    } else if (tabChangeEvent.index == 18 && tabChangeEvent.tab.textLabel == "𐌀𐌍𐌍𐌄𐌔𐌀𐌓") {
      this.sessionManager.setInSessionURL('ett');
    } else if (tabChangeEvent.index == 19 && tabChangeEvent.tab.textLabel == "ᚑᚌᚆᚐᚋ") {
      this.sessionManager.setInSessionURL('ogam');
    } else if (tabChangeEvent.index == 20 && tabChangeEvent.tab.textLabel == "ᚱᚢᚾᛖᛋ") {
      this.sessionManager.setInSessionURL('runr');
    } else if (tabChangeEvent.index == 21 && tabChangeEvent.tab.textLabel == "𐌲𐍉𐌸𐌹𐌺") {
      this.sessionManager.setInSessionURL('goth');
    } else if (tabChangeEvent.index == 22 && tabChangeEvent.tab.textLabel == "𐒋𐒘𐒈𐒑𐒛𐒒𐒕𐒀") {
      this.sessionManager.setInSessionURL('osma');
    } else if (tabChangeEvent.index == 23 && tabChangeEvent.tab.textLabel == "ᱥᱟᱱᱛᱟᱲᱤ") {
      this.sessionManager.setInSessionURL('olck');
    } else if (tabChangeEvent.index == 24 && tabChangeEvent.tab.textLabel == "𐊢𐊠𐊥𐊹𐊠") {
      this.sessionManager.setInSessionURL('cari');
    } else if (tabChangeEvent.index == 25 && tabChangeEvent.tab.textLabel == "𐊗𐊕𐊐𐊎𐊆𐊖") {
      this.sessionManager.setInSessionURL('lyci');
    } else if (tabChangeEvent.index == 26 && tabChangeEvent.tab.textLabel == "Elbasan") {
      this.sessionManager.setInSessionURL('elba');
    } else if (tabChangeEvent.index == 27 && tabChangeEvent.tab.textLabel == "𐬀𐬬𐬯𐬙𐬁𐬥") {
      this.sessionManager.setInSessionURL('avst');
    } else if (tabChangeEvent.index == 28 && tabChangeEvent.tab.textLabel == "𐓏𐓘𐓻𐓘𐓻𐓟 𐒻𐓟") {
      this.sessionManager.setInSessionURL('osge');
    } else if (tabChangeEvent.index == 29 && tabChangeEvent.tab.textLabel == "𞤀𞤣𞤤𞤢𞤥") {
      this.sessionManager.setInSessionURL('adlm');
    } else if (tabChangeEvent.index == 30 && tabChangeEvent.tab.textLabel == "Wolof") {
      this.sessionManager.setInSessionURL('wolf');
    } else if (tabChangeEvent.index == 31 && tabChangeEvent.tab.textLabel == "Sora") {
      this.sessionManager.setInSessionURL('sora');
    } else if (tabChangeEvent.index == 32 && tabChangeEvent.tab.textLabel == "Bassa-Vah") {
      this.sessionManager.setInSessionURL('vah');
    } else if (tabChangeEvent.index == 33 && tabChangeEvent.tab.textLabel == "Mandombe") {
      this.sessionManager.setInSessionURL('mamb');
    } else if (tabChangeEvent.index == 34 && tabChangeEvent.tab.textLabel == "Zaghawa") {
      this.sessionManager.setInSessionURL('zag');
    } else if (tabChangeEvent.index == 35 && tabChangeEvent.tab.textLabel == "Baburi") {
      this.sessionManager.setInSessionURL('khat');
    } else if (tabChangeEvent.index == 36 && tabChangeEvent.tab.textLabel == "Luo") {
      this.sessionManager.setInSessionURL('luo');
    } else if (tabChangeEvent.index == 37 && tabChangeEvent.tab.textLabel == "Tokbirim") {
      this.sessionManager.setInSessionURL('chik');
    } else if (tabChangeEvent.index == 38 && tabChangeEvent.tab.textLabel == "Adinkra") {
      this.sessionManager.setInSessionURL('adin');
    } else if (tabChangeEvent.index == 39 && tabChangeEvent.tab.textLabel == "Khazarian") {
      this.sessionManager.setInSessionURL('khaz');
    } else if (tabChangeEvent.index == 40 && tabChangeEvent.tab.textLabel == "Yezidi") {
      this.sessionManager.setInSessionURL('yezi');
    } else if (tabChangeEvent.index == 41 && tabChangeEvent.tab.textLabel == "Wancho") {
      this.sessionManager.setInSessionURL('wcho');
    } else if (tabChangeEvent.index == 42 && tabChangeEvent.tab.textLabel == "Old Udi") {
      this.sessionManager.setInSessionURL('udi');
    } else if (tabChangeEvent.index == 43 && tabChangeEvent.tab.textLabel == "Old Canaanite") {
      this.sessionManager.setInSessionURL('cana');
    } else if (tabChangeEvent.index == 44 && tabChangeEvent.tab.textLabel == "Zoulai") {
      this.sessionManager.setInSessionURL('zou');
    } else if (tabChangeEvent.index == 45 && tabChangeEvent.tab.textLabel == "СЛОВѢНЬСКА") {
      this.sessionManager.setInSessionURL('cyrs');
    } else if (tabChangeEvent.index == 46 && tabChangeEvent.tab.textLabel == "তোতো") {
      this.sessionManager.setInSessionURL('toto');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.verifyThisKeyboardHasQwerty();
  }

  allAlphabetTypeClicked(scriptCode) {
    this.keysToRotate = false;
    if (this.imageAlternativeScript.indexOf(scriptCode) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
    this.selectedAllScriptTab = this.keyboardLayouts[scriptCode][0];
    this.allScriptTypesTabGroup.selectedIndex = this.selectedAllScriptTab;
    this.selectKeysTabs = this.keyboardLayouts[scriptCode][1];
    this.tabGroupAlphabet.selectedIndex = this.selectKeysTabs;
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.sessionManager.setInSessionURL(scriptCode);
    this.panelAlphabetState = !this.panelAlphabetState;
  }

  abugidaType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    this.showImageGlyph = false;
    this.resetSwara();
    if (tabChangeEvent.index == 0 && tabChangeEvent.tab.textLabel == "𑀩𑁆𑀭𑀸𑀳𑁆𑀫𑀻𑀮𑀺𑀧𑀺") {
      this.sessionManager.setInSessionURL('brah');
    } else if (tabChangeEvent.index == 1 && tabChangeEvent.tab.textLabel == "देवनागरी") {
      this.sessionManager.setInSessionURL('sa');
    } else if (tabChangeEvent.index == 2 && tabChangeEvent.tab.textLabel == "ಕನ್ನಡ") {
      this.sessionManager.setInSessionURL('kn');
    } else if (tabChangeEvent.index == 3 && tabChangeEvent.tab.textLabel == "తెలుగు") {
      this.sessionManager.setInSessionURL('te');
    } else if (tabChangeEvent.index == 4 && tabChangeEvent.tab.textLabel == "தமிழ்") {
      this.sessionManager.setInSessionURL('ta');
    } else if (tabChangeEvent.index == 5 && tabChangeEvent.tab.textLabel == "മലയാളലിപി") {
      this.sessionManager.setInSessionURL('ml');
    } else if (tabChangeEvent.index == 6 && tabChangeEvent.tab.textLabel == "ਗੁਰਮੁਖੀ") {
      this.sessionManager.setInSessionURL('pa');
    } else if (tabChangeEvent.index == 7 && tabChangeEvent.tab.textLabel == "ગુજરાતી") {
      this.sessionManager.setInSessionURL('gu');
    } else if (tabChangeEvent.index == 8 && tabChangeEvent.tab.textLabel == "ଓଡ଼ିଆ") {
      this.sessionManager.setInSessionURL('or');
    } else if (tabChangeEvent.index == 9 && tabChangeEvent.tab.textLabel == "মৈথিনী") {
      this.sessionManager.setInSessionURL('tirh');
    } else if (tabChangeEvent.index == 10 && tabChangeEvent.tab.textLabel == "বাংলা") {
      this.sessionManager.setInSessionURL('bn');
    } else if (tabChangeEvent.index == 11 && tabChangeEvent.tab.textLabel == "ꯃꯤꯇꯩꯂꯣꯟ") {
      this.sessionManager.setInSessionURL('mni');
    } else if (tabChangeEvent.index == 12 && tabChangeEvent.tab.textLabel == "සිංහල") {
      this.sessionManager.setInSessionURL('sinh');
    } else if (tabChangeEvent.index == 13 && tabChangeEvent.tab.textLabel == "Newar") {
      this.sessionManager.setInSessionURL('new');
    } else if (tabChangeEvent.index == 14 && tabChangeEvent.tab.textLabel == "རྫོང་ཁ") {
      this.sessionManager.setInSessionURL('tibt');
    } else if (tabChangeEvent.index == 15 && tabChangeEvent.tab.textLabel == "ግዕዝ") {
      this.sessionManager.setInSessionURL('geez');
    } else if (tabChangeEvent.index == 16 && tabChangeEvent.tab.textLabel == "ภาษาไทย") {
      this.sessionManager.setInSessionURL('th');
    } else if (tabChangeEvent.index == 17 && tabChangeEvent.tab.textLabel == "ພາສາລາວ") {
      this.sessionManager.setInSessionURL('lo');
    } else if (tabChangeEvent.index == 18 && tabChangeEvent.tab.textLabel == "ភាសាខ្មែរ") {
      this.sessionManager.setInSessionURL('km');
    } else if (tabChangeEvent.index == 19 && tabChangeEvent.tab.textLabel == "ᨅᨔ ᨕᨘᨁᨗ") {
      this.sessionManager.setInSessionURL('bug');
    } else if (tabChangeEvent.index == 20 && tabChangeEvent.tab.textLabel == "ތާނަ") {
      this.sessionManager.setInSessionURL('thaa');
    } else if (tabChangeEvent.index == 21 && tabChangeEvent.tab.textLabel == "Hmong") {
      this.sessionManager.setInSessionURL('hmn');
    } else if (tabChangeEvent.index == 22 && tabChangeEvent.tab.textLabel == "မြန်မာစာ") {
      this.sessionManager.setInSessionURL('my');
    } else if (tabChangeEvent.index == 23 && tabChangeEvent.tab.textLabel == "ꦧꦱꦗꦮ") {
      this.sessionManager.setInSessionURL('jv');
    } else if (tabChangeEvent.index == 24 && tabChangeEvent.tab.textLabel == "ᜊᜌ᜔ᜊᜌᜒᜈ᜔") {
      this.sessionManager.setInSessionURL('tglg');
    } else if (tabChangeEvent.index == 25 && tabChangeEvent.tab.textLabel == "ᬪᬵᬱᬩᬮᬶ") {
      this.sessionManager.setInSessionURL('bali');
    } else if (tabChangeEvent.index == 26 && tabChangeEvent.tab.textLabel == "ꡏꡡꡃ ꡢꡡꡙ ꡁꡦ ꡙꡦ") {
      this.sessionManager.setInSessionURL('phag');
    } else if (tabChangeEvent.index == 27 && tabChangeEvent.tab.textLabel == "Pallava") {
      this.sessionManager.setInSessionURL('pall');
    } else if (tabChangeEvent.index == 28 && tabChangeEvent.tab.textLabel == "𐦨𐦡𐦫𐦣𐦢𐦶𐦡") {
      this.sessionManager.setInSessionURL('mero');
    } else if (tabChangeEvent.index == 29 && tabChangeEvent.tab.textLabel == "Kulitan") {
      this.sessionManager.setInSessionURL('kuli');
    } else if (tabChangeEvent.index == 30 && tabChangeEvent.tab.textLabel == "ᥖᥭᥰᥖᥬᥳᥑᥨᥒᥰ") {
      this.sessionManager.setInSessionURL('tdd');
    } else if (tabChangeEvent.index == 31 && tabChangeEvent.tab.textLabel == "ᯅᯖᯂ᯲") {
      this.sessionManager.setInSessionURL('btk');
    } else if (tabChangeEvent.index == 32 && tabChangeEvent.tab.textLabel == "ᜱᜨᜳᜨᜳᜢ") {
      this.sessionManager.setInSessionURL('hano');
    } else if (tabChangeEvent.index == 33 && tabChangeEvent.tab.textLabel == "ᝦᝪᝯ") {
      this.sessionManager.setInSessionURL('tagb');
    } else if (tabChangeEvent.index == 34 && tabChangeEvent.tab.textLabel == "𐱅𐰭𐰼𐰃") {
      this.sessionManager.setInSessionURL('onkh');
    } else if (tabChangeEvent.index == 35 && tabChangeEvent.tab.textLabel == "Dogri") {
      this.sessionManager.setInSessionURL('dogr');
    } else if (tabChangeEvent.index == 36 && tabChangeEvent.tab.textLabel == "ᨲ᩠ᩅᩫᨾᩮᩥᩬᨦ") {
      this.sessionManager.setInSessionURL('lana');
    } else if (tabChangeEvent.index == 37 && tabChangeEvent.tab.textLabel == "Grantha") {
      this.sessionManager.setInSessionURL('gran');
    } else if (tabChangeEvent.index == 38 && tabChangeEvent.tab.textLabel == "Kadamba") {
      this.sessionManager.setInSessionURL('kada');
    } else if (tabChangeEvent.index == 39 && tabChangeEvent.tab.textLabel == "ꦏꦮꦶ") {
      this.sessionManager.setInSessionURL('kawi');
    } else if (tabChangeEvent.index == 40 && tabChangeEvent.tab.textLabel == "𐨑𐨪𐨆𐨮𐨿𐨛𐨁𐨌") {
      this.sessionManager.setInSessionURL('khar');
    } else if (tabChangeEvent.index == 41 && tabChangeEvent.tab.textLabel == "Tocharian") {
      this.sessionManager.setInSessionURL('toch');
    } else if (tabChangeEvent.index == 42 && tabChangeEvent.tab.textLabel == "Modi") {
      this.sessionManager.setInSessionURL('modi');
    } else if (tabChangeEvent.index == 43 && tabChangeEvent.tab.textLabel == "Sharada") {
      this.sessionManager.setInSessionURL('shrd');
    } else if (tabChangeEvent.index == 44 && tabChangeEvent.tab.textLabel == "Siddam") {
      this.sessionManager.setInSessionURL('sidd');
    } else if (tabChangeEvent.index == 45 && tabChangeEvent.tab.textLabel == "𑄌𑄋𑄴𑄟𑄳𑄦 𑄞𑄌𑄴") {
      this.sessionManager.setInSessionURL('cakm');
    } else if (tabChangeEvent.index == 46 && tabChangeEvent.tab.textLabel == "ᰛᰩᰴ") {
      this.sessionManager.setInSessionURL('lepc');
    } else if (tabChangeEvent.index == 47 && tabChangeEvent.tab.textLabel == "ꤊꤢ꤬ꤛꤢ꤭ ꤜꤟꤤ꤬") {
      this.sessionManager.setInSessionURL('kali');
    } else if (tabChangeEvent.index == 48 && tabChangeEvent.tab.textLabel == "ᮞᮥᮔ᮪ᮓ") {
      this.sessionManager.setInSessionURL('sund');
    } else if (tabChangeEvent.index == 49 && tabChangeEvent.tab.textLabel == "ᤕᤠᤰᤌᤢᤱ ᤐᤠᤴ") {
      this.sessionManager.setInSessionURL('limb');
    } else if (tabChangeEvent.index == 50 && tabChangeEvent.tab.textLabel == "ꨌꩌ") {
      this.sessionManager.setInSessionURL('cham');
    } else if (tabChangeEvent.index == 51 && tabChangeEvent.tab.textLabel == "Multani") {
      this.sessionManager.setInSessionURL('mult');
    } else if (tabChangeEvent.index == 52 && tabChangeEvent.tab.textLabel == "Mahajani") {
      this.sessionManager.setInSessionURL('maha');
    } else if (tabChangeEvent.index == 53 && tabChangeEvent.tab.textLabel == "Takri") {
      this.sessionManager.setInSessionURL('takr');
    } else if (tabChangeEvent.index == 54 && tabChangeEvent.tab.textLabel == "Khojki") {
      this.sessionManager.setInSessionURL('khoj');
    } else if (tabChangeEvent.index == 55 && tabChangeEvent.tab.textLabel == "Khudawadi") {
      this.sessionManager.setInSessionURL('khud');
    } else if (tabChangeEvent.index == 56 && tabChangeEvent.tab.textLabel == "Mwangwego") {
      this.sessionManager.setInSessionURL('mwan');
    } else if (tabChangeEvent.index == 57 && tabChangeEvent.tab.textLabel == "Rencong") {
      this.sessionManager.setInSessionURL('renc');
    } else if (tabChangeEvent.index == 58 && tabChangeEvent.tab.textLabel == "Ahom") {
      this.sessionManager.setInSessionURL('ahom');
    } else if (tabChangeEvent.index == 59 && tabChangeEvent.tab.textLabel == "Khimhun") {
      this.sessionManager.setInSessionURL('tang');
    } else if (tabChangeEvent.index == 60 && tabChangeEvent.tab.textLabel == "Zanabazar") {
      this.sessionManager.setInSessionURL('zanb');
    } else if (tabChangeEvent.index == 61 && tabChangeEvent.tab.textLabel == "Tanchangya") {
      this.sessionManager.setInSessionURL('tach');
    } else if (tabChangeEvent.index == 62 && tabChangeEvent.tab.textLabel == "Bhaiksuki") {
      this.sessionManager.setInSessionURL('bhai');
    } else if (tabChangeEvent.index == 63 && tabChangeEvent.tab.textLabel == "Dham") {
      this.sessionManager.setInSessionURL('dham');
    } else if (tabChangeEvent.index == 64 && tabChangeEvent.tab.textLabel == "Pracalit") {
      this.sessionManager.setInSessionURL('prac');
    } else if (tabChangeEvent.index == 65 && tabChangeEvent.tab.textLabel == "Laṇḍā") {
      this.sessionManager.setInSessionURL('land');
    } else if (tabChangeEvent.index == 66 && tabChangeEvent.tab.textLabel == "Tikamuli") {
      this.sessionManager.setInSessionURL('tika');
    } else if (tabChangeEvent.index == 67 && tabChangeEvent.tab.textLabel == "Khema") {
      this.sessionManager.setInSessionURL('tamu');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.initSwara();
    this.verifyThisKeyboardHasQwerty();
  }

  allAbugidaTypeClicked(scriptCode) {
    this.keysToRotate = false;
    if (this.imageAlternativeScript.indexOf(scriptCode) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
    this.selectedAllScriptTab = this.keyboardLayouts[scriptCode][0];
    this.allScriptTypesTabGroup.selectedIndex = this.selectedAllScriptTab;
    this.selectKeysTabs = this.keyboardLayouts[scriptCode][1];
    this.tabGroupAbugida.selectedIndex = this.selectKeysTabs;
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.sessionManager.setInSessionURL(scriptCode);
    this.initSwara();
    this.panelAbugidaState = !this.panelAbugidaState;
  }

  syllaberyType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    this.showImageGlyph = false;
    if (tabChangeEvent.index == 0 && tabChangeEvent.tab.textLabel == "ᐃᓄᒃᑎᑐᑦ") {
      this.sessionManager.setInSessionURL('sy');
    } else if (tabChangeEvent.index == 1 && tabChangeEvent.tab.textLabel == "ひらがな") {
      this.sessionManager.setInSessionURL('hira');
    } else if (tabChangeEvent.index == 2 && tabChangeEvent.tab.textLabel == "カタカナ") {
      this.sessionManager.setInSessionURL('kata');
    } else if (tabChangeEvent.index == 3 && tabChangeEvent.tab.textLabel == "ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ") {
      this.sessionManager.setInSessionURL('cher');
    } else if (tabChangeEvent.index == 4 && tabChangeEvent.tab.textLabel == "ꆈꌠ꒿") {
      this.sessionManager.setInSessionURL('yiii');
    } else if (tabChangeEvent.index == 6 && tabChangeEvent.tab.textLabel == "ꕙꔤ") {
      this.sessionManager.setInSessionURL('vaii');
    } else if (tabChangeEvent.index == 8 && tabChangeEvent.tab.textLabel == "女书") {
      this.sessionManager.setInSessionURL('nshu');
    } else if (tabChangeEvent.index == 9 && tabChangeEvent.tab.textLabel == "𞠀𞠁𞠂") {
      this.sessionManager.setInSessionURL('mend');
    } else if (tabChangeEvent.index == 10 && tabChangeEvent.tab.textLabel == "Loma") {
      this.sessionManager.setInSessionURL('loma');
    } else if (tabChangeEvent.index == 13 && tabChangeEvent.tab.textLabel == "Iban") {
      this.sessionManager.setInSessionURL('iba');
    } else if (tabChangeEvent.index == 16 && tabChangeEvent.tab.textLabel == "Woleai") {
      this.sessionManager.setInSessionURL('wole');
    } else if (tabChangeEvent.index == 17 && tabChangeEvent.tab.textLabel == "ꚠꚡꚢꚣ") {
      this.sessionManager.setInSessionURL('bamu');
    } else if (tabChangeEvent.index == 18 && tabChangeEvent.tab.textLabel == "Afaka") {
      this.sessionManager.setInSessionURL('ndju');
    } else if (tabChangeEvent.index == 19 && tabChangeEvent.tab.textLabel == "𐀀𐀁𐀂𐀃𐀄") {
      this.sessionManager.setInSessionURL('linb');
    } else if (tabChangeEvent.index == 20 && tabChangeEvent.tab.textLabel == "𐠁𐠀𐠂𐠃𐠄") {
      this.sessionManager.setInSessionURL('cprt');
    } else if (tabChangeEvent.index == 22 && tabChangeEvent.tab.textLabel == "ᓱᖽᐧᖿ") {
      this.sessionManager.setInSessionURL('bla');
    } else if (tabChangeEvent.index == 23 && tabChangeEvent.tab.textLabel == "Ditema") {
      this.sessionManager.setInSessionURL('dite');
    } else if (tabChangeEvent.index == 24 && tabChangeEvent.tab.textLabel == "Khom") {
      this.sessionManager.setInSessionURL('khom');
    } else if (tabChangeEvent.index == 25 && tabChangeEvent.tab.textLabel == "Mossang") {
      this.sessionManager.setInSessionURL('moss');
    } else if (tabChangeEvent.index == 26 && tabChangeEvent.tab.textLabel == "Maya") {
      this.sessionManager.setInSessionURL('maya');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.verifyThisKeyboardHasQwerty();
  }

  allSyllaberyTypeClicked(scriptCode) {
    this.keysToRotate = false;
    if (this.imageAlternativeScript.indexOf(scriptCode) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
    this.selectedAllScriptTab = this.keyboardLayouts[scriptCode][0];
    this.allScriptTypesTabGroup.selectedIndex = this.selectedAllScriptTab;
    this.selectKeysTabs = this.keyboardLayouts[scriptCode][1];
    this.tabGroupSyllabery.selectedIndex = this.selectKeysTabs;
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.sessionManager.setInSessionURL(scriptCode);
    this.panelSyllaberyState = !this.panelSyllaberyState;
  }

  gramsType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    this.showImageGlyph = false;
    if (tabChangeEvent.index == 0 && tabChangeEvent.tab.textLabel == "汉语") {
      this.sessionManager.setInSessionURL('zhcn');
    } else if (tabChangeEvent.index == 1 && tabChangeEvent.tab.textLabel == "漢語") {
      this.sessionManager.setInSessionURL('zhtw');
    } else if (tabChangeEvent.index == 2 && tabChangeEvent.tab.textLabel == "日本語") {
      this.sessionManager.setInSessionURL('ja');
    } else if (tabChangeEvent.index == 3 && tabChangeEvent.tab.textLabel == "𒅴𒂠") {
      this.sessionManager.setInSessionURL('sux');
    } else if (tabChangeEvent.index == 4 && tabChangeEvent.tab.textLabel == "𓆎𓅓𓏏𓊖") {
      this.sessionManager.setInSessionURL('kmt');
    } else if (tabChangeEvent.index == 5 && tabChangeEvent.tab.textLabel == "Meroïtic") {
      this.sessionManager.setInSessionURL('mer');
    } else if (tabChangeEvent.index == 6 && tabChangeEvent.tab.textLabel == "Luwian") {
      this.sessionManager.setInSessionURL('luw');
    } else if (tabChangeEvent.index == 9 && tabChangeEvent.tab.textLabel == "Tangut") {
      this.sessionManager.setInSessionURL('txg');
    } else if (tabChangeEvent.index == 11 && tabChangeEvent.tab.textLabel == "Geba") {
      this.sessionManager.setInSessionURL('geba');
    } else if (tabChangeEvent.index == 16 && tabChangeEvent.tab.textLabel == "Aztec") {
      this.sessionManager.setInSessionURL('aztc');
    } else if (tabChangeEvent.index == 18 && tabChangeEvent.tab.textLabel == "甲骨文") {
      this.sessionManager.setInSessionURL('jiag');
    } else if (tabChangeEvent.index == 21 && tabChangeEvent.tab.textLabel == "カイダ") {
      this.sessionManager.setInSessionURL('kaid');
    } else if (tabChangeEvent.index == 22 && tabChangeEvent.tab.textLabel == "Mi’kmaq") {
      this.sessionManager.setInSessionURL('mikq');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.verifyThisKeyboardHasQwerty();
  }

  allGramTypeClicked(scriptCode) {
    this.keysToRotate = false;
    if (this.imageAlternativeScript.indexOf(scriptCode) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
    this.selectedAllScriptTab = this.keyboardLayouts[scriptCode][0];
    this.allScriptTypesTabGroup.selectedIndex = this.selectedAllScriptTab;
    this.selectKeysTabs = this.keyboardLayouts[scriptCode][1];
    this.tabGroupGrams.selectedIndex = this.selectKeysTabs;
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.sessionManager.setInSessionURL(scriptCode);
    this.panelGramsState = !this.panelGramsState;
  }

  keyPressed(element, value, action, type) {
    if (action === "shift") {
      if (this.sessionManager.itemShiftKeyPressed.value == false)
        this.sessionManager.setShiftKeyPressed(true);
      else if (this.sessionManager.itemShiftKeyPressed.value == true)
        this.sessionManager.setShiftKeyPressed(false);
    } else if (action === "enter") {
      this.resetSwara();
      this.sessionManager.setElementForCharacterSelection(element);
      this.sessionManager.setCharFromKeyboard(value + "<br/>");
      this.sessionManager.setActionFromKeyboard(action);
    } else if (action === "char" && value === "\u00A0") {
      this.resetSwara();
      this.sessionManager.setCharFromKeyboard("");
    } else if (action === "space" && value === "\u00A0") {
      this.resetSwara();
      this.sessionManager.setCharFromKeyboard(value + " ");
    } else if (type == "vyanjana") {
      // Reload Keyboard with Swara places as a combination of the selected Vyanjana
      if (!this.isQwerty) {
        // Loop through all elements
        for (let j in this.layoutCurrentKeys[1].row) {
          if (this.layoutCurrentKeys[1].row[j].type === "swara") {
            if (this.prevSwaras[j] == '') 
              this.prevSwaras[j] = this.layoutCurrentKeys[1].row[j].value;
            this.layoutCurrentKeys[1].row[j].value = value + this.prevSwaras[j];
          }
        }
      }
      this.sessionManager.setElementForCharacterSelection(element);
      this.sessionManager.setCharFromKeyboard(value);
      this.sessionManager.setActionFromKeyboard(action);
    } else {
      this.resetSwara();
      if (this.sessionManager.itemSessionURL.value == "braille") {
        value = value.split(' ')[1];
      }
      this.sessionManager.setElementForCharacterSelection(element);
      this.sessionManager.setCharFromKeyboard(value);
      this.sessionManager.setActionFromKeyboard(action);
    }
  }

  orientKeyboard(){
    this.keysToRotate = !this.keysToRotate;
  }

  renderBiDi(direction) {
    this.switchScriptDirection = direction;
  }
  
  initSwara() {
    if (this.layoutCurrentKeys) {
      for (let j in this.layoutCurrentKeys[1].row) {
        if (this.layoutCurrentKeys[1].row[j].type === "swara")
          this.prevSwaras[j] = this.layoutCurrentKeys[1].row[j].value;
      }
    }
  }

  resetSwara() {
    if (!this.isQwerty) {
      // Loop through all elements
      for (let j in this.layoutCurrentKeys[1].row) {
        if (this.layoutCurrentKeys[1].row[j].type === "swara" && this.prevSwaras[j] != '') {
          this.layoutCurrentKeys[1].row[j].value = this.prevSwaras[j];
        }
      }
    }
  }

  verifyThisKeyboardHasQwerty() {
    if (this.layoutCurrentKeys.indexOf("qwerty") == -1)
      this.sessionManager.setInSessionQwerty(false);
  }

  languageScriptClicked(code) {
    this.keysToRotate = false;
    this.renderBiDi(false);
    this.panelLatinState = false;
    this.layoutCurrentKeys = this[this.keyboardLayouts[code][3]];
    this.sessionManager.setInSessionURL(code);
    this.initSwara();
    if (this.imageAlternativeScript.indexOf(code) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
  }

  toggleGlyphShow() {
    this.showImageGlyph = !this.showImageGlyph;
  }

  openSettings() {
    if (this.sessionManager.itemKeyboardOnly.value == false)
      this.sessionManager.setInSessionOnlyKeyboard(true);
    else if (this.sessionManager.itemKeyboardOnly.value == true)
      this.sessionManager.setInSessionOnlyKeyboard(false);
  }

  helpForUser() {
    const dialogProfile = this.helperDialog.open(this.HelperPopUp, {
      width: '70%'
    });

    dialogProfile.afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed - ', result);
      }
    );
  }

}
