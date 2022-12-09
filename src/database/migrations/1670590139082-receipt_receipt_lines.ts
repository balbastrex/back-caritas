import {MigrationInterface, QueryRunner} from "typeorm";

export class receiptReceiptLines1670590139082 implements MigrationInterface {
    name = 'receiptReceiptLines1670590139082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`receipt_line\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(64) NOT NULL, \`units\` int NOT NULL, \`cost\` decimal(6,2) NOT NULL DEFAULT '0.00', \`total_cost\` decimal(6,2) NOT NULL DEFAULT '0.00', \`id_receipt\` int NOT NULL, \`id_product\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receipt\` (\`id\` int NOT NULL AUTO_INCREMENT, \`albaran\` varchar(30) NOT NULL, \`amount\` decimal(6,2) NOT NULL DEFAULT '0.00', \`id_user\` int NOT NULL, \`id_economato\` int NOT NULL, \`id_provider\` int NOT NULL, \`created\` date NOT NULL, \`updated\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`receipt_line\` ADD CONSTRAINT \`FK_59411bae1a35935e3d0aa416eaf\` FOREIGN KEY (\`id_receipt\`) REFERENCES \`receipt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt_line\` ADD CONSTRAINT \`FK_dae38c6e862ab49496c49f7ccfb\` FOREIGN KEY (\`id_product\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt\` ADD CONSTRAINT \`FK_1e1203c52cd38fd114d6aeed0fc\` FOREIGN KEY (\`id_economato\`) REFERENCES \`economato\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt\` ADD CONSTRAINT \`FK_5234ffe8c47520ec45247a08537\` FOREIGN KEY (\`id_provider\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt\` ADD CONSTRAINT \`FK_d168e3556ec69c5d0c0cdda59d0\` FOREIGN KEY (\`id_user\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt\` DROP FOREIGN KEY \`FK_d168e3556ec69c5d0c0cdda59d0\``);
        await queryRunner.query(`ALTER TABLE \`receipt\` DROP FOREIGN KEY \`FK_5234ffe8c47520ec45247a08537\``);
        await queryRunner.query(`ALTER TABLE \`receipt\` DROP FOREIGN KEY \`FK_1e1203c52cd38fd114d6aeed0fc\``);
        await queryRunner.query(`ALTER TABLE \`receipt_line\` DROP FOREIGN KEY \`FK_dae38c6e862ab49496c49f7ccfb\``);
        await queryRunner.query(`ALTER TABLE \`receipt_line\` DROP FOREIGN KEY \`FK_59411bae1a35935e3d0aa416eaf\``);
        await queryRunner.query(`DROP TABLE \`receipt\``);
        await queryRunner.query(`DROP TABLE \`receipt_line\``);
    }

}
