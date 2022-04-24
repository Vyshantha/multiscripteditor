import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, EventEmitter, Output, Input, NgZone, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';

import "ol/ol.css";
import {View, Feature, Map, Overlay } from 'ol';
import {Coordinate} from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
import proj4 from 'proj4';
import Projection from 'ol/proj/Projection';
import {register}  from 'ol/proj/proj4';
import {get as GetProjection} from 'ol/proj';
import {Extent} from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import { fromLonLat } from 'ol/proj';
import OSM, {ATTRIBUTION} from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import { HelperComponent } from '../helper/helper.component';
import { CustomiseKeyboardsComponent } from '../customise-keyboards/customise-keyboards.component';

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
import * as layoutTsongaTso from './../../assets/keyboard-layouts/layout-tsonga-tso.json';
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
import * as layoutPortuguesePt from './../../assets/keyboard-layouts/layout-portuguese-pt.json';
import * as layoutPortuguesePtBR from './../../assets/keyboard-layouts/layout-portuguese-ptbr.json';
import * as layoutSwedishSv from './../../assets/keyboard-layouts/layout-swedish-sv.json';
import * as layoutSesotholeboaSt from './../../assets/keyboard-layouts/layout-sesotholeboa-st.json';
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
import * as layoutChokweCjk from './../../assets/keyboard-layouts/layout-chokwe-cjk.json';
import * as layoutMaltoMalt from './../../assets/keyboard-layouts/layout-malto-malt.json';
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
import * as layoutSundaneseSun from './../../assets/keyboard-layouts/layout-sundanese-sun.json';
import * as layoutCebuanoCeb from './../../assets/keyboard-layouts/layout-cebuano-ceb.json';
import * as layoutAfricaIai from './../../assets/keyboard-layouts/layout-africa-iai.json';
import * as layoutPinyinPin from './../../assets/keyboard-layouts/layout-pinyin-pin.json';
import * as layoutLomaLoma from './../../assets/keyboard-layouts/layout-loma-loma.json';
import * as layoutNihongoJpn from './../../assets/keyboard-layouts/layout-nihongo-jpn.json';
import * as layoutAoNjo from './../../assets/keyboard-layouts/layout-ao-njo.json';
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
import * as layoutKhitanKits from './../../assets/keyboard-layouts/layout-khitans-kits.json';
import * as layoutKhitanKitl from './../../assets/keyboard-layouts/layout-khitanl-kitl.json';
import * as layoutNubianOnw from './../../assets/keyboard-layouts/layout-nubian-onw.json';
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
import * as layoutSignUS from './../../assets/keyboard-layouts/layout-fingers-ussign.json';
import * as layoutBANZSL from './../../assets/keyboard-layouts/layout-fingers-banzsl.json';
import * as layoutNaskapiNask from './../../assets/keyboard-layouts/layout-naskapi-nask.json';
import * as layoutCarrierCarr from './../../assets/keyboard-layouts/layout-carrier-carr.json';
import * as layoutOjibweOji from './../../assets/keyboard-layouts/layout-ojibwe-oji.json';
import * as layoutDesiSign from './../../assets/keyboard-layouts/layout-fingers-desisign.json';
import * as layoutNsibidiNsi from './../../assets/keyboard-layouts/layout-nsibidi-nsi.json';
import * as layoutSignWritingSgnw from './../../assets/keyboard-layouts/layout-signwriting-sgnw.json';
import * as layoutBharatiBrailleBharati from './../../assets/keyboard-layouts/layout-bharatibraille-bharati.json';
import * as layoutFlagsICS from './../../assets/keyboard-layouts/layout-flags-ics.json';
import * as layoutSemaphoreFlag from './../../assets/keyboard-layouts/layout-semaphore-flag.json';
import * as layoutMorseCode from './../../assets/keyboard-layouts/layout-code-morse.json';

import { SessionManagerService } from '../core/services/session-manager.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import Vector from 'ol/source/Vector';

export interface AvailableWordSuggestions {
  words: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-keyboard-layouts',
  templateUrl: './keyboard-layouts.component.html',
  styleUrls: ['./keyboard-layouts.component.scss']
})
export class KeyboardLayoutsComponent implements OnInit, AfterViewInit {

  @ViewChild('allScriptsTabs') allTabGroups : ElementRef;
  @ViewChild('onlyKeyboard') keysAbove : ElementRef;
  @ViewChild('typeIntellisense') suggestionField : ElementRef;

  @ViewChild('scriptTypesTabAll') allScriptTypesTabGroup: MatTabGroup;
  @ViewChild('scriptAbjadType') tabGroupAbjad: MatTabGroup;
  @ViewChild('scriptAlphabetType') tabGroupAlphabet: MatTabGroup;
  @ViewChild('scriptAbugidaType') tabGroupAbugida: MatTabGroup;
  @ViewChild('scriptSyllaberyType') tabGroupSyllabery: MatTabGroup;
  @ViewChild('scriptGramsType') tabGroupGrams: MatTabGroup;
  @ViewChild('scriptUnclassifiedType') tabGroupUnclassified: MatTabGroup;

  @ViewChild('searchAbjad') abjadSearchField: ElementRef;
  @ViewChild('searchAlphabet') alphabetSearchField: ElementRef; 
  @ViewChild('searchLatin') latinSearchField: ElementRef;
  @ViewChild('searchAbugida') abugidaSearchField: ElementRef;
  @ViewChild('searchSyllabery') syllaberySearchField: ElementRef;
  @ViewChild('searchGrams') gramsSearchField: ElementRef;
  @ViewChild('searchUnclassified') unclassifiedSearchField: ElementRef;

  HelperPopUp: any = HelperComponent;
  CustomKeyboardPopUp: any = CustomiseKeyboardsComponent;

  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;

  keyboardLayouts: any = (allLayoutPositions as any).default;
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
  layoutTsongaKeys: any = (layoutTsongaTso as any).default;
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
  layoutPortugueseKeys: any = (layoutPortuguesePt as any).default;
  layoutPortugueseBRKeys: any = (layoutPortuguesePtBR as any).default;
  layoutSwedishKeys: any = (layoutSwedishSv as any).default;
  layoutSesotholeboaKeys: any = (layoutSesotholeboaSt as any).default;
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
  layoutVietnameseKeys: any = (layoutVietnameseVi as any).default;
  layoutYorubaBjKeys: any = (layoutYorubaBjYo as any).default;
  layoutYorubaNgKeys: any = (layoutYorubaNgYo as any).default;
  layoutWolofLaKeys: any = (layoutWolofWo as any).default;
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
  layoutChokweKeys: any = (layoutChokweCjk as any).default;
  layoutMaltoKeys: any = (layoutMaltoMalt as any).default;
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
  layoutSundaKeys: any = (layoutSundaneseSun as any).default;
  layoutCebuanoKeys: any = (layoutCebuanoCeb as any).default;
  layoutAfricaKeys: any = (layoutAfricaIai as any).default;
  layoutPinyinKeys: any = (layoutPinyinPin as any).default;
  layoutLomaKeys: any = (layoutLomaLoma as any).default;
  layoutNihongoKeys: any = (layoutNihongoJpn as any).default;
  layoutAoKeys: any = (layoutAoNjo as any).default;
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
  layoutKhitanSKeys: any = (layoutKhitanKits as any).default;
  layoutKhitanLKeys: any = (layoutKhitanKitl as any).default;
  layoutNubianKeys: any = (layoutNubianOnw as any).default;
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
  layoutBANZSLKeys: any = (layoutBANZSL as any).default;
  layoutNaskapiKeys: any = (layoutNaskapiNask as any).default;
  layoutCarrierKeys: any = (layoutCarrierCarr as any).default;
  layoutOjibweKeys: any = (layoutOjibweOji as any).default;
  layoutDesiSignKeys: any = (layoutDesiSign as any).default;
  layoutNsibidiKeys: any = (layoutNsibidiNsi as any).default;
  layoutSignWritingKeys: any = (layoutSignWritingSgnw as any).default;
  layoutBharatiBrailleKeys: any = (layoutBharatiBrailleBharati as any).default;
  layoutFlagsKeys: any = (layoutFlagsICS as any).default;
  layoutSemaphoreKeys: any = (layoutSemaphoreFlag as any).default;
  layoutMorseKeys: any = (layoutMorseCode as any).default;

  layoutCurrentKeys: any = [];
  previousLayout: any = [];
  
  selectedAllScriptTab : number = 0;
  selectKeysTabs : number = 0;
  showAll : Boolean = true;
  isQwerty : Boolean = false;
  isTransliterate : Boolean = false;
  isShiftKeyPress : Boolean = false;
  isAltGrKeyPress : Boolean = false;
  altGrCapsExists : Boolean = false;

  panelAbjadState: Boolean = false;
  panelAlphabetState: Boolean = false;
  panelLatinState: Boolean = false;
  panelAbugidaState: Boolean = false;
  panelSyllaberyState: Boolean = false;
  panelGramsState: Boolean = false;
  panelUnclassifiedState: Boolean = false;

  // Show Map View by default for All Script Types
  toggleAbjad: Boolean = true;
  toggleAlphabet: Boolean = true;
  toggleLatin: Boolean = true;
  toggleAbugida: Boolean = true;
  toggleSyllabery: Boolean = true;
  toggleGrams: Boolean = true;
  toggleSigns: Boolean = true;
  toggleCodes: Boolean = true;
  toggleUnclassified: Boolean = true;

  mappingKeysToSoft: Boolean = true;
  keysToRotate: Boolean = false;
  notToRotateKeys: Boolean = false;
  enableRotateKeyboard: Boolean = false;
  showImageGlyph: Boolean = true;
  bidiLetters: Boolean = false;
  switchScriptDirection: Boolean = false;
  unicode5AndHigher : Boolean = false;
  highlightKeys: Boolean = true;
  unusedKeys: Boolean = false;

  runProgressIndicator: Boolean = false;

  defaultCellSize: Number = (this.isMobile && !this.isTablet) ? 22 : ((!this.isMobile && this.isTablet)? 46 : 55 );
  defaultFontSize: Number = (this.isMobile && !this.isTablet) ? 12 : ((!this.isMobile && this.isTablet)? 16 : 21 );
  
  prevSwaras : string[] = ['','', '', '', '', '', '', '','', '', '', '', '', '', '','', '', '', '', '', '', '','', '', '', '', '', ''];
  prevSyllables : any = {"qwerty":['ኣ', 'ኡ', 'አ', 'እ', 'ኤ', 'ኧ', 'እ', 'አ', 'ኦ', 'ኢ'], "qwertyShift":['፤', '፦', '«', '፡', '፨', '፧', '፣', '»', '፥', '።'], "altGr":['\u00A0', '\u00A0', '\u00A0', '\u00A0', '፠', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0'], "altGrCaps":['\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0']};
  lastCharVyanjana: Boolean = false;
  syllablicTyping: Boolean = false;
  diacriticTyped: string = '';

  readingDir: string = "east";
  dirSet: string = "rtl";
  isRTL: Boolean = false;
  
  rtlLocales : string[] = ['ar', 'he', 'ur', 'fa', 'syrc', 'rhg', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ckb', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'skr', 'pal', 'xpr', 'xsa', 'mnkar', 'jawi', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf', 'woal', 'chrs', 'elym', 'palm', 'hatr', 'ber', 'mani', 'mer', 'psal', 'kult', 'egyd', 'safa', 'nshu', 'txr', 'rohg', 'estr', 'sert', 'madn', 'lad', 'nbat', 'pice', 'gars', 'cprt', 'lepo', 'sabe', 'phyg', 'khaz', 'mero', 'cana', 'sina', 'yezi', 'ug', 'mend', 'linb', 'idu', 'chun', 'kuli', 'txg', 'indus', 'hung'];
  boustrophedonScripts: string[] = ['ett', 'sabe', 'maya', 'txr', 'wole', 'phyg', 'pice', 'asom', 'luw', 'moon', 'sina', 'kmt', 'hung', 'safa', 'xsa', 'egyd', 'avo', 'lepo'];
  topToBottomLR: string[] = ['sog', 'oira', 'mon', 'phag', 'mnc', 'galk', 'shui', 'soyo', 'kits', 'kitl', 'sgnw'];
  topToBottomRL: string[] = ['zhcn', 'zhtw', 'ja', 'ko', 'nshu', 'idu', 'mero', 'chun', 'kuli', 'txg', 'indus', 'khit'];
  bottomToTopLR: string[] = ['ogam', 'btk', 'hano', 'tagb'];
  bottomToTopRL: string[] = ['ber'];
  layoutsSwitchHV: string[] = ['ogam', 'phag', 'oira', 'mnc', 'mon', 'galk', 'soyo', 'evn', 'hira', 'kata', 'vaii', 'geez', 'dite', 'iba', 'ndju', 'cree', 'crew', 'oji', 'iku', 'carr', 'bla', 'cans', 'nask', 'aztc', 'maya', 'am'];
  keyOrientationSwitch: string[] = ['ogam', 'phag', 'oira', 'mnc', 'mon', 'galk', 'soyo', 'evn'];
  keyDoNotRotate: string[] = ['vaii', 'geez', 'am', 'dite', 'iba', 'ndju'];
  swaraAbugidaType : string [] = ['ahom', 'bada', 'bali', 'batk', 'tglg', 'bn', 'bhai', 'bla', 'brah', 'bug', 'buhd', 'cakm', 'cree', 'dham', 'dite', 'diak', 'dogr', 'gran', 'gu', 'gup', 'hano', 'hi', 'jv', 'kthi', 'kn', 'kawi', 'kali', 'khar', 'tang', 'km', 'khoj', 'khud', 'kuli', 'lo', 'lepc', 'limb', 'loma', 'maga', 'maha', 'ml', 'mani', 'mni', 'mr', 'modi', 'mult', 'my', 'nand', 'or', 'phag', 'newa', 'pa', 'rjng', 'renc', 'sa', 'saur', 'shan', 'shrd', 'sn', 'sidd', 'snd', 'si', 'bhat', 'leke', 'ari', 'sora', 'sund', 'sylo', 'tagb', 'talu', 'lana', 'takr', 'ta', 'tamu', 'tach', 'te', 'thaa', 'th', 'tibt', 'tiga', 'tika', 'tirh', 'toch', 'gonm', 'gong', 'soyo', 'zanb'];
  imageAlternativeScript: string[] = ['cans', 'esk', 'esi', 'ipk', 'dhan', 'safa', 'txr', 'ibe', 'avo', 'ranj', 'gup', 'pall', 'toch', 'moon', 'tiga', 'xce', 'vith', 'nand', 'kada', 'estr', 'sert', 'madn', 'diak', 'ber', 'tach', 'gael', 'mwan', 'wole', 'moss', 'iba', 'maya', 'egyd', 'bhat', 'renc', 'kuli', 'sina', 'zou', 'cana', 'kaid', 'dham', 'tamu', 'geba', 'esy', 'maka', 'lad', 'kama', 'ndju', 'aztc', 'jiag', 'indus', 'bada', 'vatt', 'mikq', 'kpe', 'gars', 'dale', 'goyk', 'wolf', 'zag', 'kawi', 'loma', 'nsi', 'ion', 'tika', 'mamb', 'land', 'khat', 'leke', 'ari', 'sabe', 'dite', 'toto', 'chrs', 'tang', 'maga', 'luo', 'chik', 'adin', 'khom', 'kits', 'kitl', 'tnq', 'maha', 'ics', 'flag', 'ussign', 'desisign', 'banzsl'];

  fontsSources: string[] = ['dogr', 'zanb', 'sog', 'kult', 'hmnp', 'nshu', 'txg', 'elym', 'gonm', 'gong', 'soyo', 'yezi', 'ur'];
  fontClass: string = "";

  // Words Suggestion for All Supported Languages
  supportedLanguages : string[] = ['af','am','ar','az','bak','be','befr','bg','bn','bopo','br','brah','bs','bsk','ca','ceb','co','cs','cy','da','de','el','en','engb','enin','enintl','enus','eo','es','esmx','et','eu','fa','fi','fj','fo','fr','frca','fy','ga','gd','gl','gn','goth','gu','gv','ha','haw','he','hi','hmn','hr','ht','hu','hy','id','ig','ilo','is','it','ja','jv','ka','kk','km','kn','ko','kom','kon','ku','kw','ky','la','lb','lfn','ln','lo','lt','lv','mg','mi','mk','ml','mn','mr','ms','mt','my','nag','ne','nl','nld','no','ny','nya','oji','or','pa','pin','pl','ps','pt','ptbr','qu','rn','ro','rom','ru','rw','sa','sank','sd','si','sk','sl','sm','sn','so','sq','sr','st','su','sun','sv','sw','ta','te','tfng','tg','th','tk','tl','tpi','tr','tt','ty','ug','uk','ur','uz','vi','xh','yi','yo','zhcn','zhtw','zu'];

  diacritics: any = {
    a: [{"˝": "a̋"},{"˵": "ȁ"},{"`": "à"},{"´": "á"},{"^": "â"},{"˚": "å"},{"~": "ã"},{"ˉ": "ā"},{"˛": "ą"},{"¨": "ä"},{"ˇ": "ǎ"}],
    A: [{"˝": "A̋"},{"˵": "Ȁ"},{"`": "À"},{"´": "Á"},{"^": "Â"},{"˚": "Å"},{"~": "Ã"},{"ˉ": "Ā"},{"ˉ": "Ą"},{"¨": "Ä"},{"ˇ": "Ǎ"}],
    ä: [{"ˉ": "ǟ"}],
    Ä: [{"ˉ": "Ǟ"}],
    ȧ: [{"ˉ": "ǡ"}],
    Ȧ: [{"ˉ": "Ǡ"}],
    α: [{"΄": "ά"}],
    Α: [{"΄": "Ά"}],
    c: [{"¸": "ç"},{"´": "ć"},{"ˇ": "č"}],
    C: [{"¸": "Ç"},{"´": "Ć"},{"ˇ": "Č"}],
    d: [{"◌̸": "đ"},{"ˇ": "ď"}],
    D: [{"◌̸": "Đ"},{"ˇ": "Ď"}],
    e: [{"˝": "e̋"},{"˵": "ȅ"},{"`": "è"},{"´": "é"},{"^": "ê"},{"ˇ": "ě"},{"ˉ": "ē"},{"˛": "ę"},{"¨": "ë"}],
    E: [{"΄": "Έ"},{"˝": "E̋"},{"˵": "Ȅ"},{"`": "È"},{"´": "É"},{"^": "Ê"},{"ˇ": "Ě"},{"ˉ": "Ē"},{"ˉ": "Ę"},{"¨": "Ë"}],
    ε: [{"΄": "έ"}],
    i: [{"˝": "i̋"},{"˵": "ȉ"},{"`": "ì"},{"´": "í"},{"^": "î"},{"ˉ": "ī"},{"¨": "ï"},{"ˇ": "ǐ"}],
    I: [{"˝": "I̋"},{"˵": "Ȉ"},{"Ì": "À"},{"´": "Í"},{"^": "Î"},{"ˉ": "Ī"},{"¨": "Ï"},{"ˇ": "Ǐ"}],
    ι: [{"΄": "ί"},{"΅": "ΐ"}],
    Ι: [{"΄": "Ί"}],
    η: [{"΄": "ή"}],
    H: [{"΄": "Ή"}],
    l: [{"◌̸": "ł"}],
    L: [{"◌̸": "Ł"}],
    m: [{"˝": "m̋"}],
    M: [{"˝": "M̋"}],
    n: [{"~": "ñ"},{"´": "ń"},{"ˇ": "ň"}],
    N: [{"~": "Ñ"},{"´": "Ń"},{"ˇ": "Ň"}],
    o: [{"˝": "ő"},{"˵": "ȍ"},{"`": "ò"},{"´": "ó"},{"^": "ô"},{"~": "õ"},{"ˉ": "ō"},{"◌̸": "ø"},{"¨": "ö"},{"ˇ": "ǒ"}],
    O: [{"΄": "Ό"},{"΅": "Ȫ"},{"˝": "Ő"},{"˵": "Ȍ"},{"`": "Ò"},{"´": "Ó"},{"^": "Ô"},{"~": "Õ"},{"ˉ": "Ō"},{"◌̸": "Ø"},{"¨": "Ö"},{"ˇ": "Ǒ"}],
    ο: [{"΄": "ό"},{"΅": "ȫ"}],
    r: [{"ˇ": "ř"},{"˵": "ȑ"}],
    R: [{"ˇ": "Ř"},{"˵": "Ȑ"}],
    s: [{"´": "ś"},{"ˇ": "š"}],
    S: [{"´": "Ś"},{"ˇ": "Š"}],
    t: [{"ˇ": "ť"}],
    T: [{"ˇ": "Ť"}],
    u: [{"˝": "ű"},{"˵": "ȕ"},{"`": "ù"},{"´": "ú"},{"^": "û"},{"˚": "ů"},{"ˉ": "ū"},{"¨": "ü"},{"ˇ": "ǔ"}],
    U: [{"˝": "Ű"},{"˵": "Ȕ"},{"`": "Ù"},{"´": "Ú"},{"^": "Û"},{"˚": "Ů"},{"ˉ": "Ū"},{"¨": "Ü"},{"ˇ": "Ǔ"}],
    ü: [{"ˉ": "ǖ"},{"`": "ǜ"},{"´": "ǘ"},{"ˇ": "ǚ"}],
    Ü: [{"ˉ": "Ǖ"},{"`": "Ǜ"},{"´": "Ǘ"},{"ˇ": "Ǚ"}],
    υ: [{"΄": "ύ"},{"΅": "ΰ"}],
    Υ: [{"΄": "Ύ"}],
    w: [{"¨": "ẅ"}],
    W: [{"¨": "Ẅ"}],
    ω: [{"΄": "ώ"}],
    Ω: [{"΄": "Ώ"}],
    y: [{"¨": "ÿ"},{"˵": "y̏"},{"´": "ý"}],
    Y: [{"¨": "Ÿ"},{"˵": "Y̏"},{"´": "Ý"}],
    z: [{"·": "ż"},{"´": "ź"},{"ˇ": "ž"}],
    Z: [{"·": "Ż"},{"´": "Ź"},{"ˇ": "Ž"}],
    Ә: [{"¨": "Ӛ"}],
    ә: [{"¨": "ӛ"}],
    Ж: [{"¨": "Ӝ"}],
    ж: [{"¨": "ӝ"}],
    з: [{"¨": "Ӟ"}],
    З: [{"¨": "ӟ"}],
    И: [{"¨": "Ӥ"}],
    и: [{"¨": "ӥ"}],
    Ѳ: [{"¨": "Ӫ"}],
    ѳ: [{"¨": "ӫ"}],
    Э: [{"¨": "Ӭ"}],
    э: [{"¨": "ӭ"}],
    У: [{"¨": "Ӱ"},{"˝": "Ӳ"}],
    у: [{"¨": "ӱ"},{"˝": "ӳ"}],
    Ѵ: [{"˵": "Ѷ"}],
    ѵ: [{"˵": "ѷ"}],
    Ч: [{"¨": "Ӵ"}],
    ч: [{"¨": "ӵ"}],
    Ы: [{"¨": "Ӹ"}],
    ы: [{"¨": "ӹ"}],
  };

  isSuggestionRequested: Boolean = true;
  languageSuggestion: FormGroup = this._formBuilder.group({
    setOfWords: ''
  });
  typedWord = new BehaviorSubject(null);
  allSuggestionsForLanguage: AvailableWordSuggestions[] = [];
  suggestedOptions: Observable<AvailableWordSuggestions[]>; 
  listOfWordsChips: string[] = [];

  @Input() center: Coordinate;
  @Input() zoom: number;
  view: View;
  projection: Projection;
  extent: Extent = [-20026376.39, -20048966.10,20026376.39, 20048966.10];
  
  abjadMap: Map;
  abjadLayer: any;
  alphabetMap: Map;
  alphabetLayer: any;
  latinMap: Map;
  latinLayer: any;
  abugidaMap: Map;
  abugidaLayer: any;
  syllaberyMap: Map;
  syllaberyLayer: any;
  gramsMap: Map;
  gramsLayer: any;
  signsMap: Map;
  signsLayer: any;
  codesMap: Map;
  codesLayer: any;
  unclassifiedMap: Map;
  unclassifiedLayer: any;

  sliderWidth: string = "0px";

  onlineService: Boolean = true;

  @Output() mapReady = new EventEmitter<Map>();

  allowSuperScript : Boolean = false;
  rowSuper : number = 0;
  columnSuper : number = 0;
  rowPositions : any = {"delPos": 0, "tabPos": 0, "enterPos": 0, "shiftPos": 0};
  qwertyPos: number = 0;
  qwertyTranPos: number = 0;
  altGrPos: number = 0;

  populatingBookmarks : string[] = [];

  translateForSnackBar: string[] = [];

  fontSize(value: number) {
    localStorage.setItem('fontSize', value.toString());
    return value + (localStorage.getItem("sizeTranslate") == "" ||  localStorage.getItem("sizeTranslate") == null || !localStorage.getItem("sizeTranslate")? " size" : " " + localStorage.getItem("sizeTranslate"));
  }
  cellSize(value: number) {
    localStorage.setItem('cellSize', value.toString());
    if (value >= 1) {
      return value + (localStorage.getItem("sizeTranslate") == "" ||  localStorage.getItem("sizeTranslate") == null || !localStorage.getItem("sizeTranslate")? " size" : " " + localStorage.getItem("sizeTranslate"));
    }
    return value;
  }
  chronoTimelineAbjad(value: number) {
    if (value >= -6000) {
      if (value < 0)
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + Math.abs(value) + " BC";
      else
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + value + " AD";
    }
    return value;
  }
  chronoTimelineAlphabet(value: number) {
    if (value >= -6000) {
      if (value < 0)
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + Math.abs(value) + " BC";
      else
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + value + " AD";
    }
    return value;
  }
  chronoTimelineLatin(value: number) {
    if (value >= -6000) {
      if (value < 0)
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + Math.abs(value) + " BC";
      else
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + value + " AD";
    }
    return value;
  }
  chronoTimelineAbugida(value: number) {
    if (value >= -6000) {
      if (value < 0)
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + Math.abs(value) + " BC";
      else
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + value + " AD";
    }
    return value;
  }
  chronoTimelineSyllabery(value: number) {
    if (value >= -6000) {
      if (value < 0)
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + Math.abs(value) + " BC";
      else
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + value + " AD";
    }
    return value;
  }
  chronoTimelineGrams(value: number) {
    if (value >= -6000) {
      if (value < 0)
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + Math.abs(value) + " BC";
      else
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + value + " AD";
    }
    return value;
  }
  chronoTimelineUnclassified(value: number) {
    if (value >= -6000) {
      if (value < 0)
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + Math.abs(value) + " BC";
      else
        return (localStorage.getItem("yearTranslate") == "" ||  localStorage.getItem("yearTranslate") == null || !localStorage.getItem("yearTranslate")? "Year " : localStorage.getItem("yearTranslate") + " ") + value + " AD";
    }
    return value;
  }

  constructor(private router: Router, private sessionManager: SessionManagerService, private zone: NgZone, private cd: ChangeDetectorRef, private _formBuilder: FormBuilder, private http: HttpClient, private helperDialog: MatDialog, private customKeyboardDialog: MatDialog, private _snackBar: MatSnackBar, abjadSearchField: ElementRef, alphabetSearchField: ElementRef, latinSearchField: ElementRef, abugidaSearchField: ElementRef, syllaberySearchField: ElementRef, gramsSearchField: ElementRef, unclassifiedSearchField: ElementRef) {
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
    if (window.location.href) {
      if (window.location.href.split('/')[3])
        this.sessionManager.setInSessionURL(window.location.href.split('/')[3]);
      else if (!this.sessionManager.getFromSessionURL())
        this.sessionManager.setInSessionURL(this.sessionManager.getUILocale());
      if (this.layoutsSwitchHV.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
        this.enableRotateKeyboard = true;
      } else {
        this.enableRotateKeyboard = false;
      }
      if (this.keyDoNotRotate.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
        this.notToRotateKeys = true;
      } else {
        this.notToRotateKeys = false;
      }
      if (this.boustrophedonScripts.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
        this.bidiLetters = true;
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
    if(localStorage.getItem('fontSize')) {
      this.defaultFontSize = Number(this.sessionManager.getFontSizeFromSession());
    } else {
      this.sessionManager.setFontSizeForSession(this.defaultFontSize);
    }
    if(localStorage.getItem('cellSize')) {
      this.defaultCellSize = Number(this.sessionManager.getCellSizeFromSession());
    } else {
      this.sessionManager.setCellSizeForSession(this.defaultCellSize);
    }

    let featuresAbjad = [];
    let featuresAlphabet = [];
    let featuresLatin = [];
    let featuresAbugida = [];
    let featuresSyllabery = [];
    let featuresGrams = [];
    let featuresSigns = [];
    let featuresCodes = [];
    let featuresUnclassified = [];
    Object.keys(this.keyboardLayouts).map((key) => {
      if (this.keyboardLayouts[key][0] == 0) {
        const marker = new Feature({
          geometry: new Point(olProj.fromLonLat([this.keyboardLayouts[key][12], this.keyboardLayouts[key][13]])), 
          name: this.keyboardLayouts[key][5] + " | " + this.keyboardLayouts[key][2] + " | " + this.chronoTimelineAbjad(this.keyboardLayouts[key][7]),
          year: this.keyboardLayouts[key][7],
          code: key
        });
        featuresAbjad.push(marker);
      } else if (this.keyboardLayouts[key][0] == 1 && this.keyboardLayouts[key][1] != 0) {
        const marker = new Feature({
          geometry: new Point(olProj.fromLonLat([this.keyboardLayouts[key][12], this.keyboardLayouts[key][13]])),
          name: this.keyboardLayouts[key][5] + " | " + this.keyboardLayouts[key][2] + " | " + this.chronoTimelineAlphabet(this.keyboardLayouts[key][7]),
          year: this.keyboardLayouts[key][7],
          code: key
        });
        featuresAlphabet.push(marker);
      } else if (this.keyboardLayouts[key][0] == 1 && this.keyboardLayouts[key][1] == 0) {
        const marker = new Feature({
          geometry: new Point(olProj.fromLonLat([this.keyboardLayouts[key][12], this.keyboardLayouts[key][13]])),
          name: this.keyboardLayouts[key][5] + " | " + this.keyboardLayouts[key][2] + " | " + this.chronoTimelineLatin(this.keyboardLayouts[key][7]),
          year: this.keyboardLayouts[key][7],
          code: key
        });
        featuresLatin.push(marker);
      } else if (this.keyboardLayouts[key][0] == 2) {
        const marker = new Feature({
          geometry: new Point(olProj.fromLonLat([this.keyboardLayouts[key][12], this.keyboardLayouts[key][13]])),
          name: this.keyboardLayouts[key][5] + " | " + this.keyboardLayouts[key][2] + " | " + this.chronoTimelineAbugida(this.keyboardLayouts[key][7]),
          year: this.keyboardLayouts[key][7],
          code: key
        });
        featuresAbugida.push(marker);
      } else if (this.keyboardLayouts[key][0] == 3) {
        const marker = new Feature({
          geometry: new Point(olProj.fromLonLat([this.keyboardLayouts[key][12], this.keyboardLayouts[key][13]])),
          name: this.keyboardLayouts[key][5] + " | " + this.keyboardLayouts[key][2] + " | " + this.chronoTimelineSyllabery(this.keyboardLayouts[key][7]),
          year: this.keyboardLayouts[key][7],
          code: key
        });
        featuresSyllabery.push(marker);
      } else if (this.keyboardLayouts[key][0] == 4) {
        const marker = new Feature({
          geometry: new Point(olProj.fromLonLat([this.keyboardLayouts[key][12], this.keyboardLayouts[key][13]])),
          name: this.keyboardLayouts[key][5] + " | " + this.keyboardLayouts[key][2] + " | " + this.chronoTimelineGrams(this.keyboardLayouts[key][7]),
          year: this.keyboardLayouts[key][7],
          code: key
        });
        featuresGrams.push(marker);
      } else if (this.keyboardLayouts[key][0] == 6) {
        const marker = new Feature({
          geometry: new Point(olProj.fromLonLat([this.keyboardLayouts[key][12], this.keyboardLayouts[key][13]])),
          name: this.keyboardLayouts[key][5] + " | " + this.keyboardLayouts[key][2] + " | " + this.keyboardLayouts[key][7],
          year: this.keyboardLayouts[key][7],
          code: key
        });
        featuresSigns.push(marker);
      } else if (this.keyboardLayouts[key][0] == 7) {
        const marker = new Feature({
          geometry: new Point(olProj.fromLonLat([this.keyboardLayouts[key][12], this.keyboardLayouts[key][13]])),
          name: this.keyboardLayouts[key][5] + " | " + this.keyboardLayouts[key][2] + " | " + this.keyboardLayouts[key][7],
          year: this.keyboardLayouts[key][7],
          code: key
        });
        featuresCodes.push(marker);
      } else if (this.keyboardLayouts[key][0] == 8) {
        const marker = new Feature({
          geometry: new Point(olProj.fromLonLat([this.keyboardLayouts[key][12], this.keyboardLayouts[key][13]])),
          name: this.keyboardLayouts[key][5] + " | " + this.keyboardLayouts[key][2] + " | " + this.chronoTimelineUnclassified(this.keyboardLayouts[key][7]),
          year: this.keyboardLayouts[key][7],
          code: key
        });
        featuresUnclassified.push(marker);
      }
    });

    var self = this;
    this.abjadLayer = new VectorLayer({
      source: new Vector({
        features: featuresAbjad
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/images/map_marker.png',
          opacity : 1
        })
      })
    });
    this.abjadMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM({
            url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        this.abjadLayer
      ],
      view: new View({
        center: olProj.fromLonLat([0, 20]),
        zoom: 2
      })
    }); 
    this.abjadMap.on('click', function (evt) {
      const feature = self.abjadMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        document.getElementById('infoAbjadText').innerText = "";
        document.getElementById('showAbjadText').innerText = feature['values_']['name'].split("|")[0] + " | " + self.localisedKeyboardLayouts[feature['values_']['code']][2] + " | " + self.chronoTimelineAbjad(self.localisedKeyboardLayouts[feature['values_']['code']][7]);
        self.tabLoadShow(self, feature['values_']['code']);
        self.layoutCurrentKeys = self[self.keyboardLayouts[feature['values_']['code']][3]];
        self.resetForAKeyboard();
        self.sessionManager.setInSessionURL(feature['values_']['code']);
      } else
        document.getElementById('showAbjadText').innerText = "";
    });
    this.abjadMap.on('pointermove', function (e) {
      const pixel = self.abjadMap.getEventPixel(e.originalEvent);
      const hit = self.abjadMap.hasFeatureAtPixel(pixel);
      self.abjadMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    this.abjadMap.on('movestart', function () {
      document.getElementById('showAbjadText').innerText = "";
    });
    this.alphabetLayer = new VectorLayer({
      source: new VectorSource({
        features: featuresAlphabet
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/images/map_marker.png',
          opacity : 1
        })
      })
    });
    this.alphabetMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.alphabetLayer
      ],
      view: new View({
        center: olProj.fromLonLat([0, 20]),
        zoom: 2
      })
    });
    this.alphabetMap.on('click', function (evt) {
      const feature = self.alphabetMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        document.getElementById('showAlphabetText').innerText = feature['values_']['name'].split("|")[0] + " | " + self.localisedKeyboardLayouts[feature['values_']['code']][2] + " | " + self.chronoTimelineAlphabet(self.localisedKeyboardLayouts[feature['values_']['code']][7]);
        self.tabLoadShow(self, feature['values_']['code']);
        self.layoutCurrentKeys = self[self.keyboardLayouts[feature['values_']['code']][3]];
        self.resetForAKeyboard();
        self.sessionManager.setInSessionURL(feature['values_']['code']);
      } else
        document.getElementById('showAlphabetText').innerText = "";
    });
    this.alphabetMap.on('pointermove', function (e) {
      const pixel = self.alphabetMap.getEventPixel(e.originalEvent);
      const hit = self.alphabetMap.hasFeatureAtPixel(pixel);
      self.alphabetMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    this.alphabetMap.on('movestart', function () {
      document.getElementById('showAlphabetText').innerText = "";
    });
    this.latinLayer = new VectorLayer({
      source: new VectorSource({
        features: featuresLatin
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/images/map_marker.png',
          opacity : 1
        })
      })
    });
    this.latinMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.latinLayer
      ],
      view: new View({
        center: olProj.fromLonLat([0, 20]),
        zoom: 2
      })
    });
    this.latinMap.on('click', function (evt) {
      const feature = self.latinMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        document.getElementById('showLatinText').innerText = feature['values_']['name'].split("|")[0] + " | " + self.localisedKeyboardLayouts[feature['values_']['code']][2] + " | " + self.chronoTimelineLatin(self.localisedKeyboardLayouts[feature['values_']['code']][7]);
        self.tabLoadShow(self, feature['values_']['code']);
        self.layoutCurrentKeys = self[self.keyboardLayouts[feature['values_']['code']][3]];
        self.resetForAKeyboard();
        self.sessionManager.setInSessionURL(feature['values_']['code']);
      } else
        document.getElementById('showLatinText').innerText = "";
    });
    this.latinMap.on('pointermove', function (e) {
      const pixel = self.latinMap.getEventPixel(e.originalEvent);
      const hit = self.latinMap.hasFeatureAtPixel(pixel);
      self.latinMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    this.latinMap.on('movestart', function () {
      document.getElementById('showLatinText').innerText = "";
    });
    this.abugidaLayer = new VectorLayer({
      source: new VectorSource({
        features: featuresAbugida
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/images/map_marker.png',
          opacity : 1
        })
      })
    });
    this.abugidaMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.abugidaLayer
      ],
      view: new View({
        center: olProj.fromLonLat([0, 20]),
        zoom: 2
      })
    });
    this.abugidaMap.on('click', function (evt) {
      const feature = self.abugidaMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        document.getElementById('showAbugidaText').innerText = feature['values_']['name'].split("|")[0] + " | " + self.localisedKeyboardLayouts[feature['values_']['code']][2] + " | " + self.chronoTimelineAbugida(self.localisedKeyboardLayouts[feature['values_']['code']][7]);
        self.tabLoadShow(self, feature['values_']['code']);
        self.layoutCurrentKeys = self[self.keyboardLayouts[feature['values_']['code']][3]];
        self.resetForAKeyboard();
        self.sessionManager.setInSessionURL(feature['values_']['code']);
      } else
        document.getElementById('showAbugidaText').innerText = "";
    });
    this.abugidaMap.on('pointermove', function (e) {
      const pixel = self.abugidaMap.getEventPixel(e.originalEvent);
      const hit = self.abugidaMap.hasFeatureAtPixel(pixel);
      self.abugidaMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    this.abugidaMap.on('movestart', function () {
      document.getElementById('showAbugidaText').innerText = "";
    });
    this.syllaberyLayer = new VectorLayer({
      source: new VectorSource({
        features: featuresSyllabery
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/images/map_marker.png',
          opacity : 1
        })
      })
    });
    this.syllaberyMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.syllaberyLayer
      ],
      view: new View({
        center: olProj.fromLonLat([0, 20]),
        zoom: 2
      })
    });
    this.syllaberyMap.on('click', function (evt) {
      const feature = self.syllaberyMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        document.getElementById('showSyllaberyText').innerText = feature['values_']['name'].split("|")[0] + " | " + self.localisedKeyboardLayouts[feature['values_']['code']][2] + " | " + self.chronoTimelineSyllabery(self.localisedKeyboardLayouts[feature['values_']['code']][7]);
        self.tabLoadShow(self, feature['values_']['code']);
        self.layoutCurrentKeys = self[self.keyboardLayouts[feature['values_']['code']][3]];
        self.resetForAKeyboard();
        self.sessionManager.setInSessionURL(feature['values_']['code']);
      } else
        document.getElementById('showSyllaberyText').innerText = "";
    });
    this.syllaberyMap.on('pointermove', function (e) {
      const pixel = self.syllaberyMap.getEventPixel(e.originalEvent);
      const hit = self.syllaberyMap.hasFeatureAtPixel(pixel);
      self.syllaberyMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    this.syllaberyMap.on('movestart', function () {
      document.getElementById('showSyllaberyText').innerText = "";
    });
    this.gramsLayer = new VectorLayer({
      source: new VectorSource({
        features: featuresGrams
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/images/map_marker.png',
          opacity : 1
        })
      })
    });
    this.gramsMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.gramsLayer
      ],
      view: new View({
        center: olProj.fromLonLat([0, 20]),
        zoom: 2
      })
    });
    this.gramsMap.on('click', function (evt) {
      const feature = self.gramsMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        document.getElementById('showGramsText').innerText = feature['values_']['name'].split("|")[0] + " | " + self.localisedKeyboardLayouts[feature['values_']['code']][2] + " | " + self.chronoTimelineGrams(self.localisedKeyboardLayouts[feature['values_']['code']][7]);     
        self.tabLoadShow(self, feature['values_']['code']);
        self.layoutCurrentKeys = self[self.keyboardLayouts[feature['values_']['code']][3]];
        self.resetForAKeyboard();
        self.sessionManager.setInSessionURL(feature['values_']['code']);
      } else
        document.getElementById('showGramsText').innerText = "";
    });
    this.gramsMap.on('pointermove', function (e) {
      const pixel = self.gramsMap.getEventPixel(e.originalEvent);
      const hit = self.gramsMap.hasFeatureAtPixel(pixel);
      self.gramsMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    this.gramsMap.on('movestart', function () {
      document.getElementById('showGramsText').innerText = "";
    });
    this.signsLayer = new VectorLayer({
      source: new VectorSource({
        features: featuresSigns
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/images/map_marker.png',
          opacity : 1
        })
      })
    });
    this.signsMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.signsLayer
      ],
      view: new View({
        center: olProj.fromLonLat([0, 20]),
        zoom: 2
      })
    });
    this.signsMap.on('click', function (evt) {
      const feature = self.signsMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        document.getElementById('showSignsText').innerText = feature['values_']['name'].split("|")[0] + " | " + self.localisedKeyboardLayouts[feature['values_']['code']][2];
        self.tabLoadShow(self, feature['values_']['code']);
        self.layoutCurrentKeys = self[self.keyboardLayouts[feature['values_']['code']][3]];
        self.resetForAKeyboard();
        self.sessionManager.setInSessionURL(feature['values_']['code']);
      } else
        document.getElementById('showSignsText').innerText = "";
    });
    this.signsMap.on('pointermove', function (e) {
      const pixel = self.signsMap.getEventPixel(e.originalEvent);
      const hit = self.signsMap.hasFeatureAtPixel(pixel);
      self.signsMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    this.signsMap.on('movestart', function () {
      document.getElementById('showSignsText').innerText = "";
    });
    this.codesLayer = new VectorLayer({
      source: new VectorSource({
        features: featuresCodes
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/images/map_marker.png',
          opacity : 1
        })
      })
    });
    this.codesMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.codesLayer
      ],
      view: new View({
        center: olProj.fromLonLat([0, 20]),
        zoom: 2
      })
    });
    this.codesMap.on('click', function (evt) {
      const feature = self.codesMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        document.getElementById('showCodesText').innerText = feature['values_']['name'].split("|")[0] + " | " + self.localisedKeyboardLayouts[feature['values_']['code']][2];
        self.tabLoadShow(self, feature['values_']['code']);
        self.layoutCurrentKeys = self[self.keyboardLayouts[feature['values_']['code']][3]];
        self.resetForAKeyboard();
        self.sessionManager.setInSessionURL(feature['values_']['code']);
      } else
        document.getElementById('showCodesText').innerText = "";
    });
    this.codesMap.on('pointermove', function (e) {
      const pixel = self.codesMap.getEventPixel(e.originalEvent);
      const hit = self.codesMap.hasFeatureAtPixel(pixel);
      self.codesMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    this.codesMap.on('movestart', function () {
      document.getElementById('showCodesText').innerText = "";
    });
    this.unclassifiedLayer = new VectorLayer({
      source: new VectorSource({
        features: featuresUnclassified
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/images/map_marker.png',
          opacity : 1
        })
      })
    });
    this.unclassifiedMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.unclassifiedLayer
      ],
      view: new View({
        center: olProj.fromLonLat([0, 20]),
        zoom: 2
      })
    });
    this.unclassifiedMap.on('click', function (evt) {
      const feature = self.unclassifiedMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        document.getElementById('showUnclassifiedText').innerText = feature['values_']['name'].split("|")[0] + " | " + self.localisedKeyboardLayouts[feature['values_']['code']][2] + " | " + self.chronoTimelineUnclassified(self.localisedKeyboardLayouts[feature['values_']['code']][7]);
        self.tabLoadShow(self, feature['values_']['code']);
        self.layoutCurrentKeys = self[self.keyboardLayouts[feature['values_']['code']][3]];
        self.resetForAKeyboard();
        self.sessionManager.setInSessionURL(feature['values_']['code']);
      } else
        document.getElementById('showUnclassifiedText').innerText = "";
    });
    this.unclassifiedMap.on('pointermove', function (e) {
      const pixel = self.unclassifiedMap.getEventPixel(e.originalEvent);
      const hit = self.unclassifiedMap.hasFeatureAtPixel(pixel);
      self.unclassifiedMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    this.unclassifiedMap.on('movestart', function () {
      document.getElementById('showUnclassifiedText').innerText = "";
    });

    this.abjadSearchField = abjadSearchField;
    this.alphabetSearchField = alphabetSearchField;
    this.latinSearchField = latinSearchField;
    this.abugidaSearchField = abugidaSearchField;
    this.syllaberySearchField = syllaberySearchField;
    this.gramsSearchField = gramsSearchField;
    this.unclassifiedSearchField = unclassifiedSearchField;

    this.translateSnackBars();
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
      if (keysType) {
        if (this.layoutsSwitchHV.indexOf(keysType) != -1) {
          this.enableRotateKeyboard = true;
        } else {
          this.enableRotateKeyboard = false;
        }
        if (this.keyDoNotRotate.indexOf(keysType) != -1) {
          this.notToRotateKeys = true;
        } else {
          this.notToRotateKeys = false;
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
        if (this.fontsSources.indexOf(keysType) > -1){
          this.fontClass = this.fontsSources[this.fontsSources.indexOf(keysType)];
        }
        this.keysResizePerDeviceWidth();
        if (this.supportedLanguages.indexOf(keysType) > -1)
          this.populateSuggestionsForLanguage(keysType);
        this.sessionManager.itemCurrentKeyboard.next(this[this.keyboardLayouts[keysType][3]]);
        if (this.boustrophedonScripts.indexOf(keysType) > -1) {
          this.readingDir = "compare_arrows";
        } else if (this.bottomToTopRL.indexOf(keysType) > -1 || this.topToBottomLR.indexOf(keysType) > -1) {
          this.readingDir = "subdirectory_arrow_right";
        } else if (this.bottomToTopLR.indexOf(keysType) > -1 || this.topToBottomRL.indexOf(keysType) > -1) {
          this.readingDir = "subdirectory_arrow_left";
        } else if (this.rtlLocales.indexOf(keysType) > -1) {
          this.readingDir = "west";
        } else {
          this.readingDir = "east";
        }
        this.verifyThisKeyboardHasQwerty();
      }
    });
    // At Initial Load URL Requirement for Keyboard is there and not empty URL
    if (this.sessionManager.getFromSessionURL() != undefined && this.sessionManager.getFromSessionURL() != "") {
      this.tabLoadShow(this, this.sessionManager.getFromSessionURL());
      this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
      this.sessionManager.setInSessionOnlyKeyboard(true);
      this.initSwara();
    }

    this.sessionManager.itemQwertyType.subscribe((flagValue)=>{
      this.isQwerty = flagValue;
      if (this.sessionManager.isSendInitialLoadDataAllowed() == 'true' && flagValue) {
        this.sessionManager.sendDataToServerAtSessionBegin().subscribe(() => {
          // Session Manager Service sends these Device, Browser, Locale & User Interface Data
          console.info("[MUlTISCRIPTEDITOR] User's Choice Session Data is sent to server");
        });
      }
      // Constraint : Typewriter is false and Transliterate is set then it should be reset
      if (flagValue == false && this.isTransliterate == true && this.sessionManager.itemTransliterate.value == true) {
        this.sessionManager.setTransliterate(false);
        this.isTransliterate = false;
      } 
      if (this.allowSuperScript || (this.sessionManager.itemSessionURL.value == "ti" || this.sessionManager.itemSessionURL.value == "tig" || this.sessionManager.itemSessionURL.value == "am" || this.sessionManager.itemSessionURL.value == "geez") && (this.isQwerty || this.isTransliterate)) {
        this.setSuperPosition();
        this.setSuperScriptInLayout();
      }
    });
    this.sessionManager.itemTransliterate.subscribe((flagForTrans) => {
      this.isTransliterate = flagForTrans;
      if (this.sessionManager.isSendInitialLoadDataAllowed() == 'true' && flagForTrans) {
        this.sessionManager.sendDataToServerAtSessionBegin().subscribe(() => {
          // Session Manager Service sends these Device, Browser, Locale & User Interface Data
          console.info("[MUlTISCRIPTEDITOR] User's Choice Session Data is sent to server");
        });
      }
      if (this.allowSuperScript && (this.isQwerty || this.isTransliterate)) {
        this.setSuperPosition();
        this.setSuperScriptInLayout();
      }
    });
    this.sessionManager.itemShiftKeyPressed.subscribe((flagForShift) => {
      this.isShiftKeyPress = flagForShift;
      if (this.allowSuperScript && (this.isQwerty || this.isTransliterate)) {
        this.setSuperPosition();
        this.setSuperScriptInLayout();
      }
    });
    this.sessionManager.itemAltGrKeyPressed.subscribe((flagForAltGr) => {
      this.isAltGrKeyPress = flagForAltGr;
      if (this.allowSuperScript && (this.isQwerty || this.isTransliterate)) {
        this.setSuperPosition();
        this.setSuperScriptInLayout();
      }
    });
    this.altGrCapsExists = (this.layoutCurrentKeys)? this.layoutCurrentKeys.some(x => x.hasOwnProperty('altGrCaps')) : false;
    if (this.altGrCapsExists == true)
      this.sessionManager.itemAltGrExists.next(true);
    else
      this.sessionManager.itemAltGrExists.next(false);

    if (this.layoutCurrentKeys && this.layoutCurrentKeys.some(x => x.hasOwnProperty('qwerty')) == true) {
      this.sessionManager.setAvalabilityOfTypewriter(true);
    } else {
      this.sessionManager.setAvalabilityOfTypewriter(false);
    }
    if (this.allowSuperScript && (this.isQwerty || this.isTransliterate))
      this.setSuperPosition();
    
    this.sessionManager.itemOfflineOnly.subscribe((value)=> {
      this.onlineService = !value;
    });
  }

  ngAfterViewInit(): void {
    this.sessionManager.isMobileDevice.subscribe((value) => {
      this.isMobile = value;
    });

    this.sessionManager.isTabletDevice.subscribe((value) => {
      this.isTablet = value;
    });
  
    this.sessionManager.itemKeyboardOnly.subscribe((flagValue)=> {
      if (flagValue == true) {
        this.allTabGroups.nativeElement.style.display = 'none';
        this.keysAbove.nativeElement.style.display = 'block';
      } else if (flagValue == false) {
        this.keysAbove.nativeElement.style.display = 'none';
        this.allTabGroups.nativeElement.style.display = 'block';
      }
    });
    
    this.sessionManager.itemUILocale.subscribe(async (locale) => {
      // URL does not have any Keyboard requirement, Browser Locale to be used
      if (locale != null && locale != "" && (this.sessionManager.getFromSessionURL() == undefined || this.sessionManager.getFromSessionURL() == "")) {
        this.selectedAllScriptTab = this.keyboardLayouts[locale][0];
        this.allScriptTypesTabGroup.selectedIndex = Number(this.selectedAllScriptTab);
        this.selectKeysTabs = this.keyboardLayouts[locale][1];
        this.tabGroupAbugida.selectedIndex = Number(this.selectKeysTabs);
        this.layoutCurrentKeys = this[this.keyboardLayouts[locale][3]];
        this.sessionManager.setInSessionURL(this.sessionManager.getUILocale());
      }
      // URL has Keyboard requirement and associate Keyboard & UI Locale
      else if (locale != null && locale != "" && this.sessionManager.getFromSessionURL() != undefined && this.sessionManager.getFromSessionURL() != "" && locale === this.keyboardLayouts[this.sessionManager.getFromSessionURL()][2] !== undefined && this.sessionManager.itemKeyboardDisassociateLocale.value == true) {
        this.selectedAllScriptTab = this.keyboardLayouts[this.sessionManager.getFromSessionURL()][0];
        this.allScriptTypesTabGroup.selectedIndex = Number(this.selectedAllScriptTab);
        this.selectKeysTabs = this.keyboardLayouts[this.sessionManager.getFromSessionURL()][1];
        this.tabGroupAbugida.selectedIndex = Number(this.selectKeysTabs);
        this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
      }
      // URL session does not have UI Locale and UI & Keyboard change requirement
      else if (locale != null && locale != "" && this.sessionManager.getFromSessionURL() != "" && this.sessionManager.itemKeyboardDisassociateLocale.value == false) {
        this.selectedAllScriptTab = this.keyboardLayouts[this.sessionManager.getUILocale()][0];
        this.allScriptTypesTabGroup.selectedIndex = Number(this.selectedAllScriptTab);
        this.selectKeysTabs = this.keyboardLayouts[this.sessionManager.getUILocale()][1];
        this.tabGroupAlphabet.selectedIndex = Number(this.selectKeysTabs);
        this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getUILocale()][3]];
        this.sessionManager.setInSessionURL(this.sessionManager.getUILocale());
      }
      this.initSwara();
      //Translate the strings for Sliders
      this.loadFromFile(locale);

      this.localisedKeyboardLayouts = await this.localisedKeyboardLayoutDB(locale);
      this.dirSet = (this.rtlLocales.indexOf(locale) !== -1)? "rtl" : "ltr";
      this.isRTL = (this.rtlLocales.indexOf(locale) !== -1)? true : false;
      this.keysResizePerDeviceWidth();
      // Populate Favourites menu 
      this.populateMyBookmarks();
    });

    // Retain the tab index for the URL being loaded
    if (this.allScriptTypesTabGroup)
      this.sessionManager.setScriptTypeTab(this.allScriptTypesTabGroup.selectedIndex);

    this.sessionManager.tabScriptType.subscribe((tabIndex) => {
      this.selectedAllScriptTab = tabIndex;
      this.allScriptTypesTabGroup.selectedIndex = Number(this.selectedAllScriptTab);
    });

    this.sessionManager.selectedKeyboard.subscribe((keyboardSelection) => {
      if (keyboardSelection) {
        this.selectedAllScriptTab = this.keyboardLayouts[keyboardSelection][0];
        this.allScriptTypesTabGroup.selectedIndex = Number(this.selectedAllScriptTab);
        this.selectKeysTabs = this.keyboardLayouts[keyboardSelection][1];
        this.tabGroupAlphabet.selectedIndex = Number(this.selectKeysTabs);
        this.layoutCurrentKeys = this[this.keyboardLayouts[keyboardSelection][3]];
        this.sessionManager.setInSessionURL(keyboardSelection);
        this.resetForAKeyboard();
      }
    });

    // Setup Intelligent Typing only when the List of Word exists
    this.sessionManager.suggestWords.subscribe((valueSet) => {
      this.isSuggestionRequested = valueSet;
    });
    this.typedWord.subscribe((characterTyped) => {
      if (characterTyped && characterTyped != " " && characterTyped != "  " && this.allSuggestionsForLanguage.length > 0) {
        this.languageSuggestion.get('setOfWords').setValue(characterTyped);
        this.listOfWordsChips[0] = characterTyped;
      } else if (this.listOfWordsChips) {
        this.listOfWordsChips = [];
      }
    });
    // When Keyboard keys are mapped to Soft Keyboard
    this.sessionManager.typedKeysMap.subscribe((typingMappedKeys) => {
      if (this.mappingKeysToSoft && (this.isQwerty || this.isTransliterate) && typingMappedKeys != null && typingMappedKeys != "")
        this.typedWord.next(typingMappedKeys);
    });

    this.suggestedOptions = this.languageSuggestion.get('setOfWords')!.valueChanges.pipe(startWith(''), map(value => this._filterSuggestions(value)));
    this.suggestedOptions.subscribe((element) => {
      if (element[0] && element[0]["words"].length != 1000 && this.isSuggestionRequested) {
        this.listOfWordsChips = [this.listOfWordsChips[0]];
        for(let i = 1; i < this.sessionManager.countOfSuggestions.value && element[0]["words"].length != 1000 ; i++) {
          if (element[0]["words"][i-1]) {
            this.listOfWordsChips[i] = element[0]["words"][i-1];
          }
        }
      }
    });
    this.sessionManager.areKeysToBeHighlighted.subscribe((highlightOrNot)=> {
      this.highlightKeys = highlightOrNot;
    });

    this.keysResizePerDeviceWidth();

    this.sessionManager.fontSize.subscribe((size) => {
      this.defaultFontSize = size;
    });

    this.sessionManager.cellSize.subscribe((size) => {
      this.defaultCellSize = size;
    });

    this.sessionManager.unusedKeys.subscribe((value) => {
      this.unusedKeys = value;
    });

    this.sessionManager.triggerWindowsKeys.subscribe((value) => {
      if (value == true && this.layoutCurrentKeys) {
        this.microsoftDetected();
      }
    });

    this.sliderWidth = document.documentElement.clientWidth * 0.65 + "px";
    // Required for updating Syllables in Qwerty Row 2
    if (this.isQwerty && !this.isTransliterate && (this.sessionManager.itemSessionURL.value == "ti" || this.sessionManager.itemSessionURL.value == "tig" || this.sessionManager.itemSessionURL.value == "am" || this.sessionManager.itemSessionURL.value == "geez"))
      this.setSuperPosition();

    this.sessionManager.continousIntegrationComplete.subscribe((value) => {
      this.runProgressIndicator = !value;
    });
  }

  keysResizePerDeviceWidth() {
    if (!this.isQwerty && !this.isTransliterate)
      this.sessionManager.perfectFontCellMatch("row", this.isMobile, this.isTablet, 1, this.layoutCurrentKeys, this.defaultCellSize, this.defaultFontSize, "layouts");
    else if (this.isQwerty && !this.isTransliterate)
      this.sessionManager.perfectFontCellMatch("qwerty", this.isMobile, this.isTablet, 2, this.layoutCurrentKeys, this.defaultCellSize, this.defaultFontSize, "layouts");
    else if (!this.isQwerty && this.isTransliterate)
      this.sessionManager.perfectFontCellMatch("qwertyTrans", this.isMobile, this.isTablet, 3, this.layoutCurrentKeys, this.defaultCellSize, this.defaultFontSize, "layouts");
  }

  private initMap(type): void{
    // For proj4 to work : "allowSyntheticDefaultImports": true added to tsconfig.json
    proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");
    //proj4.defs("EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");
    register(proj4)
    this.projection = GetProjection('EPSG:4326'); //EPSG:4326 without LatLon
    this.projection.setExtent(this.extent);
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
      projection: this.projection
    });
    if(type == 'abjad') {
      this.abjadMap = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'abjadWorldMap',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({})
        ])
      });
    } else if (type == 'alphabet') {
      this.alphabetMap = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'alphabetWorldMap',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({})
        ])
      });
    } else if (type == 'latin') {
      this.latinMap = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'latinWorldMap',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({})
        ])
      });
    } else if (type == 'abugida') {
      this.abugidaMap = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'abugidaWorldMap',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({})
        ])
      });
    } else if (type == 'syllabery') {
      this.syllaberyMap = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'syllaberyWorldMap',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({})
        ])
      });
    } else if (type == 'grams') {
      this.gramsMap = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'gramsWorldMap',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({})
        ])
      });
    } else if (type == 'signs') {
      this.signsMap = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'signsWorldMap',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({})
        ])
      });
    } else if (type == 'codes') {
      this.codesMap = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'codesWorldMap',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({})
        ])
      });
    } else if (type == 'unclassified') {
      this.unclassifiedMap = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'unclassifiedWorldMap',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({})
        ])
      });
    }
  }

  microsoftDetected() {
    // Microsoft Browser Detected
    var self = this;
    for(var i = 0; i < this.layoutCurrentKeys.length; i++) {
      Object.keys(this.layoutCurrentKeys[i]).map((key) => {
        if (key == "qwerty" || key == "qwertyShift" || key == "qwertyTrans" || key == "qwertyShiftTrans" || key == "altGr" || key == "altGrCaps") {
          for (let j in self.layoutCurrentKeys[i][key]) {
            if (this.layoutCurrentKeys[i][key][j].value === "⌘")
              self.layoutCurrentKeys[i][key][j].value = "Ctrl";
          }
        }
      });
    }
  }

  allowingSuperPositionKeys() {
    if (this.isQwerty || this.isTransliterate) {
      this.allowSuperScript = !this.allowSuperScript;
      if (this.allowSuperScript) {
        this.setSuperPosition();
        this.setSuperScriptInLayout();
      }
    }
  }

  setSuperPosition() {
    this.rowSuper = 0, this.columnSuper = 0;
    let qwertyPos = 0, transPos = 0, altGrPos = 0; 
    for(let i = 0; i < this.layoutCurrentKeys.length; i++) {
      Object.keys(this.layoutCurrentKeys[i]).map((key) => {
        if (key != "qwerty" && key != "qwertyShift" && key != "qwertyTrans" && key != "qwertyShiftTrans" && key != "altGr" && key != "altGrCaps")
          qwertyPos++;
        if (key != "qwertyTrans" && key != "qwertyShiftTrans" && key != "altGr" && key != "altGrCaps")
          transPos++;
        if (key != "altGr" && key != "altGrCaps")
          altGrPos++;
      });
    }
    if (this.isQwerty && !this.isShiftKeyPress && !this.isTransliterate && !this.isAltGrKeyPress) {
      this.rowSuper = qwertyPos;
      this.qwertyPos = this.rowSuper;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    } else if (this.isQwerty && this.isShiftKeyPress && !this.isTransliterate && !this.isAltGrKeyPress) {
      this.rowSuper = qwertyPos + 5;
      this.qwertyPos = this.rowSuper;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    } else if (this.isQwerty && !this.isShiftKeyPress && this.isTransliterate && !this.isAltGrKeyPress) {
      this.rowSuper = transPos;
      this.qwertyTranPos = this.rowSuper;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    } else if (this.isQwerty && this.isShiftKeyPress && this.isTransliterate && !this.isAltGrKeyPress) {
      this.rowSuper = transPos + 5;
      this.qwertyTranPos = this.rowSuper;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    } else if (this.isQwerty && !this.isShiftKeyPress && !this.isTransliterate && this.isAltGrKeyPress && this.altGrCapsExists) {
      this.rowSuper = altGrPos;
      this.altGrPos = this.rowSuper;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    } else if (this.isQwerty && this.isShiftKeyPress && !this.isTransliterate && this.isAltGrKeyPress && this.altGrCapsExists) {
      this.rowSuper = altGrPos + 5;
      this.altGrPos = this.rowSuper;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    }
  }

  setSuperScriptInLayout() {
    // Keyboard Layout with push "sup": showSuperScriptCharacter(character)
    for(let i = this.rowSuper; i < (this.rowSuper + 4); i++) {
      Object.keys(this.layoutCurrentKeys[i]).map((key) => {
        if (!this.isShiftKeyPress) {
          if (this.isQwerty && !this.isTransliterate) {
            if (this.isAltGrKeyPress && this.altGrCapsExists) {
              if (key == "altGr") {
                this.layoutCurrentKeys[i][key].map((element)=>{
                  element["sup"] = this.showSuperScriptCharacter(element);
                });
              }
            } else {
              if (key == "qwerty") {
                this.layoutCurrentKeys[i][key].map((element)=>{
                  element["sup"] = this.showSuperScriptCharacter(element);
                });
              }
            }
          } else if (this.isQwerty && this.isTransliterate) {
            if (key == "qwertyTrans") {
              this.layoutCurrentKeys[i][key].map((element)=>{
                element["sup"] = this.showSuperScriptCharacter(element);
              });
            }
          }
        } else {
          if (this.isQwerty && !this.isTransliterate) {
            if (this.isAltGrKeyPress && this.altGrCapsExists) {
              if (key == "altGrCaps") {
                this.layoutCurrentKeys[i][key].map((element)=>{
                  element["sup"] = this.showSuperScriptCharacter(element);
                });
              }
            } else {
              if (key == "qwertyShift") {
                this.layoutCurrentKeys[i][key].map((element)=>{
                  element["sup"] = this.showSuperScriptCharacter(element);
                });
              }
            }
          } else if (this.isQwerty && this.isTransliterate) {
            if (key == "qwertyShiftTrans") {
              this.layoutCurrentKeys[i][key].map((element)=>{
                element["sup"] = this.showSuperScriptCharacter(element);
              });
            }
          }
        }
      });
    }
  }

  layoutRotationPossible() {
    let isRowVertical = false, isRowHorizontal = false;
    for(let i = 0; i < this.layoutCurrentKeys.length; i++) {
      Object.keys(this.layoutCurrentKeys[i]).map((key) => {
        if (key == "rowVert")
          isRowVertical = true;
        if (key != "row")
          isRowHorizontal = true;
      });
    }
    return isRowVertical && isRowHorizontal;
  }

  preventInputFieldForAttacks(eventInput) {
    if (eventInput.key.indexOf("*") > -1 || eventInput.key.indexOf("$") > -1 || eventInput.key.indexOf("%") > -1 || eventInput.key.indexOf("=") > -1 || eventInput.key.indexOf("!") > -1 || eventInput.key.indexOf("?") > -1 || eventInput.key.indexOf("&") > -1 || eventInput.key.indexOf("<") > -1 || eventInput.key.indexOf(">") > -1 || eventInput.key.indexOf("(") > -1 || eventInput.key.indexOf(")") > -1 || eventInput.key.indexOf("{") > -1 || eventInput.key.indexOf("}") > -1) {
      this._snackBar.open(this.translateForSnackBar[1], this.translateForSnackBar[0], {
        duration: 3000,
      });
      setTimeout(()=>{
        this.abjadSearchField.nativeElement.value = "";
        this.alphabetSearchField.nativeElement.value = "";
        this.latinSearchField.nativeElement.value = "";
        this.abugidaSearchField.nativeElement.value = "";
        this.syllaberySearchField.nativeElement.value = "";
        this.gramsSearchField.nativeElement.value = "";
        this.unclassifiedSearchField.nativeElement.value = "";
      }, 200);
    }
  }

  pasteInputFieldForAttacks(eventInput) {
    setTimeout(() => {
      if (eventInput.target.value.indexOf("*") > -1 || eventInput.target.value.indexOf("$") > -1 || eventInput.target.value.indexOf("%") > -1 || eventInput.target.value.indexOf("=") > -1 || eventInput.target.value.indexOf("!") > -1 || eventInput.target.value.indexOf("?") > -1 || eventInput.target.value.indexOf("&") > -1 || eventInput.target.value.indexOf("<") > -1 || eventInput.target.value.indexOf(">") > -1 || eventInput.target.value.indexOf("(") > -1 || eventInput.target.value.indexOf(")") > -1 || eventInput.target.value.indexOf("{") > -1 || eventInput.target.value.indexOf("}") > -1) {
        this._snackBar.open(this.translateForSnackBar[1], this.translateForSnackBar[0], {
          duration: 3000,
        });
        setTimeout(()=>{
          this.abjadSearchField.nativeElement.value = "";
          this.alphabetSearchField.nativeElement.value = "";
          this.latinSearchField.nativeElement.value = "";
          this.abugidaSearchField.nativeElement.value = "";
          this.syllaberySearchField.nativeElement.value = "";
          this.gramsSearchField.nativeElement.value = "";
          this.unclassifiedSearchField.nativeElement.value = "";
        }, 200);
      }
      eventInput.stopPropagation();
    });
  }

  showMapPerScriptType(type) {
    // Map initialisation : https://medium.com/runic-software/a-simple-guide-to-openlayers-in-angular-b10f6feb3df1
    // Quick Start - https://openlayers.org/en/latest/doc/quickstart.html

    if (type == 'abjad') {
      if (!this.abjadMap) {
        this.zone.runOutsideAngular(() => this.initMap(type));
      }
      this.toggleAbjad = true;
      document.getElementById('infoAbjadText').innerText = "";
      document.getElementById('showAbjadText').innerText = "";
      this.abjadMap.setTarget('abjadWorldMap');
      setTimeout(()=> this.mapReady.emit(this.abjadMap));
    } else if (type == 'alphabet') {
      if (!this.alphabetMap) {
        this.zone.runOutsideAngular(() => this.initMap(type));
      }
      this.toggleAlphabet = true;
      document.getElementById('infoAlphabetText').innerText = "";
      document.getElementById('showAlphabetText').innerText = "";
      this.alphabetMap.setTarget('alphabetWorldMap');
      setTimeout(()=> this.mapReady.emit(this.alphabetMap));
    } else if (type == 'latin') {
      if (!this.latinMap) {
        this.zone.runOutsideAngular(() => this.initMap(type));
      }
      this.toggleLatin = true;
      document.getElementById('infoLatinText').innerText = "";
      document.getElementById('showLatinText').innerText = "";
      this.latinMap.setTarget('latinWorldMap');
      setTimeout(()=> this.mapReady.emit(this.latinMap));
    } else if (type == 'abugida') {
      if (!this.abugidaMap) {
        this.zone.runOutsideAngular(() => this.initMap(type));
      }
      this.toggleAbugida = true;
      document.getElementById('infoAbugidaText').innerText = "";
      document.getElementById('showAbugidaText').innerText = "";
      this.abugidaMap.setTarget('abugidaWorldMap');
      setTimeout(()=> this.mapReady.emit(this.abugidaMap));
    } else if (type == 'syllabery') {
      if (!this.syllaberyMap) {
        this.zone.runOutsideAngular(() => this.initMap(type));
      }
      this.toggleSyllabery = true;
      document.getElementById('infoSyllaberyText').innerText = "";
      document.getElementById('showSyllaberyText').innerText = "";
      this.syllaberyMap.setTarget('syllaberyWorldMap');
      setTimeout(()=> this.mapReady.emit(this.syllaberyMap));
    } else if (type == 'grams') {
      if (!this.gramsMap) {
        this.zone.runOutsideAngular(() => this.initMap(type));
      }
      this.toggleGrams = true;
      document.getElementById('infoGramsText').innerText = "";
      document.getElementById('showGramsText').innerText = "";
      this.gramsMap.setTarget('gramsWorldMap');
      setTimeout(()=> this.mapReady.emit(this.gramsMap));
    } else if (type == 'signs') {
      if (!this.signsMap) {
        this.zone.runOutsideAngular(() => this.initMap(type));
      }
      this.toggleSigns = true;
      this.signsMap.setTarget('signsWorldMap');
      setTimeout(()=> this.mapReady.emit(this.signsMap));
    } else if (type == 'codes') {
      if (!this.codesMap) {
        this.zone.runOutsideAngular(() => this.initMap(type));
      }
      this.toggleCodes = true;
      this.codesMap.setTarget('codesWorldMap');
      setTimeout(()=> this.mapReady.emit(this.codesMap));
    } else if (type == 'unclassified') {
      if (!this.unclassifiedMap) {
        this.zone.runOutsideAngular(() => this.initMap(type));
      }
      this.toggleUnclassified = true;
      document.getElementById('infoUnclassifiedText').innerText = "";
      document.getElementById('showUnclassifiedText').innerText = "";
      this.unclassifiedMap.setTarget('unclassifiedWorldMap');
      setTimeout(()=> this.mapReady.emit(this.unclassifiedMap));
    }

    const waitForMap = setInterval(function() {
      if (document.getElementsByClassName("ol-viewport").length > 0) {
          window.dispatchEvent(new Event('resize'));
          clearInterval(waitForMap);
      }
    }, 100);
  }

  private _filterSuggestions(value: string): AvailableWordSuggestions[] {
    if (value) {
      return this.allSuggestionsForLanguage
                 .map(list => ({words: _filter(list.words, value)}))
                 .filter(list => list.words.length > 0);
    }
    return this.allSuggestionsForLanguage;
  }

  async populateSuggestionsForLanguage(ISO_Code) {
    var self = this;
    if (localStorage.getItem("ltpaToken") && ISO_Code == this.sessionManager.getFromSessionURL() && this.sessionManager.getOfflineOnly() == false)
      this.allSuggestionsForLanguage = await this.loadSuggestionsFile(ISO_Code);
    else if (this.sessionManager.getOfflineOnly()) {
      var self = this;
      var language_script_name = (this.keyboardLayouts[ISO_Code][2].indexOf("(") > -1 && ISO_Code != "zhcn" && ISO_Code != "zhtw") ? this.keyboardLayouts[ISO_Code][2].toLowerCase().split("(")[0] : this.keyboardLayouts[ISO_Code][2].toLowerCase();
      language_script_name = (language_script_name.indexOf(" ") > -1) ? language_script_name.split(" ")[0] : language_script_name;
      this.http.get<[]>(`assets/suggestionWords/${language_script_name}.json`).subscribe(
        suggestionlist => {
          if (suggestionlist) {
            let myLanguageWordList = [{"words":[]}];
            for(let i = 0; i < suggestionlist.length; i++) {
              myLanguageWordList[0]["words"][i] = suggestionlist[i][language_script_name];
            }
            self.allSuggestionsForLanguage = myLanguageWordList;
          } else
          self.allSuggestionsForLanguage = [];
        },
        errorLocal => {
          console.error("[MUlTISCRIPTEDITOR] Loading Suggestions File - Data yet to be Included for", self.keyboardLayouts[ISO_Code][2], errorLocal);
          self.allSuggestionsForLanguage = [];
        });
    }
    setTimeout(async ()=>{      
      // The Angular Server isn't restarted and regular reloading of the Suggestion Words JSON file is done on Client-side
      if (ISO_Code == this.sessionManager.getFromSessionURL())
        self.populateSuggestionsForLanguage(ISO_Code);
    }, 30000);
  }

  loadSuggestionsFile(ISO_Code) {
    return new Promise<any>((resolve, reject)=> {
      var language_script_name = (this.keyboardLayouts[ISO_Code][2].indexOf("(") > -1 && ISO_Code != "zhcn" && ISO_Code != "zhtw") ? this.keyboardLayouts[ISO_Code][2].toLowerCase().split("(")[0] : this.keyboardLayouts[ISO_Code][2].toLowerCase();
      language_script_name = (language_script_name.indexOf(" ") > -1) ? language_script_name.split(" ")[0] : language_script_name;
      this.sessionManager.retrieveSuggestionsFromServer(ISO_Code).subscribe((suggestionlist) => {
        console.info("[MUlTISCRIPTEDITOR] Suggestion for the currently used language is retrieved ", language_script_name);
        if (suggestionlist) {
            let myLanguageWordList = [{"words":[]}];
            for(let i = 0; i < suggestionlist.length; i++) {
              myLanguageWordList[0]["words"][i] = suggestionlist[i][language_script_name];
            }
            resolve(myLanguageWordList);
          } else
            resolve([]);
      }, (errorNetwork) => {
        console.info("[MUlTISCRIPTEDITOR] Unable to retrieve from Network ", errorNetwork);
        console.info("[MUlTISCRIPTEDITOR] Suggestion for the currently used language is retrieved locally ", language_script_name);
        this.http.get<[]>(`assets/suggestionWords/${language_script_name}.json`).subscribe(
          suggestionlist => {
            if (suggestionlist) {
              let myLanguageWordList = [{"words":[]}];
              for(let i = 0; i < suggestionlist.length; i++) {
                myLanguageWordList[0]["words"][i] = suggestionlist[i][language_script_name];
              }
              resolve(myLanguageWordList);
            } else
              resolve([]);
          },
          errorLocal => {
            console.error("[MUlTISCRIPTEDITOR] Loading Suggestions File - Data yet to be Included for", this.keyboardLayouts[ISO_Code][2], errorLocal);
            resolve([]);
          });
      });
    });
  }

  resetForAKeyboard() {
    this.sessionManager.setShiftKeyPressed(false);
    this.isShiftKeyPress = false;
    this.sessionManager.setAltGrKeyPressed(false);
    this.isAltGrKeyPress = false;
    this.altGrCapsExists = (this.layoutCurrentKeys) ? this.layoutCurrentKeys.some(x => x.hasOwnProperty('altGrCaps')) : false;
    if (this.layoutCurrentKeys && this.layoutCurrentKeys.some(x => x.hasOwnProperty('qwerty')) == true) {
      this.sessionManager.setAvalabilityOfTypewriter(true);
    } else {
      this.sessionManager.setAvalabilityOfTypewriter(false);
      this.sessionManager.setInSessionQwerty(false);
    }
    if (this.imageAlternativeScript.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
    this.listOfWordsChips = [];
    this.typedWord.next("");
    if (this.allowSuperScript && (this.isQwerty || this.isTransliterate))
      this.setSuperPosition();
    this.sessionManager.setTransliterate(false);
    if (this.switchScriptDirection == true)
      this.renderBiDi(false);
    if (this.layoutCurrentKeys && this.sessionManager.triggerWindowsKeys.value == true)
      this.microsoftDetected();
    if (this.sessionManager.isSendInitialLoadDataAllowed() == 'true') {
      this.sessionManager.sendDataToServerAtSessionBegin().subscribe(() => {
        // Session Manager Service sends these Device, Browser, Locale & User Interface Data
        console.info("[MUlTISCRIPTEDITOR] User's Choice Session Data is sent to server");
      });
    }
  }

  tabLoadShow(instance, position) {
    instance.selectedAllScriptTab = instance.keyboardLayouts[position][0];
    instance.selectKeysTabs = instance.keyboardLayouts[position][1];
  }

  navigateTabs(instance, tabGroup, scriptCode) {
    let currentDifferenceIndex = instance.keyboardLayouts[scriptCode][1] - instance.selectKeysTabs;
    instance.allScriptTypesTabGroup.selectedIndex = instance.keyboardLayouts[scriptCode][0];
    if ((currentDifferenceIndex >= 0 && currentDifferenceIndex < 25) || (currentDifferenceIndex > -25 && currentDifferenceIndex < 0)) {
      tabGroup.selectedIndex = instance.keyboardLayouts[scriptCode][1];
    } else if ((currentDifferenceIndex >= 25 && currentDifferenceIndex < 50) || (currentDifferenceIndex <= -25 && currentDifferenceIndex > -50)) {
      tabGroup.selectedIndex = 24;
      setTimeout(() => {
        tabGroup.selectedIndex = instance.keyboardLayouts[scriptCode][1];
      }, 300);
    } else if ((currentDifferenceIndex >= 50 && currentDifferenceIndex < 75) || (currentDifferenceIndex <= -50 && currentDifferenceIndex > -75)) {
      tabGroup.selectedIndex = 24;
      setTimeout(() => {
        tabGroup.selectedIndex = 49;
      }, 300);
      setTimeout(() => {
        tabGroup.selectedIndex = instance.keyboardLayouts[scriptCode][1];
      }, 600);
    } else if ((currentDifferenceIndex >= 75) || (currentDifferenceIndex <= -75)) {
      tabGroup.selectedIndex = 24;
      setTimeout(() => {
        tabGroup.selectedIndex = 49;
      }, 300);
      setTimeout(() => {
        tabGroup.selectedIndex = 74;
      }, 600);
      setTimeout(() => {
        tabGroup.selectedIndex = instance.keyboardLayouts[scriptCode][1];
      }, 900);
    }
  }

  allScriptTypesTabs(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    if (this.switchScriptDirection == true)
      this.renderBiDi(false);
    this.switchTypingDirection((this.rtlLocales.indexOf(this.sessionManager.getFromSessionURL()) > - 1)? 'rtl': 'ltr');
    this.showImageGlyph = false;
    if (tabChangeEvent.index == 0) {
      this.sessionManager.setInSessionURL('ar');
    } else if (tabChangeEvent.index == 1) {
      this.sessionManager.setInSessionURL('la');
    } else if (tabChangeEvent.index == 2) {
      this.sessionManager.setInSessionURL('brah');
    } else if (tabChangeEvent.index == 3) {
      this.sessionManager.setInSessionURL('cans');
    } else if (tabChangeEvent.index == 4) {
      this.sessionManager.setInSessionURL('zhcn');
    } else if (tabChangeEvent.index == 5) {
      this.sessionManager.setInSessionURL('iub');
    } else if (tabChangeEvent.index == 6) {
      this.sessionManager.setInSessionURL('sgnw');
    } else if (tabChangeEvent.index == 7) {
      this.sessionManager.setInSessionURL('all');
    } else if (tabChangeEvent.index == 8) {
      this.sessionManager.setInSessionURL('linea');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.resetForAKeyboard();
    this.verifyThisKeyboardHasQwerty();
    this.initSwara();
    this.selectKeysTabs = 0;
  }

  abjadType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
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
    } else if (tabChangeEvent.index == 5 && tabChangeEvent.tab.textLabel == "𐼼𐼴𐼶𐼹𐼷𐼸‎") {
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
    } else if (tabChangeEvent.index == 11 && tabChangeEvent.tab.textLabel == "𐴌𐴟𐴇𐴥𐴝𐴚𐴒𐴙𐴝 𐴇𐴝𐴕𐴞𐴉𐴞") {
      this.sessionManager.setInSessionURL('rohg');
    } else if (tabChangeEvent.index == 12 && tabChangeEvent.tab.textLabel == "Old Sinaitic") {
      this.sessionManager.setInSessionURL('sina');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.resetForAKeyboard();
    this.verifyThisKeyboardHasQwerty();
  }

  allAbjadTypeClicked(scriptCode) {
    this.keysToRotate = false;
    if (this.imageAlternativeScript.indexOf(scriptCode) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
    this.tabLoadShow(this, scriptCode);
    this.tabGroupAbjad.selectedIndex = this.selectKeysTabs;
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.resetForAKeyboard();
    this.sessionManager.setInSessionURL(scriptCode);
    this.panelAbjadState = !this.panelAbjadState;
    if(this.toggleAbjad == false) {
      document.getElementById('infoAbjadText').innerText = this.localisedKeyboardLayouts[scriptCode][5] + " | " + this.localisedKeyboardLayouts[scriptCode][2] + " | " + this.chronoTimelineAbjad(this.localisedKeyboardLayouts[scriptCode][7]) + " ";
    }
  }

  alphabetType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    if (tabChangeEvent.index == 0 && tabChangeEvent.tab.textLabel == "Latīnum") {
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
      this.sessionManager.setInSessionURL('mon');
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
    } else if (tabChangeEvent.index == 12 && tabChangeEvent.tab.textLabel == "ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ") {
      this.sessionManager.setInSessionURL('copt');
    } else if (tabChangeEvent.index == 13 && tabChangeEvent.tab.textLabel == "Ⰳⰾⰰⰳⱁⰾⰹⱌⰰ") {
      this.sessionManager.setInSessionURL('glag');
    } else if (tabChangeEvent.index == 14 && tabChangeEvent.tab.textLabel == "Mru") {
      this.sessionManager.setInSessionURL('mroo');
    } else if (tabChangeEvent.index == 15 && tabChangeEvent.tab.textLabel == "𐤮𐤱𐤠𐤭𐤣𐤶𐤯𐤦𐤳") {
      this.sessionManager.setInSessionURL('lydi');
    } else if (tabChangeEvent.index == 16 && tabChangeEvent.tab.textLabel == "𐲥𐳋𐳓𐳉𐳗-𐲘𐳀𐳎𐳀𐳢 𐲢𐳛𐳮𐳀𐳤") {
      this.sessionManager.setInSessionURL('hung');
    } else if (tabChangeEvent.index == 17 && tabChangeEvent.tab.textLabel == "𐌉𐌕𐌀𐌋𐌉𐌂") {
      this.sessionManager.setInSessionURL('ital');
    } else if (tabChangeEvent.index == 18 && tabChangeEvent.tab.textLabel == "𐌀𐌍𐌍𐌄𐌔𐌀𐌓") {
      this.sessionManager.setInSessionURL('ett');
    } else if (tabChangeEvent.index == 19 && tabChangeEvent.tab.textLabel == "ᚑᚌᚆᚐᚋ") {
      this.sessionManager.setInSessionURL('ogam');
    } else if (tabChangeEvent.index == 20 && tabChangeEvent.tab.textLabel == "ᚱᚢᚾᛖᛋ(ᚠᚢᚦᚨᚱᚲ)") {
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
    } else if (tabChangeEvent.index == 31 && tabChangeEvent.tab.textLabel == "𑃐𑃦𑃝𑃗 𑃐𑃦𑃖𑃣𑃗") {
      this.sessionManager.setInSessionURL('sora');
    } else if (tabChangeEvent.index == 32 && tabChangeEvent.tab.textLabel == "𖫢𖫧𖫳𖫒𖫨𖫰𖫨𖫱") {
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
    } else if (tabChangeEvent.index == 47 && tabChangeEvent.tab.textLabel == "Avoiuli") {
      this.sessionManager.setInSessionURL('avo');
    } else if (tabChangeEvent.index == 48 && tabChangeEvent.tab.textLabel == "An Cló Ᵹaelach") {
      this.sessionManager.setInSessionURL('gael');
    } else if (tabChangeEvent.index == 49 && tabChangeEvent.tab.textLabel == "𞄀𞄩𞄰𞄁𞄓𞄱𞄂𞄤𞄳𞄬𞄃𞄤𞄳‎") {
      this.sessionManager.setInSessionURL('hmnp');
    } else if (tabChangeEvent.index == 50 && tabChangeEvent.tab.textLabel == "Wolofal") {
      this.sessionManager.setInSessionURL('woal');
    } else if (tabChangeEvent.index == 51 && tabChangeEvent.tab.textLabel == "Old Arabic") {
      this.sessionManager.setInSessionURL('arold');
    } else if (tabChangeEvent.index == 53 && tabChangeEvent.tab.textLabel == "𑫀𑫕𑫢𑫯𑫍𑫗𑫠𑫦𑫈𑫕𑫢𑫴𑫂𑫕𑫤𑫷") {
      this.sessionManager.setInSessionURL('pauc');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.resetForAKeyboard();
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
    this.navigateTabs(this, this.tabGroupAlphabet, scriptCode);
    this.tabLoadShow(this, scriptCode);
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.resetForAKeyboard();
    this.sessionManager.setInSessionURL(scriptCode);
    this.panelAlphabetState = !this.panelAlphabetState;
    if(this.toggleAlphabet == false) {
      document.getElementById('infoAlphabetText').innerText = this.localisedKeyboardLayouts[scriptCode][5] + " | " + this.localisedKeyboardLayouts[scriptCode][2] + " | " + this.chronoTimelineAlphabet(this.localisedKeyboardLayouts[scriptCode][7]) + " ";
    }
  }

  abugidaType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
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
      this.sessionManager.setInSessionURL('si');
    } else if (tabChangeEvent.index == 13 && tabChangeEvent.tab.textLabel == "Ranjana‎") {
      this.sessionManager.setInSessionURL('ranj');
    } else if (tabChangeEvent.index == 14 && tabChangeEvent.tab.textLabel == "བོད་སྐད་") {
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
    } else if (tabChangeEvent.index == 21 && tabChangeEvent.tab.textLabel == "𖬖𖬰𖬝𖬵 𖬄𖬶𖬟 𖬌𖬣𖬵") {
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
      this.sessionManager.setInSessionURL('orkh');
    } else if (tabChangeEvent.index == 35 && tabChangeEvent.tab.textLabel == "𑠖𑠵𑠌𑠤𑠮") {
      this.sessionManager.setInSessionURL('dogr');
    } else if (tabChangeEvent.index == 36 && tabChangeEvent.tab.textLabel == "ᨲ᩠ᩅᩫᨾᩮᩥᩬᨦ") {
      this.sessionManager.setInSessionURL('lana');
    } else if (tabChangeEvent.index == 37 && tabChangeEvent.tab.textLabel == "𑌗𑍍𑌰𑌨𑍍𑌥") {
      this.sessionManager.setInSessionURL('gran');
    } else if (tabChangeEvent.index == 38 && tabChangeEvent.tab.textLabel == "Kadamba") {
      this.sessionManager.setInSessionURL('kada');
    } else if (tabChangeEvent.index == 39 && tabChangeEvent.tab.textLabel == "ꦏꦮꦶ") {
      this.sessionManager.setInSessionURL('kawi');
    } else if (tabChangeEvent.index == 40 && tabChangeEvent.tab.textLabel == "𐨑𐨪𐨆𐨮𐨿𐨛𐨁𐨌") {
      this.sessionManager.setInSessionURL('khar');
    } else if (tabChangeEvent.index == 41 && tabChangeEvent.tab.textLabel == "Tocharian") {
      this.sessionManager.setInSessionURL('toch');
    } else if (tabChangeEvent.index == 42 && tabChangeEvent.tab.textLabel == "𑘦𑘻𑘚𑘲") {
      this.sessionManager.setInSessionURL('modi');
    } else if (tabChangeEvent.index == 43 && tabChangeEvent.tab.textLabel == "𑆯𑆳𑆫𑆢𑆳") {
      this.sessionManager.setInSessionURL('shrd');
    } else if (tabChangeEvent.index == 44 && tabChangeEvent.tab.textLabel == "𑖭𑖰𑖟𑖿𑖠𑖽") {
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
    } else if (tabChangeEvent.index == 51 && tabChangeEvent.tab.textLabel == "𑊠𑊣𑊖𑊚") {
      this.sessionManager.setInSessionURL('mult');
    } else if (tabChangeEvent.index == 52 && tabChangeEvent.tab.textLabel == "𑅬𑅱𑅐𑅛𑅧𑅑") {
      this.sessionManager.setInSessionURL('maha');
    } else if (tabChangeEvent.index == 53 && tabChangeEvent.tab.textLabel == "𑚔𑚭𑚊𑚤𑚯") {
      this.sessionManager.setInSessionURL('takr');
    } else if (tabChangeEvent.index == 54 && tabChangeEvent.tab.textLabel == "𑈉𑈲𑈐𑈈𑈮") {
      this.sessionManager.setInSessionURL('khoj');
    } else if (tabChangeEvent.index == 55 && tabChangeEvent.tab.textLabel == "𑊻𑋩𑋣𑋏𑋠𑋔𑋠𑋏𑋢") {
      this.sessionManager.setInSessionURL('khud');
    } else if (tabChangeEvent.index == 56 && tabChangeEvent.tab.textLabel == "Mwangwego") {
      this.sessionManager.setInSessionURL('mwan');
    } else if (tabChangeEvent.index == 57 && tabChangeEvent.tab.textLabel == "Rencong") {
      this.sessionManager.setInSessionURL('renc');
    } else if (tabChangeEvent.index == 58 && tabChangeEvent.tab.textLabel == "𑜒𑜑𑜪𑜨") {
      this.sessionManager.setInSessionURL('ahom');
    } else if (tabChangeEvent.index == 59 && tabChangeEvent.tab.textLabel == "Khimhun") {
      this.sessionManager.setInSessionURL('tang');
    } else if (tabChangeEvent.index == 60 && tabChangeEvent.tab.textLabel == "Zanabazar") {
      this.sessionManager.setInSessionURL('zanb');
    } else if (tabChangeEvent.index == 61 && tabChangeEvent.tab.textLabel == "Tanchangya") {
      this.sessionManager.setInSessionURL('tach');
    } else if (tabChangeEvent.index == 62 && tabChangeEvent.tab.textLabel == "𑰥𑰹𑰎𑰿𑰬𑰲𑰎𑰱") {
      this.sessionManager.setInSessionURL('bhai');
    } else if (tabChangeEvent.index == 63 && tabChangeEvent.tab.textLabel == "Dham") {
      this.sessionManager.setInSessionURL('dham');
    } else if (tabChangeEvent.index == 64 && tabChangeEvent.tab.textLabel == "𑐥𑑂𑐬𑐔𑐮𑐶𑐟") {
      this.sessionManager.setInSessionURL('newa');
    } else if (tabChangeEvent.index == 65 && tabChangeEvent.tab.textLabel == "Laṇḍā") {
      this.sessionManager.setInSessionURL('land');
    } else if (tabChangeEvent.index == 66 && tabChangeEvent.tab.textLabel == "Tikamuli") {
      this.sessionManager.setInSessionURL('tika');
    } else if (tabChangeEvent.index == 67 && tabChangeEvent.tab.textLabel == "Khema") {
      this.sessionManager.setInSessionURL('tamu');
    } else if (tabChangeEvent.index == 68 && tabChangeEvent.tab.textLabel == "ꓡꓲ-ꓢꓴ") {
      this.sessionManager.setInSessionURL('lis');
    } else if (tabChangeEvent.index == 73 && tabChangeEvent.tab.textLabel == "Miao") {
      this.sessionManager.setInSessionURL('plrd');
    } else if (tabChangeEvent.index == 74 && tabChangeEvent.tab.textLabel == "𑵶𑶍𑶕𑶀𑵵𑶊 𑵶𑶓𑶕𑶂𑶋 𑵵𑶋𑶅𑶋‎") {
      this.sessionManager.setInSessionURL('gong');
    } else if (tabChangeEvent.index == 75 && tabChangeEvent.tab.textLabel == "Ariyaka") {
      this.sessionManager.setInSessionURL('ari');
    } else if (tabChangeEvent.index == 77 && tabChangeEvent.tab.textLabel == "𑲄𑲮𑱵 𑲄𑲮𑲲𑱵") {
      this.sessionManager.setInSessionURL('marc');
    } else if (tabChangeEvent.index == 82 && tabChangeEvent.tab.textLabel == "Leke") {
      this.sessionManager.setInSessionURL('leke');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.resetForAKeyboard();
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
    this.navigateTabs(this, this.tabGroupAbugida, scriptCode);
    this.tabLoadShow(this, scriptCode);
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.resetForAKeyboard();
    this.sessionManager.setInSessionURL(scriptCode);
    this.initSwara();
    this.panelAbugidaState = !this.panelAbugidaState;
    if(this.toggleAbugida == false) {
      document.getElementById('infoAbugidaText').innerText = this.localisedKeyboardLayouts[scriptCode][5] + " | " + this.localisedKeyboardLayouts[scriptCode][2] + " | " + this.chronoTimelineAbugida(this.localisedKeyboardLayouts[scriptCode][7]) + " ";
    }
  }

  syllaberyType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    if (tabChangeEvent.index == 0 && tabChangeEvent.tab.textLabel == "ᐃᓄᒃᑎᑐᑦ") {
      this.sessionManager.setInSessionURL('cans');
    } else if (tabChangeEvent.index == 1 && tabChangeEvent.tab.textLabel == "ひらがな") {
      this.sessionManager.setInSessionURL('hira');
    } else if (tabChangeEvent.index == 2 && tabChangeEvent.tab.textLabel == "カタカナ") {
      this.sessionManager.setInSessionURL('kata');
    } else if (tabChangeEvent.index == 3 && tabChangeEvent.tab.textLabel == "ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ") {
      this.sessionManager.setInSessionURL('cher');
    } else if (tabChangeEvent.index == 4 && tabChangeEvent.tab.textLabel == "ꆈꌠꁱꂷ") {
      this.sessionManager.setInSessionURL('yiii');
    } else if (tabChangeEvent.index == 6 && tabChangeEvent.tab.textLabel == "ꕙꔤ") {
      this.sessionManager.setInSessionURL('vaii');
    } else if (tabChangeEvent.index == 8 && tabChangeEvent.tab.textLabel == "𛆁𛈬") {
      this.sessionManager.setInSessionURL('nshu');
    } else if (tabChangeEvent.index == 9 && tabChangeEvent.tab.textLabel == "𞠀𞠁𞠂") {
      this.sessionManager.setInSessionURL('mend');
    } else if (tabChangeEvent.index == 10 && tabChangeEvent.tab.textLabel == "Loma") {
      this.sessionManager.setInSessionURL('loma');
    } else if (tabChangeEvent.index == 11 && tabChangeEvent.tab.textLabel == "Kpelle") {
      this.sessionManager.setInSessionURL('kpe');
    } else if (tabChangeEvent.index == 12 && tabChangeEvent.tab.textLabel == "Iberian") {
      this.sessionManager.setInSessionURL('ibe');
    } else if (tabChangeEvent.index == 13 && tabChangeEvent.tab.textLabel == "Iban") {
      this.sessionManager.setInSessionURL('iba');
    } else if (tabChangeEvent.index == 14 && tabChangeEvent.tab.textLabel == "Eskaya") {
      this.sessionManager.setInSessionURL('esy');
    } else if (tabChangeEvent.index == 15 && tabChangeEvent.tab.textLabel == "Celtiberian") {
      this.sessionManager.setInSessionURL('xce');
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
    } else if (tabChangeEvent.index == 21 && tabChangeEvent.tab.textLabel == "Tartessian") {
      this.sessionManager.setInSessionURL('txr');
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
    } else if (tabChangeEvent.index == 27 && tabChangeEvent.tab.textLabel == "Taino") {
      this.sessionManager.setInSessionURL('tnq');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.resetForAKeyboard();
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
    this.tabLoadShow(this, scriptCode);
    this.allScriptTypesTabGroup.selectedIndex = this.selectedAllScriptTab;
    this.tabGroupSyllabery.selectedIndex = this.selectKeysTabs;
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.resetForAKeyboard();
    this.sessionManager.setInSessionURL(scriptCode);
    this.panelSyllaberyState = !this.panelSyllaberyState;
    if(this.toggleSyllabery == false) {
      document.getElementById('infoSyllaberyText').innerText = this.localisedKeyboardLayouts[scriptCode][5] + " | " + this.localisedKeyboardLayouts[scriptCode][2] + " | " + this.chronoTimelineSyllabery(this.localisedKeyboardLayouts[scriptCode][7]) + " ";
    }
  }

  gramsType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    if (tabChangeEvent.index == 0 && tabChangeEvent.tab.textLabel == "汉语") {
      this.sessionManager.setInSessionURL('zhcn');
    } else if (tabChangeEvent.index == 1 && tabChangeEvent.tab.textLabel == "漢語") {
      this.sessionManager.setInSessionURL('zhtw');
    } else if (tabChangeEvent.index == 2 && tabChangeEvent.tab.textLabel == "日本語") {
      this.sessionManager.setInSessionURL('ja');
    } else if (tabChangeEvent.index == 3 && tabChangeEvent.tab.textLabel == "𒅴𒂠 - 𒀝𒅗𒁺𒌑") {
      this.sessionManager.setInSessionURL('sux');
    } else if (tabChangeEvent.index == 4 && tabChangeEvent.tab.textLabel == "𓆎𓅓𓏏𓊖") {
      this.sessionManager.setInSessionURL('kmt');
    } else if (tabChangeEvent.index == 5 && tabChangeEvent.tab.textLabel == "Meroïtic") {
      this.sessionManager.setInSessionURL('mer');
    } else if (tabChangeEvent.index == 6 && tabChangeEvent.tab.textLabel == "Luwian") {
      this.sessionManager.setInSessionURL('luw');
    } else if (tabChangeEvent.index == 9 && tabChangeEvent.tab.textLabel == "𗼇𗟲") {
      this.sessionManager.setInSessionURL('txg');
    } else if (tabChangeEvent.index == 11 && tabChangeEvent.tab.textLabel == "Geba") {
      this.sessionManager.setInSessionURL('geba');
    } else if (tabChangeEvent.index == 16 && tabChangeEvent.tab.textLabel == "Nahuatl") {
      this.sessionManager.setInSessionURL('aztc');
    } else if (tabChangeEvent.index == 18 && tabChangeEvent.tab.textLabel == "甲骨文") {
      this.sessionManager.setInSessionURL('jiag');
    } else if (tabChangeEvent.index == 21 && tabChangeEvent.tab.textLabel == "カイダ") {
      this.sessionManager.setInSessionURL('kaid');
    } else if (tabChangeEvent.index == 22 && tabChangeEvent.tab.textLabel == "Mi’kmaq") {
      this.sessionManager.setInSessionURL('mikq');
    } else if (tabChangeEvent.index == 25 && tabChangeEvent.tab.textLabel == "Nsibidi") {
      this.sessionManager.setInSessionURL('nsi');
    } else if (tabChangeEvent.index == 26 && tabChangeEvent.tab.textLabel == "Khitan") {
      this.sessionManager.setInSessionURL('kits');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.resetForAKeyboard();
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
    this.tabLoadShow(this, scriptCode);
    this.allScriptTypesTabGroup.selectedIndex = this.selectedAllScriptTab;
    this.tabGroupGrams.selectedIndex = this.selectKeysTabs;
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.resetForAKeyboard();
    this.sessionManager.setInSessionURL(scriptCode);
    this.panelGramsState = !this.panelGramsState;
    if(this.toggleGrams == false) {
      document.getElementById('infoGramsText').innerText = this.localisedKeyboardLayouts[scriptCode][5] + " | " + this.localisedKeyboardLayouts[scriptCode][2] + " | " + this.chronoTimelineGrams(this.localisedKeyboardLayouts[scriptCode][7]) + " ";
    }
  }

  unclassifiedType(tabChangeEvent: MatTabChangeEvent) {
    this.keysToRotate = false;
    if (tabChangeEvent.index == 0 && tabChangeEvent.tab.textLabel == "Konar Sanda") {
      this.sessionManager.setInSessionURL('kosan');
    } else if (tabChangeEvent.index == 1 && tabChangeEvent.tab.textLabel == "Paucartambo") {
      this.sessionManager.setInSessionURL('pauo');
    } else if (tabChangeEvent.index == 2 && tabChangeEvent.tab.textLabel == "Aymara") {
      this.sessionManager.setInSessionURL('ayma');
    } else if (tabChangeEvent.index == 3 && tabChangeEvent.tab.textLabel == "Quipu") {
      this.sessionManager.setInSessionURL('quip');
    } else if (tabChangeEvent.index == 4 && tabChangeEvent.tab.textLabel == "Tărtăria") {
      this.sessionManager.setInSessionURL('tart');
    } else if (tabChangeEvent.index == 5 && tabChangeEvent.tab.textLabel == "Banpo") {
      this.sessionManager.setInSessionURL('banp');
    } else if (tabChangeEvent.index == 6 && tabChangeEvent.tab.textLabel == "Byblos") {
      this.sessionManager.setInSessionURL('bybl');
    } else if (tabChangeEvent.index == 7 && tabChangeEvent.tab.textLabel == "Cretan") {
      this.sessionManager.setInSessionURL('cret');
    } else if (tabChangeEvent.index == 8 && tabChangeEvent.tab.textLabel == "Proto Elamite") {
      this.sessionManager.setInSessionURL('proel');
    } else if (tabChangeEvent.index == 9 && tabChangeEvent.tab.textLabel == "Old Elamite") {
      this.sessionManager.setInSessionURL('oldel');
    } else if (tabChangeEvent.index == 10 && tabChangeEvent.tab.textLabel == "Isthmian") {
      this.sessionManager.setInSessionURL('isthm');
    } else if (tabChangeEvent.index == 11 && tabChangeEvent.tab.textLabel == "Jiahu") {
      this.sessionManager.setInSessionURL('jiah');
    } else if (tabChangeEvent.index == 12 && tabChangeEvent.tab.textLabel == "Linear A") {
      this.sessionManager.setInSessionURL('linea');
    } else if (tabChangeEvent.index == 13 && tabChangeEvent.tab.textLabel == "Cypriot Minoan") {
      this.sessionManager.setInSessionURL('cymin');
    } else if (tabChangeEvent.index == 14 && tabChangeEvent.tab.textLabel == "Abaj-Takalik Kaminaljuyú") {
      this.sessionManager.setInSessionURL('abtak');
    } else if (tabChangeEvent.index == 15 && tabChangeEvent.tab.textLabel == "Mixtec") {
      this.sessionManager.setInSessionURL('mixt');
    } else if (tabChangeEvent.index == 16 && tabChangeEvent.tab.textLabel == "Olmec") {
      this.sessionManager.setInSessionURL('olme');
    } else if (tabChangeEvent.index == 17 && tabChangeEvent.tab.textLabel == "Phaistos") {
      this.sessionManager.setInSessionURL('phais');
    } else if (tabChangeEvent.index == 18 && tabChangeEvent.tab.textLabel == "Rongorongo") {
      this.sessionManager.setInSessionURL('rongo');
    } else if (tabChangeEvent.index == 19 && tabChangeEvent.tab.textLabel == "Sidetic") {
      this.sessionManager.setInSessionURL('sidet');
    } else if (tabChangeEvent.index == 20 && tabChangeEvent.tab.textLabel == "Indus Sarasvati") {
      this.sessionManager.setInSessionURL('indus');
    } else if (tabChangeEvent.index == 21 && tabChangeEvent.tab.textLabel == "Vinca") {
      this.sessionManager.setInSessionURL('vinc');
    } else if (tabChangeEvent.index == 22 && tabChangeEvent.tab.textLabel == "Zapotec") {
      this.sessionManager.setInSessionURL('zapo');
    } else if (tabChangeEvent.index == 23 && tabChangeEvent.tab.textLabel == "Dispilio") {
      this.sessionManager.setInSessionURL('dipi');
    } else if (tabChangeEvent.index == 24 && tabChangeEvent.tab.textLabel == "Wadi el-Hol") {
      this.sessionManager.setInSessionURL('wadh');
    } else if (tabChangeEvent.index == 25 && tabChangeEvent.tab.textLabel == "Sitovo") {
      this.sessionManager.setInSessionURL('sito');
    } else if (tabChangeEvent.index == 26 && tabChangeEvent.tab.textLabel == "Ba Shu") {
      this.sessionManager.setInSessionURL('bashu');
    } else if (tabChangeEvent.index == 27 && tabChangeEvent.tab.textLabel == "Issyk") {
      this.sessionManager.setInSessionURL('issy');
    } else if (tabChangeEvent.index == 28 && tabChangeEvent.tab.textLabel == "Khitan") {
      this.sessionManager.setInSessionURL('khit');
    } else if (tabChangeEvent.index == 29 && tabChangeEvent.tab.textLabel == "Kohi") {
      this.sessionManager.setInSessionURL('kohi');
    } else if (tabChangeEvent.index == 30 && tabChangeEvent.tab.textLabel == "Para Lydian") {
      this.sessionManager.setInSessionURL('lydpa');
    } else if (tabChangeEvent.index == 31 && tabChangeEvent.tab.textLabel == "Tujia") {
      this.sessionManager.setInSessionURL('tuji');
    } else if (tabChangeEvent.index == 32 && tabChangeEvent.tab.textLabel == "Shankhalipi") {
      this.sessionManager.setInSessionURL('shali');
    } else if (tabChangeEvent.index == 33 && tabChangeEvent.tab.textLabel == "Vikramkhol") {
      this.sessionManager.setInSessionURL('vikra');
    } else if (tabChangeEvent.index == 34 && tabChangeEvent.tab.textLabel == "Ikom") {
      this.sessionManager.setInSessionURL('ikom');
    } else if (tabChangeEvent.index == 35 && tabChangeEvent.tab.textLabel == "Wargaade") {
      this.sessionManager.setInSessionURL('warg');
    } else if (tabChangeEvent.index == 36 && tabChangeEvent.tab.textLabel == "Numidian") {
      this.sessionManager.setInSessionURL('numid');
    }
    this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.getFromSessionURL()][3]];
    this.resetForAKeyboard();
    this.verifyThisKeyboardHasQwerty();
  }

  allUnclassifiedTypeClicked(scriptCode) {
    this.keysToRotate = false;
    if (this.imageAlternativeScript.indexOf(scriptCode) != -1) {
      this.unicode5AndHigher = true;
      this.showImageGlyph = true;
    } else {
      this.unicode5AndHigher = false;
      this.showImageGlyph = false;
    }
    this.navigateTabs(this, this.tabGroupUnclassified, scriptCode);
    this.tabLoadShow(this, scriptCode);
    this.allScriptTypesTabGroup.selectedIndex = this.selectedAllScriptTab;
    this.tabGroupUnclassified.selectedIndex = this.selectKeysTabs;
    this.layoutCurrentKeys = this[this.keyboardLayouts[scriptCode][3]];
    this.resetForAKeyboard();
    this.sessionManager.setInSessionURL(scriptCode);
    this.panelUnclassifiedState = !this.panelUnclassifiedState;
    if(this.toggleUnclassified == false) {
      document.getElementById('infoUnclassifiedText').innerText = this.localisedKeyboardLayouts[scriptCode][5] + " | " + this.localisedKeyboardLayouts[scriptCode][2] + " | " + this.chronoTimelineUnclassified(this.localisedKeyboardLayouts[scriptCode][7]) + " ";
    }
  }

  populateMyBookmarks() {
    this.populatingBookmarks = [];
    if (this.sessionManager.getAllFavouriteKeyboards() != '') {
      let favourites = this.sessionManager.getAllFavouriteKeyboards().split(",");
      favourites = favourites.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      for(let i = 0; i < favourites.length - 1; i++) {
        if (favourites[i] != "" && this.localisedKeyboardLayouts[favourites[i]])
          this.populatingBookmarks.push(this.localisedKeyboardLayouts[favourites[i]][2] + " - " + this.localisedKeyboardLayouts[favourites[i]][5] + " (" + favourites[i] + ") ");
      }
    }
  }

  addBookmark() {
    if (this.sessionManager.getAllFavouriteKeyboards().indexOf(this.sessionManager.getFromSessionURL()) > -1) {
      this._snackBar.open(this.translateForSnackBar[2], this.translateForSnackBar[0], {
        duration: 3000,
      });
    } else {
      this.sessionManager.addFavouriteKeyboard(this.sessionManager.getFromSessionURL());
      this.populateMyBookmarks();
      this._snackBar.open(this.translateForSnackBar[3], this.translateForSnackBar[0], {
        duration: 3000,
      });
    }
  }

  remmoveBookmark() {
    if (this.sessionManager.getAllFavouriteKeyboards().indexOf(this.sessionManager.getFromSessionURL()) == -1) {
      this._snackBar.open(this.translateForSnackBar[4], this.translateForSnackBar[0], {
        duration: 3000,
      });
    } else {
      this.sessionManager.removeFromFavouriteKeyboards(this.sessionManager.getFromSessionURL());
      this.populateMyBookmarks();
      this._snackBar.open(this.translateForSnackBar[5], this.translateForSnackBar[0], {
        duration: 3000,
      });
    }
  }

  selectKeyboardFromBookmark(valueOfBookmark) {
    this.sessionManager.setSelectedKeyboard(valueOfBookmark.split('(')[1].split(')')[0]);
  }

  showSuperScriptCharacter(character) : string {
    if (!this.isShiftKeyPress) {
      if (this.isQwerty && !this.isTransliterate) {
        if (this.isAltGrKeyPress && this.altGrCapsExists) {
          if (character.value == this.layoutCurrentKeys[this.rowSuper]["altGr"][this.columnSuper]["value"]) {
            let charToSuper = this.layoutCurrentKeys[this.rowSuper + 5]["altGrCaps"][this.columnSuper]["value"];
            if (this.rowSuper == this.rowPositions["delPos"]) {
              // First row with Del Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGr"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["tabPos"]) {
              // Second row with Tab Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGr"].length - 1 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["enterPos"]) {
              // Third row with Enter Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGr"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
              // Fourth row with 2-Shift Keys
              if (this.layoutCurrentKeys[this.rowSuper]["altGr"].length - 2 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            }
            this.columnSuper = this.columnSuper + 1
            return charToSuper;
          }
        } else {
          if (character.value == this.layoutCurrentKeys[this.rowSuper]["qwerty"][this.columnSuper]["value"]) {
            let charToSuper = this.layoutCurrentKeys[this.rowSuper + 5]["qwertyShift"][this.columnSuper]["value"];
            if (this.rowSuper == this.rowPositions["delPos"]) {
              // First row with Del Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwerty"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["tabPos"]) {
              // Second row with Tab Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwerty"].length - 1 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["enterPos"]) {
              // Third row with Enter Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwerty"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
              // Fourth row with 2-Shift Keys
              if (this.layoutCurrentKeys[this.rowSuper]["qwerty"].length - 2 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            }
            this.columnSuper = this.columnSuper + 1
            return charToSuper;
          }
        }
      } else if (this.isQwerty && this.isTransliterate) {
        if (character.value == this.layoutCurrentKeys[this.rowSuper]["qwertyTrans"][this.columnSuper]["value"]) {
          let charToSuper = this.layoutCurrentKeys[this.rowSuper + 5]["qwertyShiftTrans"][this.columnSuper]["value"];
          if (this.rowSuper == this.rowPositions["delPos"]) {
            // First row with Del Key
            if (this.layoutCurrentKeys[this.rowSuper]["qwertyTrans"].length - 2 == this.columnSuper) {
              this.columnSuper = 0;
              this.rowSuper++;
            }
          } else if (this.rowSuper == this.rowPositions["tabPos"]) {
            // Second row with Tab Key
            if (this.layoutCurrentKeys[this.rowSuper]["qwertyTrans"].length - 1 == this.columnSuper) {
              this.columnSuper = 1;
              this.rowSuper++;
            }
          } else if (this.rowSuper == this.rowPositions["enterPos"]) {
            // Third row with Enter Key
            if (this.layoutCurrentKeys[this.rowSuper]["qwertyTrans"].length - 2 == this.columnSuper) {
              this.columnSuper = 0;
              this.rowSuper++;
            }
          } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
            // Fourth row with 2-Shift Keys
            if (this.layoutCurrentKeys[this.rowSuper]["qwertyTrans"].length - 2 == this.columnSuper) {
              this.columnSuper = 1;
              this.rowSuper++;
            }
          }
          this.columnSuper = this.columnSuper + 1
          return charToSuper;
        }
      }
    } else {
      if (this.isQwerty && !this.isTransliterate) {
        if (this.isAltGrKeyPress && this.altGrCapsExists) {
          if (character.value == this.layoutCurrentKeys[this.rowSuper]["altGrCaps"][this.columnSuper]["value"]) {
            let charToSuper = this.layoutCurrentKeys[this.rowSuper - 5]["altGr"][this.columnSuper]["value"];
            if (this.rowSuper == this.rowPositions["delPos"]) {
              // First row with Del Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGrCaps"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["tabPos"]) {
              // Second row with Tab Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGrCaps"].length - 1 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["enterPos"]) {
              // Third row with Enter Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGrCaps"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
              // Fourth row with 2-Shift Keys
              if (this.layoutCurrentKeys[this.rowSuper]["altGrCaps"].length - 2 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            }
            this.columnSuper = this.columnSuper + 1
            return charToSuper;
          }
        } else {
          if (character.value == this.layoutCurrentKeys[this.rowSuper]["qwertyShift"][this.columnSuper]["value"]) {
            let charToSuper = this.layoutCurrentKeys[this.rowSuper - 5]["qwerty"][this.columnSuper]["value"];
            if (this.rowSuper == this.rowPositions["delPos"]) {
              // First row with Del Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwertyShift"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["tabPos"]) {
              // Second row with Tab Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwertyShift"].length - 1 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["enterPos"]) {
              // Third row with Enter Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwertyShift"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
              // Fourth row with 2-Shift Keys
              if (this.layoutCurrentKeys[this.rowSuper]["qwertyShift"].length - 2 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            }
            this.columnSuper = this.columnSuper + 1
            return charToSuper;
          } 
        }
      } else if (this.isQwerty && this.isTransliterate) {
        if (character.value == this.layoutCurrentKeys[this.rowSuper]["qwertyShiftTrans"][this.columnSuper]["value"]) {
          let charToSuper = this.layoutCurrentKeys[this.rowSuper - 5]["qwertyTrans"][this.columnSuper]["value"];
          if (this.rowSuper == this.rowPositions["delPos"]) {
            // First row with Del Key
            if (this.layoutCurrentKeys[this.rowSuper]["qwertyShiftTrans"].length - 2 == this.columnSuper) {
              this.columnSuper = 0;
              this.rowSuper++;
            }
          } else if (this.rowSuper == this.rowPositions["tabPos"]) {
            // Second row with Tab Key
            if (this.layoutCurrentKeys[this.rowSuper]["qwertyShiftTrans"].length - 1 == this.columnSuper) {
              this.columnSuper = 1;
              this.rowSuper++;
            }
          } else if (this.rowSuper == this.rowPositions["enterPos"]) {
            // Third row with Enter Key
            if (this.layoutCurrentKeys[this.rowSuper]["qwertyShiftTrans"].length - 2 == this.columnSuper) {
              this.columnSuper = 0;
              this.rowSuper++;
            }
          } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
            // Fourth row with 2-Shift Keys
            if (this.layoutCurrentKeys[this.rowSuper]["qwertyShiftTrans"].length - 2 == this.columnSuper) {
              this.columnSuper = 1;
              this.rowSuper++;
            }
          }
          this.columnSuper = this.columnSuper + 1
          return charToSuper;
        }
      }
    }
  }

  keyPressed(element, value, action, type, src) {
    this.sessionManager.detectWordTyped = false;
    if (action === "shift") {
      if (this.sessionManager.itemAltGrKeyPressed.value == false) {
        if (this.sessionManager.itemShiftKeyPressed.value == false)
          this.sessionManager.setShiftKeyPressed(true);
        else if (this.sessionManager.itemShiftKeyPressed.value == true)
          this.sessionManager.setShiftKeyPressed(false);
      } else if (this.sessionManager.itemAltGrKeyPressed.value == true) {
        if (this.sessionManager.itemShiftKeyPressed.value == false && this.altGrCapsExists)
          this.sessionManager.setShiftKeyPressed(true);
        else if (this.sessionManager.itemShiftKeyPressed.value == true && this.altGrCapsExists)
          this.sessionManager.setShiftKeyPressed(false);
      }
    } else if (action === "altGr") {
      if (this.sessionManager.itemShiftKeyPressed.value == false) {
        if (this.sessionManager.itemAltGrKeyPressed.value == false && this.altGrCapsExists)
          this.sessionManager.setAltGrKeyPressed(true);
        else if (this.sessionManager.itemAltGrKeyPressed.value == true && this.altGrCapsExists)
          this.sessionManager.setAltGrKeyPressed(false);
      } else if (this.sessionManager.itemShiftKeyPressed.value == true) {
        if (this.sessionManager.itemAltGrKeyPressed.value == false && this.altGrCapsExists)
          this.sessionManager.setAltGrKeyPressed(true);
        else if (this.sessionManager.itemAltGrKeyPressed.value == true && this.altGrCapsExists)
          this.sessionManager.setAltGrKeyPressed(false);
      }
    } else if (action === "tab") {
      this.sessionManager.setCharFromKeyboard("&nbsp;&nbsp;&nbsp;&nbsp;");
    } else if (action === "enter") {
      this.resetSwara();
      this.sessionManager.setElementForCharacterSelection(element);
      this.sessionManager.setCharFromKeyboard("<br/> ");
      this.sessionManager.setActionFromKeyboard(action);
      this.typedWord.next("");
    } else if (action === "char" && value === "\u00A0") {
      this.resetSwara();
      this.sessionManager.setCharFromKeyboard("");
    } else if (action === "space" && (value === "\u00A0" || value == " ")) {
      this.resetSwara();
      this.sessionManager.setCharFromKeyboard(this.sessionManager.wordSeparator());
      this.typedWord.next("");
    } else if (action === "delAlt") {
      this.sessionManager.setActionFromKeyboard(action);
      if (type == "letter")
        this.typedWord.next(this.typedWord.value.substring(0, this.typedWord.value.length - 1));
    } else if (action === "del") {
      // Backspace Button function
      this.sessionManager.setActionFromKeyboard(action);
      if (type == "letter" && this.typedWord.value)
        this.typedWord.next(this.typedWord.value.substring(0, this.typedWord.value.length - 1));
      if (type == "letter" && this.sessionManager.typedKeysMap.value && this.mappingKeysToSoft)
        this.sessionManager.typedKeysMap.next(this.sessionManager.typedKeysMap.value.substring(0, this.sessionManager.typedKeysMap.value.length - 1));
    } else if (type === "vyanjana" && !this.showImageGlyph) {
      // Reload Keyboard with Swara places as a combination of the selected Vyanjana
      if (!this.isQwerty && !this.isTransliterate) {
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
      if (this.typedWord.value == null || this.typedWord.value === "")
        this.typedWord.next(value);
      else
        this.typedWord.next(this.typedWord.value + value);
      this.lastCharVyanjana = true;
    } else if (type === "word") {
      if (this.sessionManager.isIntegrationContinous() == 'true') {
        this.runProgressIndicator = true;
      }
      // Keys pressed from Soft Keyboard
      for(let count in this.typedWord.value) {
        this.keyPressed(this.typedWord.value, "⌫", "del", "", "");
      }
      if (this.lastCharVyanjana == true && action == 'char') {
        this.lastCharVyanjana = false;
      this.sessionManager.detectWordTyped = true;
      this.sessionManager.setCharFromKeyboard(value);
      } else if (action == 'false') {
        if (this.typedWord.value && value.includes(this.typedWord.value) > -1 && value[0].toUpperCase() === this.typedWord.value[0] && this.sessionManager.getFromSessionURL() != "pin" && this.sessionManager.getFromSessionURL() != "bopo"){
          value = this.typedWord.value[0] + value.substr(1, value.length);
          this.typedWord.next("");
          this.sessionManager.detectWordTyped = true;
          this.sessionManager.setCharFromKeyboard(this.sessionManager.wordSeparator() + value + this.sessionManager.wordSeparator());
          this.resetSwara();
        } else if (this.sessionManager.getFromSessionURL() == "pin" || this.sessionManager.getFromSessionURL() == "bopo" || (this.sessionManager.getFromSessionURL() == "zhtw" && this.sessionManager.getInSessionQwerty() == true) || (this.sessionManager.getFromSessionURL() == "zhcn" && this.sessionManager.getInSessionQwerty() == true)) {
          this.typedWord.next("");
          this.sessionManager.detectWordTyped = true;
          this.sessionManager.setCharFromKeyboard(value.split(" ")[1] + this.sessionManager.wordSeparator());
          this.resetSwara();
        } else {
          this.typedWord.next("");
          this.sessionManager.detectWordTyped = true;
          this.sessionManager.setCharFromKeyboard(value + this.sessionManager.wordSeparator()); 
          this.resetSwara();
        }
      }
      if (this.mappingKeysToSoft && (this.isQwerty || this.isTransliterate) && this.sessionManager.typedKeysMap.value != null) {
        this.sessionManager.typedKeysMap.next("");
      }
    } else if (action === "control") {
      if (this.isQwerty || this.isTransliterate) {
        this.sessionManager.itemCtrlKeyPressed.next(true);
        this.sessionManager.setActionFromKeyboard(action);
      }
    } else if (action === "left" && value === "←") {
      this.sessionManager.setActionFromKeyboard(action);
    } else if (action === "top" && value === "↑") { 
      this.sessionManager.setActionFromKeyboard(action);
    } else if (action === "right" && value === "→") {
      this.sessionManager.setActionFromKeyboard(action);
    } else if (action === "bottom" && value === "↓") {
      this.sessionManager.setActionFromKeyboard(action);
    } else if (action === "contextmenu" && value === "☰") {
      this.sessionManager.setActionFromKeyboard(action);
    } else if (src != "" && src != undefined && this.showImageGlyph) {
      this.sessionManager.setActionFromKeyboard(src);
    } else if (type === "diacritic") {
      this.diacriticTyped = value;
      this.sessionManager.setElementForCharacterSelection(element);
      this.sessionManager.setCharFromKeyboard(value);
      this.sessionManager.setActionFromKeyboard(action);
      this.typedWord.next(this.typedWord.value + value);
    } else {
      if (this.sessionManager.itemSessionURL.value == "iub") {
        value = (value.indexOf(" ") > -1) ? value.split(' ')[1] : value;
      }
      if (this.sessionManager.itemSessionURL.value == "bharati") {
        value = (value.indexOf("-") > -1) ? value.split('-')[1].split(' ')[1] : (value.indexOf(" ") > -1) ? value.split(' ')[1] : value;
      }
      if (this.isQwerty && !this.isTransliterate && (this.sessionManager.itemSessionURL.value == "ti" || this.sessionManager.itemSessionURL.value == "tig" || this.sessionManager.itemSessionURL.value == "am" || this.sessionManager.itemSessionURL.value == "geez")) {
        if(type == "syllabic") {
          this.keyPressed(this.sessionManager.typedKeysMap.value, "⌫", "del", "letter", "");
          this.syllablicTyping = false;
        }
        this.sessionManager.setElementForCharacterSelection(element);
        this.sessionManager.setCharFromKeyboard(value);
        this.sessionManager.setActionFromKeyboard(action);
        if (this.typedWord.value == null || this.typedWord.value === "")
          this.typedWord.next(value);
        else
          this.typedWord.next(this.typedWord.value + value);
        if (type != undefined && type != "diacritic" && type != "word" && type != "vyanjana" && type != "syllabic")
          this.showItsSyllables(type);
        else if (type == "syllabic") {
          this.resetAllSyllables();
        }
      }
      if (type == "swara") {
        this.lastCharVyanjana = true;
      } 
      if (this.lastCharVyanjana == true) {
        if (value.includes(this.typedWord.value[this.typedWord.value.length - 1])) {
          this.typedWord.next(this.typedWord.value.substring(0, this.typedWord.value.length - 1) + value);
        } else if (this.isQwerty || this.isTransliterate) {
          this.typedWord.next(this.typedWord.value + value);
        } else {
          this.typedWord.next(value);
        }
        this.keyPressed(element, " " + this.typedWord.value, action, "word", "");
      } else if (this.diacriticTyped != "" && this.diacriticsInclusion(value) != undefined) {
        this.keyPressed(this.typedWord.value, "⌫", "del", "", "");
        this.sessionManager.setElementForCharacterSelection(this.diacriticsInclusion(value));
        this.sessionManager.setCharFromKeyboard(this.diacriticsInclusion(value));
        this.sessionManager.setActionFromKeyboard(action);
        this.typedWord.next(this.typedWord.value.substring(0, this.typedWord.value.length - 1) + this.diacriticsInclusion(value));
        this.diacriticTyped = "";
      }
    }
  }

  selectTargetTransliteration(event, targetScript) {
    this.runProgressIndicator = true;
    this.sessionManager.targetIntegrationScript = targetScript;
    if (targetScript && targetScript != "" && targetScript != null && this.sessionManager.getSessionSavedContent() != null && this.sessionManager.getSessionSavedContent() != "" && this.sessionManager.getSessionSavedContent() != undefined && this.sessionManager.getOfflineOnly() == false) {
      this.sessionManager.integrateTransliteration(targetScript).subscribe((resultContent: any) => {
        this.sessionManager.pasteIntegrationOutput.next(true);
        console.info("[MUlTISCRIPTEDITOR] Transliteration through Aksharamukha Integration to Target Script ", targetScript);
        this.keyPressed(event, resultContent, 'false', 'word', '');
        this.runProgressIndicator = false;
      }, (error) => {
        this.sessionManager.pasteIntegrationOutput.next(true);
        console.info("[MUlTISCRIPTEDITOR] Transliteration through Aksharamukha Integration to Target Script ", targetScript);
        this.keyPressed(event, error.error.text, 'false', 'word', '');
        this.runProgressIndicator = false;
      });
    }
  }

  // Diacritics for Latin/Cyrillic/Greek-based/Pinyin/Zhuyin languages - https://en.wikipedia.org/wiki/List_of_Unicode_characters
  diacriticsInclusion(characterTyped) { 
    if (this.diacritics[characterTyped] == undefined) {
      return characterTyped;
    }
    for(let key = 0; key < this.diacritics[characterTyped].length; key++) {
      if (this.diacritics[characterTyped] != undefined && this.diacritics[characterTyped][key][this.diacriticTyped]) {
        return this.diacritics[characterTyped][key][this.diacriticTyped];
      }
    }
  }

  hideSoftKeyboard() {
    if (this.layoutCurrentKeys.length > 0 && this.sessionManager.softKeyboardState.value == false) {
      this.previousLayout = this.layoutCurrentKeys;
      this.layoutCurrentKeys = [];
      this.sessionManager.softKeyboardState.next(true);
    } else if (this.sessionManager.softKeyboardState.value == true) {
      this.layoutCurrentKeys = (this.layoutCurrentKeys.length == 0) ? this.previousLayout : this.layoutCurrentKeys;
      this.sessionManager.softKeyboardState.next(false);
    }
  }

  usersChoice() {
    if (this.sessionManager.mappingKeyboard.value == true) {
      this.sessionManager.mapKeysFromKeyboard('false');
    } else if (this.sessionManager.mappingKeyboard.value == false) {
      this.sessionManager.mapKeysFromKeyboard('true');
    }
    this.mappingKeysToSoft = this.sessionManager.mappingKeyboard.value; 
  }

  orientKeyboard(){
    this.keysToRotate = !this.keysToRotate;
    this.sessionManager.textOrientationMode.next(Boolean(this.keysToRotate));
  }

  typeVertically(){
    this.sessionManager.typeVertically.next(true);
  }

  renderBiDi(value) {
    if (value) {
      this.switchScriptDirection = value;
    } else {
      this.switchScriptDirection = !this.switchScriptDirection;
    }
    this.sessionManager.setBoustrophedonScript(this.switchScriptDirection);
  }

  switchTypingDirection(value) {
    if (value == 'ltr') {
      this.sessionManager.switchTypingDirection.next('ltr');
    } else if (value == 'rtl') {
      this.sessionManager.switchTypingDirection.next('rtl');
    }
  }

  showItsSyllables(type) {
    let k = 0;
    let rowToUpdate = 2;
    if (!this.isShiftKeyPress && !this.isAltGrKeyPress) {
      rowToUpdate = rowToUpdate + this.qwertyPos;

      for (let j in this.layoutCurrentKeys[rowToUpdate].qwerty) {
        if (this.layoutCurrentKeys[rowToUpdate].qwerty[j].action == "char" && this.layoutCurrentKeys[rowToUpdate].qwerty[j].type === "syllabic")
          this.layoutCurrentKeys[rowToUpdate].qwerty[j].value = type[k++];
      }
    } else if (this.isShiftKeyPress && !this.isAltGrKeyPress) {
      rowToUpdate = rowToUpdate + this.qwertyPos + 5;

      for (let j in this.layoutCurrentKeys[rowToUpdate].qwertyShift) {
        if (this.layoutCurrentKeys[rowToUpdate].qwertyShift[j].action == "char" && this.layoutCurrentKeys[rowToUpdate].qwertyShift[j].type === "syllabic")
          this.layoutCurrentKeys[rowToUpdate].qwertyShift[j].value = type[k++];
      }
    } else if (!this.isShiftKeyPress && this.isAltGrKeyPress) {
      rowToUpdate = rowToUpdate + this.qwertyPos + 10;

      for (let j in this.layoutCurrentKeys[rowToUpdate].altGr) {
        if (this.layoutCurrentKeys[rowToUpdate].altGr[j].action == "char" && this.layoutCurrentKeys[rowToUpdate].altGr[j].type === "syllabic")
          this.layoutCurrentKeys[rowToUpdate].altGr[j].value = type[k++];
      }
    } else if (this.isShiftKeyPress && this.isAltGrKeyPress) {
      rowToUpdate = rowToUpdate + this.qwertyPos + 15;

      for (let j in this.layoutCurrentKeys[rowToUpdate].altGrCaps) {
        if (this.layoutCurrentKeys[rowToUpdate].altGrCaps[j].action == "char" && this.layoutCurrentKeys[rowToUpdate].altGrCaps[j].type === "syllabic")
          this.layoutCurrentKeys[rowToUpdate].altGrCaps[j].value = type[k++];
      }
    }
    this.syllablicTyping = true;
  }

  resetAllSyllables() {
    let k = 0;
    let rowToUpdate = 2;
    let currentType = "";
    if (!this.isShiftKeyPress && !this.isAltGrKeyPress) {
      rowToUpdate = rowToUpdate + this.qwertyPos;
      currentType = "qwerty";

      for (let j in this.layoutCurrentKeys[rowToUpdate].qwerty) {
        if (this.layoutCurrentKeys[rowToUpdate].qwerty[j].action == "char" && this.layoutCurrentKeys[rowToUpdate].qwerty[j].type === "syllabic") {
          this.layoutCurrentKeys[rowToUpdate].qwerty[j].value = this.prevSyllables[currentType][k++];
        }
      }
    } else if (this.isShiftKeyPress && !this.isAltGrKeyPress) {
      rowToUpdate = rowToUpdate + this.qwertyPos + 5;
      currentType = "qwertyShift";

      for (let j in this.layoutCurrentKeys[rowToUpdate].qwertyShift) {
        if (this.layoutCurrentKeys[rowToUpdate].qwertyShift[j].action == "char" && this.layoutCurrentKeys[rowToUpdate].qwertyShift[j].type === "syllabic") {
          this.layoutCurrentKeys[rowToUpdate].qwertyShift[j].value = this.prevSyllables[currentType][k++];
        }
      }
    } else if (!this.isShiftKeyPress && this.isAltGrKeyPress) {
      rowToUpdate = rowToUpdate + this.qwertyPos + 10;
      currentType = "altGr";

      for (let j in this.layoutCurrentKeys[rowToUpdate].altGr) {
        if (this.layoutCurrentKeys[rowToUpdate].altGr[j].action == "char" && this.layoutCurrentKeys[rowToUpdate].altGr[j].type === "syllabic") {
          this.layoutCurrentKeys[rowToUpdate].altGr[j].value = this.prevSyllables[currentType][k++];
        }
      }
    } else if (this.isShiftKeyPress && this.isAltGrKeyPress) {
      rowToUpdate = rowToUpdate + this.qwertyPos + 15;
      currentType = "altGrCaps";

      for (let j in this.layoutCurrentKeys[rowToUpdate].altGrCaps) {
        if (this.layoutCurrentKeys[rowToUpdate].altGrCaps[j].action == "char" && this.layoutCurrentKeys[rowToUpdate].altGrCaps[j].type === "syllabic") {
          this.layoutCurrentKeys[rowToUpdate].altGrCaps[j].value = this.prevSyllables[currentType][k++];
        }
      }
    }
  }
  
  initSwara() {
    if (this.layoutCurrentKeys && !this.isQwerty && !this.isTransliterate) {
      for (let j in this.layoutCurrentKeys[1].row) {
        if (this.layoutCurrentKeys[1].row[j].type === "swara")
          this.prevSwaras[j] = this.layoutCurrentKeys[1].row[j].value;
      }
    }
  }

  resetSwara() {
    if (this.layoutCurrentKeys && !this.isQwerty && !this.isTransliterate) {
      // Loop through all elements
      for (let j in this.layoutCurrentKeys[1].row) {
        if (this.layoutCurrentKeys[1].row[j].type === "swara" && this.prevSwaras[j] != '') {
          this.layoutCurrentKeys[1].row[j].value = this.prevSwaras[j];
        }
      }
    }
  }

  verifyThisKeyboardHasQwerty() {
    var qwertyExists = false;
    if (this.layoutCurrentKeys) {
      Object.keys(this.layoutCurrentKeys).map(element => {
        Object.keys(this.layoutCurrentKeys[element]).map(key => {
          if(this.layoutCurrentKeys[element][key].indexOf("qwerty")) {
            qwertyExists = true;
          }
        });
      });
    }
    if (qwertyExists == false && this.layoutCurrentKeys.length > 0)
      this.sessionManager.setInSessionQwerty(qwertyExists);
  }

  languageScriptClicked(code) {
    this.keysToRotate = false;
    if (this.keyDoNotRotate.indexOf(code) != -1) {
      this.notToRotateKeys = true;
    } else {
      this.notToRotateKeys = false;
    }
    if (this.switchScriptDirection == true)
      this.renderBiDi(false);
    this.switchTypingDirection((this.rtlLocales.indexOf(code) > - 1)? 'rtl': 'ltr');
    this.panelLatinState = false;
    if (this.keyboardLayouts[code])
      this.layoutCurrentKeys = this[this.keyboardLayouts[code][3]];
    else
      this.layoutCurrentKeys = undefined;
    this.resetForAKeyboard();
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

  customiseMyKeyboardLayout() {
    const dialogProfile = this.customKeyboardDialog.open(this.CustomKeyboardPopUp, {
      width: '95'
    });

    dialogProfile.afterClosed()
      .subscribe(result => {
        console.info('[MULTISCRIPTEDITOR] The dialog was closed ', result);
      }
    );
  }

  helpForUser(type) {
    if (type != 'upload') {
      localStorage.removeItem('multiIgnore')
      const dialogProfile = this.helperDialog.open(this.HelperPopUp, {
        width: (type == 'privacy') ? (
          (!this.isMobile && !this.isTablet)?
            '60%':
            (
              (!this.isMobile && this.isTablet)?
                '85%':
                '100%'
            )
        ):(
          (!this.isMobile && !this.isTablet)?
            '70%':
            (
              (!this.isMobile && this.isTablet)?
                '85%':
                '100%'
            )
          ),
        data: {show: type}
      });

      dialogProfile.afterClosed()
        .subscribe(result => {
          console.info('[MULTISCRIPTEDITOR] The dialog was closed ', result);
        }
      );
    } else if (type == 'upload') {
      const dialogProfile = this.helperDialog.open(this.HelperPopUp, {
        width: (
          (!this.isMobile && !this.isTablet)?
            '60%':
            (
              (!this.isMobile && this.isTablet)?
                '85%':
                '100%'
            )
        ),
        data: {show: type}
      });

      dialogProfile.afterClosed()
        .subscribe(result => {
          console.info('[MULTISCRIPTEDITOR] The dialog was closed ', result);
        }
      );
    }
  }

  restoreDefaults() {
    this.defaultCellSize = 55;
    this.defaultFontSize = 12;
    this.sessionManager.setCellSizeForSession(this.defaultCellSize);
    this.sessionManager.setFontSizeForSession(this.defaultFontSize);
    this.sessionManager.itemCtrlKeyPressed.next(false);
    this.sessionManager.setShiftKeyPressed(false);
    this.sessionManager.setAltGrKeyPressed(false);
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
    let translateSet = ["OK", "These characters < > ( ) { } $ % = ! ? & * are not allowed in this field", "Keyboard Already Bookmarks", "Added Keyboard To My Bookmarks", "Keyboard not in Bookmarks to Remove", "Remove Keyboard From My Bookmarks", ];
    this.translateForSnackBar = await this.loadFromFileForPopup(this.sessionManager.getUILocale(), translateSet);
  }

  loadFromFileForPopup(ISO_Code, translateSet) {
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

  loadFromFile(ISO_Code) {
    var translateSet = [" size", "Year ", " ago"];
    return new Promise<any>((resolve, reject)=> {
      this.http.get<{}>(`assets/i18n/${ISO_Code}.json`).subscribe(
        translation => {
          if (translateSet && translation) {
            localStorage.setItem('sizeTranslate', translation[translateSet[0]]);
            localStorage.setItem('yearTranslate', translation[translateSet[1]]);
            localStorage.setItem('agoTranslate', translation[translateSet[2]]);
            resolve("");
          }
          else
            reject("");
        }
      );
    });
  }
}
